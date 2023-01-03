package id.worx.worx.service.users;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import id.worx.worx.mapper.UsersUpdateMapper;
import id.worx.worx.repository.*;
import id.worx.worx.service.AuthenticationContext;
import id.worx.worx.service.storage.FileStorageService;
import id.worx.worx.service.storage.client.MinioClientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.config.properties.WebProperties;
import id.worx.worx.config.properties.WorxProperties;
import id.worx.worx.entity.users.Users;
import id.worx.worx.mapper.UsersMapper;
import id.worx.worx.repository.EmailTokenRepository;
import id.worx.worx.repository.FileRepository;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.repository.RefreshTokenRepository;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.service.EmailService;
import id.worx.worx.service.GroupService;
import id.worx.worx.util.JwtUtils;

@ExtendWith(MockitoExtension.class)
class UsersServiceImplTest {

    @Mock
    WorxProperties worxProps;

    @Mock
    UsersRepository usersRepository;
    @Mock
    RefreshTokenRepository refreshTokenRepository;
    @Mock
    EmailTokenRepository emailTokenRepository;
    @Mock
    GroupRepository groupRepository;

    @Mock
    JwtUtils jwtUtils;
    @Mock
    EmailService emailService;
    @Mock
    GroupService groupService;
    @Mock
    UsersMapper usersMapper;

    @Mock
    UsersUpdateMapper usersUpdateMapper;

    private UsersService usersService;

    @Mock
    AuthenticationContext authenticationContext;

    @Mock
    FileRepository fileRepository;

    @Mock
    FileStorageService fileStorageService;

    @Mock
    MinioClientService clientService;

    @BeforeEach
    void init() {
        usersService = new UsersServiceImpl(
                usersRepository,
                worxProps,
                refreshTokenRepository,
                emailTokenRepository,
                jwtUtils,
                emailService,
                groupService,
                usersMapper,
                usersUpdateMapper,
                authenticationContext,
                fileRepository,
                fileStorageService,
                clientService);
    }

    @Test
    void givenUserRequest_whenCreateUser_thenReturn() {
        UserRequest userRequest = new UserRequest();
        userRequest.setFullname("My Fullname");
        userRequest.setPassword("MyPassword123!");
        userRequest.setEmail("email@example.com");
        userRequest.setPhoneNo("628307560133");
        userRequest.setCountry("Indonesia");
        userRequest.setOrganizationName("My Organization");

        WebProperties webProps = new WebProperties();
        webProps.setEndpoint("http://localhost:3000");

        when(worxProps.getWeb()).thenReturn(webProps);

        when(usersRepository.save(any(Users.class))).thenAnswer(invoc -> {
            Users user = (Users) invoc.getArguments()[0];
            user.setId(1L);
            return user;
        });

        Users user = usersService.createUser(userRequest);
        verify(usersRepository, times(1)).save(user);
    }
}
