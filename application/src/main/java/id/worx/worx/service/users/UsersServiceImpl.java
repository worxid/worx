package id.worx.worx.service.users;

import id.worx.worx.entity.users.TokenHistory;
import id.worx.worx.entity.users.Users;
import id.worx.worx.enums.UserStatus;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.web.mailTemplate.EmailVerification;
import id.worx.worx.web.mailTemplate.ResetPasswordMail;
import id.worx.worx.model.request.auth.*;
import id.worx.worx.model.request.users.UserRequest;
import id.worx.worx.model.response.auth.JwtResponse;
import id.worx.worx.model.response.users.UserResponse;
import id.worx.worx.repository.RefreshTokenRepository;
import id.worx.worx.repository.TokenHistoryRepository;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.util.JwtUtils;
import id.worx.worx.util.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService, UserDetailsService {
    private final UsersRepository usersRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    private final TokenHistoryRepository tokenHistoryRepository;

    @Autowired
    private  JwtUtils jwtUtils;

    @Autowired
    private MailService mailService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> users = usersRepository.findByUsername(username);

        if(users == null){
            throw new WorxException(WorxErrorCode.USERNAME_EXIST);
        }else{
            log.info("User found in the database : {} ", username);
        }
        Collection<SimpleGrantedAuthority> authotities = new ArrayList<>();
        users.get().getRoles().forEach(role -> {
            authotities.add(new SimpleGrantedAuthority(role.getName()) );
            });
        return new User(users.get().getUsername(), users.get().getPassword(), authotities);
    }
    @Transactional
    public UserResponse createUser(UserRequest userRequest, HttpServletRequest httpServletRequest){

        String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>_]).{8,20}$";
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(userRequest.getPassword());

        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }
        try{
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String random = UUID.randomUUID().toString().replace("-", "");

            Optional<Users> getByUsername = usersRepository.findByUsername(userRequest.getUsername());
            if (getByUsername.isPresent()) {
                throw new WorxException(WorxErrorCode.USERNAME_EXIST);
            }

            Optional<Users> getByEmail = usersRepository.findByEmail(userRequest.getEmail());
            if (getByEmail.isPresent()) {
                throw new WorxException(WorxErrorCode.EMAIL_EXIST);
            }

            Users users = new Users();
            users.setEmail(userRequest.getEmail());
            users.setUsername(userRequest.getUsername());
            users.setPhone(userRequest.getPhoneNo());
            users.setStatus(UserStatus.INACTIVE);
            users.setOrganizationName(userRequest.getOrganizationName());
            users.setCountry(userRequest.getCountry());
            users.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            users.setOrganizationCode(organizationCode());
            usersRepository.save(users);

            TokenHistory tokenHistory = new TokenHistory();
            tokenHistory.setToken(random);
            tokenHistory.setStatus("UNUSED");
            tokenHistory.setEmail(userRequest.getEmail());
            tokenHistory.setType("NEWACC");
            tokenHistory.setExpiredToken(ZonedDateTime.now().plusMinutes(15));
            tokenHistoryRepository.save(tokenHistory);

            String url = String.format(httpServletRequest.getRequestURL() + "/account-confirmation?code=%s", random);
            String subject = "WORX - Email Confirmation";
            String mailBody = EmailVerification.EmailVerify(url);

            mailService.sendEmailTemplate(userRequest.getEmail(),subject,mailBody,false,true);


        }catch (Exception e){
            throw new WorxException(WorxErrorCode.REQUEST_DATA);
        }

        return null;


    }

    public JwtResponse login(LoginRequest loginRequest) {

        JwtResponse jwtResponse = new JwtResponse();
        log.info("get users by email : {} ", loginRequest.getEmail());
        Optional<Users> users = usersRepository.findByEmail(loginRequest.getEmail());
        if(users != null){

            try{

//                Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
//                );
//
//                Users getPrincipal = (Users) authentication.getPrincipal();
                String accessToken = "JWT Access Token here";

                Map<String, Object> data = new HashMap<>();
                data.put("accessToken", accessToken);
                //data.put("email", getPrincipal.getEmail());

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

        String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>_]).{8,20}$";
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(updatePasswordRequest.getNewPassword());

        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }

        Optional<Users> optionalUsers = usersRepository.findByEmail(updatePasswordRequest.getEmail());
        Users getUsers = optionalUsers.get();

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = getUsers.getPassword();

        boolean matchPassword = passwordEncoder.matches(updatePasswordRequest.getOldPassword(), encodedPassword);
        log.info("Match Password user : {} ", matchPassword);

        if(optionalUsers.isPresent()){

            if ((matchPassword==true)){
                getUsers.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
                usersRepository.save(getUsers);

                message = "Update Password Success";

                return message;
            }else{
                throw new WorxException(WorxErrorCode.PASSWORD_NOT_MATCH);
            }
        }else{
            throw new WorxException(WorxErrorCode.EMAIL_NOT_FOUND);
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

            TokenHistory tokenHistory = new TokenHistory();
            tokenHistory.setToken(random);
            tokenHistory.setStatus("UNUSED");
            tokenHistory.setEmail(email);
            tokenHistory.setType("RESETPWD");
            tokenHistory.setExpiredToken(ZonedDateTime.now().plusMinutes(15));
            tokenHistoryRepository.save(tokenHistory);

            String url = String.format("https://dev.worx.id/reset-password?code=%s", random);
            String subject = "WORX - Reset Password";
            String mailBody = ResetPasswordMail.ResetPasswordTemplate(url);

            mailService.sendEmailTemplate(email,subject,mailBody,false,true);

            return "Reset Password Request Success, Please check your email";
        }catch (Exception e){
            throw new WorxException(WorxErrorCode.FAILED_SEND_EMAIL);
        }
    }

    @Override
    public void verifyPasswordResetToken(ChangePasswordToken changePasswordToken){


        String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>_]).{8,20}$";
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        Matcher matcher = pattern.matcher(changePasswordToken.getNewPassword());

        if (!matcher.matches()) {
            throw new WorxException(WorxErrorCode.PATTERN_PASSWORD_VALIDATION);
        }

        Optional<TokenHistory> checkData = tokenHistoryRepository.findByTokenAndEmailAndStatusAndType(changePasswordToken.getToken(), changePasswordToken.getEmail(), "ACTIVE","RESETPWD");

        if(!checkData.isPresent()){
            throw new WorxException(WorxErrorCode.TOKEN_EMAIL_ERROR);
        }

        if(checkData.get().getExpiredToken().compareTo(ZonedDateTime.now(ZoneId.systemDefault())) >= 0){

            Optional<Users> users = usersRepository.findByEmail(changePasswordToken.getEmail());
            Users updateUsers = users.get();

            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            updateUsers.setPassword(passwordEncoder.encode(changePasswordToken.getNewPassword()));
            usersRepository.save(updateUsers);


            TokenHistory updateData = checkData.get();
            updateData.setStatus("USED");
            tokenHistoryRepository.save(updateData);

        }else{
            throw new WorxException(WorxErrorCode.TOKEN_EXPIRED_ERROR);
        }

    }

    @Override
    public void verifyAccount(String code, HttpServletResponse httpServletResponse) throws IOException {

        Optional<TokenHistory> checkToken = tokenHistoryRepository.findByTokenAndTypeAndStatus(code,"NEWACC","UNUSED");

        if(!checkToken.isPresent()){
            throw new WorxException(WorxErrorCode.TOKEN_INVALID_ERROR);
        }

        //check expired
        if(checkToken.get().getExpiredToken().compareTo(ZonedDateTime.now(ZoneId.systemDefault())) >= 0){
            TokenHistory updateData = checkToken.get();
            updateData.setStatus("USED");
            tokenHistoryRepository.save(updateData);

            httpServletResponse.sendRedirect("https://dev.worx.id/sign-in");
        }else{
            throw new WorxException(WorxErrorCode.TOKEN_EXPIRED_ERROR);
        }

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
}
