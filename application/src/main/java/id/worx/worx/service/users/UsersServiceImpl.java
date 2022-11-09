package id.worx.worx.service.users;

import id.worx.worx.common.enums.EmailTokenStatus;
import id.worx.worx.common.enums.EmailTokenType;
import id.worx.worx.common.enums.UserStatus;
import id.worx.worx.common.model.request.auth.*;
import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.common.model.response.auth.JwtResponse;
import id.worx.worx.common.model.response.users.UserDetailsResponse;
import id.worx.worx.common.model.response.users.UserResponse;
import id.worx.worx.config.properties.WorxProperties;
import id.worx.worx.entity.users.EmailToken;
import id.worx.worx.entity.users.RefreshToken;
import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.UsersMapper;
import id.worx.worx.repository.EmailTokenRepository;
import id.worx.worx.service.EmailService;
import id.worx.worx.repository.RefreshTokenRepository;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.util.JwtUtils;
import id.worx.worx.common.model.request.EmailRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {
    private final UsersRepository usersRepository;

    private final WorxProperties worxProps;

    private static final String REGEX_PATTERN = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>_]).{8,20}$";

    private final RefreshTokenRepository refreshTokenRepository;

    private final EmailTokenRepository emailTokenRepository;

    @Autowired
    private  JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private WorxProperties worxProperties;

    @Transactional
    public Users createUser(UserRequest userRequest, HttpServletRequest httpServletRequest){

        Pattern pattern = Pattern.compile(REGEX_PATTERN);
        Matcher matcher = pattern.matcher(userRequest.getPassword());

        String regexNumberOnly = "\\d+";

        if(!userRequest.getPhoneNo().matches(regexNumberOnly)){
            throw new WorxException(WorxErrorCode.INVALID_PHONE_NO);
        }
        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }

        Optional<Users> getByEmail = usersRepository.findByEmail(userRequest.getEmail());
        if (getByEmail.isPresent()) {
            throw new WorxException(WorxErrorCode.EMAIL_EXIST);
        }

            //phone no validation
            String phone = formatPhone(userRequest.getPhoneNo(), "ID");

            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String random = UUID.randomUUID().toString().replace("-", "");

            Users users = new Users();
            users.setEmail(userRequest.getEmail());
            users.setFullname(userRequest.getFullname());
            users.setPhone(phone);
            users.setStatus(UserStatus.INACTIVE);
            users.setOrganizationName(userRequest.getOrganizationName());
            users.setCountry(userRequest.getCountry().toUpperCase());
            users.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            users.setOrganizationCode(organizationCode());
            users = usersRepository.save(users);

            EmailToken emailToken = new EmailToken();
            emailToken.setToken(random);
            emailToken.setStatus(EmailTokenStatus.UNUSED);
            emailToken.setEmail(userRequest.getEmail());
            emailToken.setType(EmailTokenType.NEWACC);
            emailToken.setExpiredToken(ZonedDateTime.now().plusMinutes(15));
            emailTokenRepository.save(emailToken);

            String url = String.format("%s/account-confirmation?code=%s",httpServletRequest.getRequestURL(), random);

            emailService.sendWelcomingEmail(userRequest.getEmail(), userRequest.getFullname(), url);

            return users;

    }

    @Override
    public void sendMailConfirmation(EmailRequestDTO emailRequestDTO){

            Optional<Users> checkEmail = usersRepository.findByEmail(emailRequestDTO.getEmail());
            if(checkEmail.isPresent()){
                Users users = checkEmail.get();

                Optional<EmailToken> getEmailToken = emailTokenRepository.findByEmailAndTypeAndStatus(emailRequestDTO.getEmail(),EmailTokenType.NEWACC,EmailTokenStatus.UNUSED);

                if(getEmailToken.isEmpty()){
                    throw new WorxException(WorxErrorCode.ALREADY_VERIRIED);
                }
                String url = String.format("%s/account-confirmation?code=%s",worxProps.getWeb().getEndpoint(), getEmailToken.get().getToken());

                emailService.sendWelcomingEmail(emailRequestDTO.getEmail(), users.getFullname(), url);

            }else{
                throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
            }
    }
    public JwtResponse login(LoginRequest loginRequest) {

        JwtResponse jwtResponse = new JwtResponse();
        log.info("get users by email : {} ", loginRequest.getEmail());
        Optional<Users>  users = usersRepository.findByEmail(loginRequest.getEmail());
        if(users.isPresent()){

            try{
                String accessToken = "JWT Access Token here";

                Map<String, Object> data = new HashMap<>();
                data.put("accessToken", accessToken);

                jwtResponse.setData(data);
                jwtResponse.setStatus(HttpStatus.OK.value());

            }catch (BadCredentialsException e){
                log.error("bad cridential");

                jwtResponse.setData("invalid email");
                jwtResponse.setStatus(HttpStatus.NOT_FOUND.value());
            }

        }else{
            jwtResponse.setData("invalid email");
            jwtResponse.setStatus(HttpStatus.NOT_FOUND.value());
        }

        return jwtResponse;
    }


    @Override
    public String changePassword(ChangePasswordRequest updatePasswordRequest){

        String message = "";

        Pattern pattern = Pattern.compile(REGEX_PATTERN);
        Matcher matcher = pattern.matcher(updatePasswordRequest.getNewPassword());

        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }

        Optional<Users> optionalUsers = usersRepository.findByEmail(updatePasswordRequest.getEmail());
        if(optionalUsers.isEmpty()){
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }
        Users getUsers = optionalUsers.get();

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = getUsers.getPassword();

        boolean matchPassword = passwordEncoder.matches(updatePasswordRequest.getOldPassword(), encodedPassword);
        log.info("Match Password user : {} ", matchPassword);

        if (matchPassword){
            getUsers.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
            usersRepository.save(getUsers);

            message = "Update Password Success";

            return message;
        }else{
            throw new WorxException(WorxErrorCode.PASSWORD_NOT_MATCH);
        }
    }

    @Override
    public String resetPassword(String email){

        try{

            Optional<Users> checkEmail = usersRepository.findByEmail(email);
            if(!checkEmail.isPresent()){
                throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
            }
            String random = UUID.randomUUID().toString().replace("-", "");

            EmailToken emailToken = new EmailToken();
            emailToken.setToken(random);
            emailToken.setStatus(EmailTokenStatus.UNUSED);
            emailToken.setEmail(email);
            emailToken.setType(EmailTokenType.RESETPWD);
            emailToken.setExpiredToken(ZonedDateTime.now().plusMinutes(15));
            emailTokenRepository.save(emailToken);

            String url = String.format("https://dev.worx.id/reset-password?code=%s", random);

            emailService.sendResetPassword(email,checkEmail.get().getFullname(),url);

            return "Reset Password Request Success, Please check your email";
        }catch (Exception e){
            throw new WorxException(WorxErrorCode.FAILED_SEND_EMAIL);
        }
    }

    @Override
    public void verifyPasswordResetToken(ChangePasswordToken changePasswordToken){


        Pattern pattern = Pattern.compile(REGEX_PATTERN);
        Matcher matcher = pattern.matcher(changePasswordToken.getNewPassword());

        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }

        Optional<EmailToken> checkData = emailTokenRepository.findByTokenAndTypeAndStatus(changePasswordToken.getToken(),EmailTokenType.RESETPWD, EmailTokenStatus.UNUSED);

        if(!checkData.isPresent()){
            throw new WorxException(WorxErrorCode.TOKEN_EMAIL_ERROR);
        }

        if(checkData.get().getExpiredToken().compareTo(ZonedDateTime.now(ZoneId.systemDefault())) >= 0){

            Optional<Users> users = usersRepository.findByEmail(checkData.get().getEmail());
            if(users.isPresent()){
                Users updateUsers = users.get();

                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

                updateUsers.setPassword(passwordEncoder.encode(changePasswordToken.getNewPassword()));
                usersRepository.save(updateUsers);


                EmailToken updateData = checkData.get();
                updateData.setStatus(EmailTokenStatus.USED);
                emailTokenRepository.save(updateData);
            }
        }else{
            throw new WorxException(WorxErrorCode.TOKEN_EXPIRED_ERROR);
        }

    }

    @Override
    public void verifyAccount(String code, HttpServletResponse httpServletResponse) throws IOException {

        Optional<EmailToken> checkToken = emailTokenRepository.findByTokenAndTypeAndStatus(code,EmailTokenType.NEWACC,EmailTokenStatus.UNUSED);

        if(!checkToken.isPresent()){
            throw new WorxException(WorxErrorCode.TOKEN_INVALID_ERROR);
        }

        //check expired
        if(checkToken.get().getExpiredToken().compareTo(ZonedDateTime.now(ZoneId.systemDefault())) >= 0){
            EmailToken updateData = checkToken.get();
            updateData.setStatus(EmailTokenStatus.USED);
            emailTokenRepository.save(updateData);

            httpServletResponse.sendRedirect("https://dev.worx.id/sign-in");
        }else{
            throw new WorxException(WorxErrorCode.TOKEN_EXPIRED_ERROR);
        }

    }


    @Override
    public UserDetailsResponse getByEmail(String email) {
        Optional<Users> getEmail = usersRepository.findByEmail(email);
        if(getEmail.isEmpty()){
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }
        Users data = getEmail.get();
        UserDetailsResponse userDetailsResponse = new UserDetailsResponse();
        userDetailsResponse.setCountry(data.getCountry());
        userDetailsResponse.setOrganizationName(data.getOrganizationName());
        userDetailsResponse.setOrganizationCode(data.getOrganizationCode());
        userDetailsResponse.setEmail(data.getEmail());
        userDetailsResponse.setPhone(data.getPhone());

        return userDetailsResponse;
    }

    public String organizationCode(){

        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        int length = 5;
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(alphabet.length());
            char randomChar = alphabet.charAt(index);
            sb.append(randomChar);
        }

        return "WX"+sb;
    }

    public String defaultUrl(HttpServletRequest httpServletRequest){

        return httpServletRequest.getRequestURL().toString();
    }

    public String formatPhone(String phone, String country){

        String resultPhone = "";

        if(country.equals("ID")){
            String get2FirstCharacter = phone.substring(0,2);
            if(get2FirstCharacter.equals("08")){
                resultPhone = "62"+phone.substring(1);
            }else{
                resultPhone = phone;
            }
        }
        return resultPhone;
    }

    @Override
    public String createRefreshToken(String email){

        Integer expiredTimeRefreshToken = worxProperties.getToken().getRefresh();
        Optional<Users> getByEmail = usersRepository.findByEmail(email);

        if(!getByEmail.isPresent()){
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(getByEmail.get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(expiredTimeRefreshToken));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken = refreshTokenRepository.save(refreshToken);

        return refreshToken.getToken();

    }

    @Transactional
    public void deleteRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
            .orElseThrow(() -> new WorxException(WorxErrorCode.REFRESH_TOKEN_NOT_FOUND));
        refreshTokenRepository.delete(refreshToken);
    }
    public void logout(TokenRefreshRequest request) {
        deleteRefreshToken(request.getRefreshToken());
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new WorxException(WorxErrorCode.REFRESH_TOKEN_INVALID);
        }
        return token;
    }

    public JwtResponse refreshToken(TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        return this.findByToken(requestRefreshToken)
            .map(this::verifyExpiration)
            .map(RefreshToken::getUser)
            .map(user -> {
                String accessToken = jwtUtils.generateToken(user.getEmail());

                Map<String, Object> data = new HashMap<>();
                data.put("accessToken", accessToken);
                data.put("refreshToken", requestRefreshToken);

                JwtResponse response = new JwtResponse();
                response.setData(data);
                response.setStatus(200);

                return response;
            })
            .orElseThrow(() -> new WorxException(WorxErrorCode.REFRESH_TOKEN_NOT_FOUND));
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }
    @Override
    public Optional<Users> findByOrganizationCode(String token) {
        return usersRepository.findByOrganizationCode(token);
    }
    public UserResponse toDTO(Users users) {
        return usersMapper.toDto(users);
    }
    public Users findByEmail(String email){

        Optional<Users> getUser = usersRepository.findByEmail(email);
        if(getUser.isEmpty()){
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }
        return getUser.get();
    }

    @Scheduled(cron = "* * * * * ?")
    public void deleteEmailToken() throws Exception{

        //Email token expired after 15 minutes when token generated
        ZonedDateTime zonedDateTime = ZonedDateTime.now().minusDays(1);
        String date = zonedDateTime.toLocalDate().toString();
        String actualDate = date + " 23:59:59";
        emailTokenRepository.deleteAllByDate(actualDate);

    }

    @Scheduled(cron = "* * * * * ?")
    public void deleteRefreshToken() throws Exception{

        //Email token expired after 15 minutes when token generated
        ZonedDateTime zonedDateTime = ZonedDateTime.now().minusDays(1);
        String date = zonedDateTime.toLocalDate().toString();
        String actualDate = date + " 23:59:59";
        refreshTokenRepository.deleteAllByDate(actualDate);

    }


}
