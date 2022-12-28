package id.worx.worx.service.users;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

import id.worx.worx.entity.File;
import id.worx.worx.mapper.UsersUpdateMapper;
import id.worx.worx.repository.FileRepository;
import id.worx.worx.service.AuthenticationContext;
import id.worx.worx.service.storage.FileStorageService;
import id.worx.worx.web.model.request.UserUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import id.worx.worx.common.enums.EmailTokenStatus;
import id.worx.worx.common.enums.EmailTokenType;
import id.worx.worx.common.enums.UserStatus;
import id.worx.worx.common.model.request.EmailRequestDTO;
import id.worx.worx.common.model.request.auth.ChangePasswordRequest;
import id.worx.worx.common.model.request.auth.ChangePasswordToken;
import id.worx.worx.common.model.request.auth.LoginRequest;
import id.worx.worx.common.model.request.auth.TokenRefreshRequest;
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
import id.worx.worx.repository.RefreshTokenRepository;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.service.EmailService;
import id.worx.worx.service.GroupService;
import id.worx.worx.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {

    private static final String REGEX_PATTERN = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>_]).{8,20}$";

    private final UsersRepository usersRepository;

    private final WorxProperties worxProps;

    private final RefreshTokenRepository refreshTokenRepository;

    private final EmailTokenRepository emailTokenRepository;

    private final JwtUtils jwtUtils;

    private final EmailService emailService;
    private final GroupService groupService;

    private final UsersMapper usersMapper;

    private final UsersUpdateMapper usersUpdateMapper;

    private final AuthenticationContext authenticationContext;

    private final FileRepository fileRepository;

    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public Users createUser(UserRequest userRequest) {

        Pattern pattern = Pattern.compile(REGEX_PATTERN);
        Matcher matcher = pattern.matcher(userRequest.getPassword());

        String regexNumberOnly = "\\d+";

        if (!userRequest.getPhoneNo().matches(regexNumberOnly)) {
            throw new WorxException(WorxErrorCode.INVALID_PHONE_NO);
        }
        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }

        Optional<Users> getByEmail = usersRepository.findByEmail(userRequest.getEmail());
        if (getByEmail.isPresent()) {
            throw new WorxException(WorxErrorCode.EMAIL_EXIST);
        }

        // phone no validation
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
        users.setDashboardLogo(null);

        users = usersRepository.save(users);

        EmailToken emailToken = new EmailToken();
        emailToken.setToken(random);
        emailToken.setStatus(EmailTokenStatus.UNUSED);
        emailToken.setEmail(userRequest.getEmail());
        emailToken.setType(EmailTokenType.NEWACC);
        emailToken.setExpiredToken(Instant.now().plus(15, ChronoUnit.MINUTES));
        groupService.createDefaultGroup(users.getId());

        String url = String.format("%s/account-confirmation?code=%s", worxProps.getWeb().getEndpoint(), random);

        emailService.sendWelcomingEmail(userRequest.getEmail(), userRequest.getFullname(), url);

        return users;

    }

    @Override
    public void sendMailConfirmation(EmailRequestDTO emailRequestDTO) {

        Optional<Users> checkEmail = usersRepository.findByEmail(emailRequestDTO.getEmail());
        if (checkEmail.isPresent()) {
            Users users = checkEmail.get();

            Optional<EmailToken> getEmailToken = emailTokenRepository.findByEmailAndTypeAndStatus(emailRequestDTO.getEmail(), EmailTokenType.NEWACC, EmailTokenStatus.UNUSED);

            if (getEmailToken.isEmpty()) {
                throw new WorxException(WorxErrorCode.ALREADY_VERIRIED);
            }
            String url = String.format("%s/account-confirmation?code=%s", worxProps.getWeb().getEndpoint(), getEmailToken.get().getToken());

            emailService.sendWelcomingEmail(emailRequestDTO.getEmail(), users.getFullname(), url);

        } else {
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }
    }

    public JwtResponse login(LoginRequest loginRequest) {

        JwtResponse jwtResponse = new JwtResponse();
        log.info("get users by email : {} ", loginRequest.getEmail());
        Optional<Users> users = usersRepository.findByEmail(loginRequest.getEmail());
        if (users.isPresent()) {

            try {
                String accessToken = "JWT Access Token here";

                Map<String, Object> data = new HashMap<>();
                data.put("accessToken", accessToken);

                jwtResponse.setData(data);
                jwtResponse.setStatus(HttpStatus.OK.value());

            } catch (BadCredentialsException e) {
                log.error("bad cridential");

                jwtResponse.setData("invalid email");
                jwtResponse.setStatus(HttpStatus.NOT_FOUND.value());
            }

        } else {
            jwtResponse.setData("invalid email");
            jwtResponse.setStatus(HttpStatus.NOT_FOUND.value());
        }

        return jwtResponse;
    }

    @Override
    public String changePassword(ChangePasswordRequest updatePasswordRequest) {

        String message = "";

        Pattern pattern = Pattern.compile(REGEX_PATTERN);
        Matcher matcher = pattern.matcher(updatePasswordRequest.getNewPassword());

        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }

        Optional<Users> optionalUsers = usersRepository.findByEmail(updatePasswordRequest.getEmail());
        if (optionalUsers.isEmpty()) {
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }
        Users getUsers = optionalUsers.get();

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = getUsers.getPassword();

        boolean matchPassword = passwordEncoder.matches(updatePasswordRequest.getOldPassword(), encodedPassword);
        log.info("Match Password user : {} ", matchPassword);

        if (matchPassword) {
            getUsers.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
            usersRepository.save(getUsers);

            message = "Update Password Success";

            return message;
        } else {
            throw new WorxException(WorxErrorCode.PASSWORD_NOT_MATCH);
        }
    }

    @Override
    public String resetPassword(String email) {

        try {

            Optional<Users> checkEmail = usersRepository.findByEmail(email);
            if (!checkEmail.isPresent()) {
                throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
            }
            String random = UUID.randomUUID().toString().replace("-", "");

            EmailToken emailToken = new EmailToken();
            emailToken.setToken(random);
            emailToken.setStatus(EmailTokenStatus.UNUSED);
            emailToken.setEmail(email);
            emailToken.setType(EmailTokenType.RESETPWD);
            emailToken.setExpiredToken(Instant.now().plus(15, ChronoUnit.MINUTES));
            emailTokenRepository.save(emailToken);

            String url = String.format("https://dev.worx.id/reset-password?code=%s", random);

            emailService.sendResetPassword(email, checkEmail.get().getFullname(), url);

            return "Reset Password Request Success, Please check your email";
        } catch (Exception e) {
            throw new WorxException(WorxErrorCode.FAILED_SEND_EMAIL);
        }
    }

    @Override
    public void verifyPasswordResetToken(ChangePasswordToken changePasswordToken) {

        Pattern pattern = Pattern.compile(REGEX_PATTERN);
        Matcher matcher = pattern.matcher(changePasswordToken.getNewPassword());

        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }

        Optional<EmailToken> checkData = emailTokenRepository.findByTokenAndTypeAndStatus(changePasswordToken.getToken(), EmailTokenType.RESETPWD, EmailTokenStatus.UNUSED);

        if (!checkData.isPresent()) {
            throw new WorxException(WorxErrorCode.TOKEN_EMAIL_ERROR);
        }

        if(checkData.get().getExpiredToken().isAfter(Instant.now())){

            Optional<Users> users = usersRepository.findByEmail(checkData.get().getEmail());
            if (users.isPresent()) {
                Users updateUsers = users.get();

                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

                updateUsers.setPassword(passwordEncoder.encode(changePasswordToken.getNewPassword()));
                usersRepository.save(updateUsers);

                EmailToken updateData = checkData.get();
                updateData.setStatus(EmailTokenStatus.USED);
                emailTokenRepository.save(updateData);
            }
        } else {
            throw new WorxException(WorxErrorCode.TOKEN_EXPIRED_ERROR);
        }

    }

    @Override
    public void verifyAccount(String code, HttpServletResponse httpServletResponse) throws IOException {

        Optional<EmailToken> checkToken = emailTokenRepository.findByTokenAndTypeAndStatus(code, EmailTokenType.NEWACC, EmailTokenStatus.UNUSED);

        if (!checkToken.isPresent()) {
            throw new WorxException(WorxErrorCode.TOKEN_INVALID_ERROR);
        }

        //check expired
        if(checkToken.get().getExpiredToken().isAfter(Instant.now())){
            EmailToken updateData = checkToken.get();
            updateData.setStatus(EmailTokenStatus.USED);
            emailTokenRepository.save(updateData);

            httpServletResponse.sendRedirect("https://dev.worx.id/sign-in");
        } else {
            throw new WorxException(WorxErrorCode.TOKEN_EXPIRED_ERROR);
        }

    }

    @Override
    public UserDetailsResponse getByEmail(String email) {
        Optional<Users> getEmail = usersRepository.findByEmail(email);
        if (getEmail.isEmpty()) {
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }
        Users data = getEmail.get();
        UserDetailsResponse userDetailsResponse = new UserDetailsResponse();
        userDetailsResponse.setFullname(data.getFullname());
        userDetailsResponse.setCountry(data.getCountry());
        userDetailsResponse.setOrganizationName(data.getOrganizationName());
        userDetailsResponse.setOrganizationCode(data.getOrganizationCode());
        userDetailsResponse.setEmail(data.getEmail());
        userDetailsResponse.setPhone(data.getPhone());

        return userDetailsResponse;
    }

    public String organizationCode() {

        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        int length = 5;
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(alphabet.length());
            char randomChar = alphabet.charAt(index);
            sb.append(randomChar);
        }

        return "WX" + sb;
    }

    public String formatPhone(String phone, String country) {

        String resultPhone = "";

        if (country.equals("ID")) {
            String get2FirstCharacter = phone.substring(0, 2);
            if (get2FirstCharacter.equals("08")) {
                resultPhone = "62" + phone.substring(1);
            } else {
                resultPhone = phone;
            }
        }
        return resultPhone;
    }

    @Override
    public String createRefreshToken(String email) {

        Integer expiredTimeRefreshToken = worxProps.getToken().getRefresh();
        Optional<Users> getByEmail = usersRepository.findByEmail(email);

        if (!getByEmail.isPresent()) {
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

    @Override
    public Users updateInformation(UserUpdateRequest userUpdateRequest) {
        Users result;

        Optional<Users> checkUsers = usersRepository.findById(authenticationContext.getUsers().getId());
        if(checkUsers.isEmpty()){
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }else{
            if(userUpdateRequest.getLogoFileId() == null){

                result = updateWithoutLogo(checkUsers.get(),userUpdateRequest);
            }else{
                result = updateWithLogo(checkUsers.get(), userUpdateRequest);
            }
        }

        return result;
    }

    public UserDetailsResponse toDTOUserDetails(Users users) {
        return usersUpdateMapper.toDto(users);
    }

    public UserResponse toDTO(Users users) {
        return usersMapper.toDto(users);
    }
    public Users findByEmail(String email) {

        Optional<Users> getUser = usersRepository.findByEmail(email);
        if (getUser.isEmpty()) {
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
        }
        return getUser.get();
    }

    public Users updateWithoutLogo(Users userData,UserUpdateRequest userUpdateRequest){

        userData.setFullname(userUpdateRequest.getFullname());
        userData.setOrganizationName(userUpdateRequest.getOrganizationName());
        userData.setPhone(userUpdateRequest.getPhone());
        usersRepository.save(userData);

        return userData;
    }

    public Users updateWithLogo(Users userData, UserUpdateRequest userUpdateRequest){

        Optional<File> checkFileId = fileRepository.findById(userUpdateRequest.getLogoFileId());
        if(checkFileId.isEmpty()){
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }else{
            File files = checkFileId.get();
            if(fileStorageService.isObjectExist(files.getPath())){

                userData.setFullname(userUpdateRequest.getFullname());
                userData.setOrganizationName(userUpdateRequest.getOrganizationName());
                userData.setPhone(userUpdateRequest.getPhone());
                userData.setDashboardLogo(files);
                usersRepository.save(userData);

                return userData;
            }else{
                throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
            }
        }
    }
    @Scheduled(cron = "59 59 23 * * ?")
    public void deleteEmailToken() {

        List<Long> ids = emailTokenRepository.getAllByLessThan(Instant.now());
        log.info("Delete {} ", ids.size(), " email token");
        emailTokenRepository.deleteAllById(ids);
    }

    @Scheduled(cron = "59 59 23 * * ?")
    public void deleteRefreshToken() {

        List<Long> ids = refreshTokenRepository.getAllByLessThan(Instant.now());
        log.info("Delete {} ", ids.size(), " refresh token");
        refreshTokenRepository.deleteAllById(ids);

    }

}
