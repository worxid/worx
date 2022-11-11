package id.worx.worx.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import id.worx.worx.config.properties.WorxProperties;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.Group;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.repository.DeviceRepository;
import id.worx.worx.repository.FormTemplateRepository;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.repository.UsersRepository;
import id.worx.worx.service.specification.FormTemplateSpecification;

@ExtendWith(MockitoExtension.class)
class FormTemplateServiceImplTest {

    @Autowired
    WorxProperties worxProps = new WorxProperties();

    @Mock
    EmailService emailService;

    @Mock
    DeviceRepository deviceRepository;
    @Mock
    FormTemplateRepository templateRepository;
    @Mock
    GroupRepository groupRepository;
    @Mock
    UsersRepository usersRepository;

    @Mock
    FormTemplateSpecification specification;

    @Mock
    FormTemplateMapper templateMapper;

    private FormTemplateService templateService;

    @Mock
    AuthenticationContext authContext;

    @BeforeEach
    void init() {
        templateService = new FormTemplateServiceImpl(
                worxProps,
                emailService,
                deviceRepository,
                templateRepository,
                groupRepository,
                usersRepository,
                templateMapper,
                specification,
                authContext);
    }

    FormTemplate initOneTemplate() {
        Long formTemplateId = 1L;
        String urlCode = "dZi1drVbbOfMBB5I3Ppfs";
        FormTemplate template = FormTemplate.builder()
                .id(formTemplateId)
                .urlCode(urlCode)
                .build();
        return template;
    }

    @Test
    void givenFormTemplateRequest_whenCreate_thenReturn() {

    }

    @Test
    void givenFormTemplateId_whenRead_thenReturn() {
        Long formTemplateId = 1L;
        Long userId = 1L;
        Users user = Users.builder()
                .id(userId)
                .build();
        FormTemplate expectedTemplate = initOneTemplate();
        when(authContext.getUsers()).thenReturn(user);
        when(templateRepository.findByIdAndUserId(formTemplateId, userId)).thenReturn(Optional.of(expectedTemplate));

        FormTemplate actualTemplate = templateService.read(expectedTemplate.getId());

        assertEquals(expectedTemplate, actualTemplate);
    }

    @Test
    void givenFormTemplateUrlCode_whenRead_thenReturn() {
        String urlCode = "dZi1drVbbOfMBB5I3Ppfs";
        FormTemplate expectedTemplate = initOneTemplate();
        when(templateRepository.findByUrlCode(urlCode)).thenReturn(Optional.of(expectedTemplate));

        FormTemplate actualTemplate = templateService.read(expectedTemplate.getUrlCode());

        assertEquals(expectedTemplate, actualTemplate);
    }

    @Test
    void givenDeviceCode_whenList_thenReturn() {
        String deviceCode = "b97ab7803a27991f";
        when(deviceRepository.findByDeviceCode(deviceCode)).thenReturn(Optional.empty());
        Assertions.assertThrows(WorxException.class, () -> templateService.list(deviceCode));

        FormTemplate expectedTemplate1 = FormTemplate.builder()
                .id(1L)
                .build();
        FormTemplate expectedTemplate2 = FormTemplate.builder()
                .id(2L)
                .build();
        Group group = Group.builder()
                .templates(Set.of(expectedTemplate2, expectedTemplate1))
                .build();
        Device device = Device.builder()
                .id(1L)
                .deviceCode(deviceCode)
                .assignedGroups(Set.of(group))
                .build();
        when(deviceRepository.findByDeviceCode(deviceCode)).thenReturn(Optional.of(device));

        List<FormTemplate> actualTemplates = templateService.list(deviceCode);
        assertEquals(2, actualTemplates.size());
        assertEquals(expectedTemplate1, actualTemplates.get(0));
    }

    @Test
    void givenFormTemplateId_whenDelete_thenReturn() {
        Long formTemplateId = 1L;
        Long userId = 1L;
        FormTemplate template = FormTemplate.builder()
                .id(1L)
                .build();
        Users user = Users.builder()
                .id(1L)
                .build();

        when(authContext.getUsers()).thenReturn(user);
        when(templateRepository.findByIdAndUserId(formTemplateId, userId)).thenReturn(Optional.of(template));

        templateService.delete(formTemplateId);

        verify(templateRepository, times(1)).delete(template);
    }

    @Test
    void givenNonExistentFormTemplateId_whenDelete_thenThrowWorxException() {
        Long nonExistentFormTemplateId = 1L;
        Users user = Users.builder()
                .id(1L)
                .build();
        lenient().when(templateRepository.findById(nonExistentFormTemplateId)).thenReturn(Optional.empty());
        when(authContext.getUsers()).thenReturn(user);
        Assertions.assertThrows(WorxException.class, () -> templateService.delete(nonExistentFormTemplateId));
    }

    @Test
    void givenMultipleFormTemplateIds_whenDelete_thenReturn() {
        List<Long> formTemplateIds = List.of(1L, 2L);
        FormTemplate template1 = FormTemplate.builder()
                .id(1L)
                .build();

        FormTemplate template2 = FormTemplate.builder()
                .id(2L)
                .build();

        when(templateRepository.findAllById(formTemplateIds)).thenReturn(List.of(template1, template2));

        templateService.delete(formTemplateIds);

        verify(templateRepository, times(1)).delete(template1);
        verify(templateRepository, times(1)).delete(template2);
    }

}
