package id.worx.worx.service;

import java.util.List;
import java.util.Optional;

import id.worx.worx.common.model.request.FormTemplateRequest;
import id.worx.worx.entity.users.Users;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import id.worx.worx.entity.FormTemplate;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.repository.FormTemplateRepository;
import id.worx.worx.repository.GroupRepository;
import id.worx.worx.service.specification.FormTemplateSpecification;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FormTemplateServiceImplTest {

    @Mock
    EmailService emailService;

    @Mock
    FormTemplateRepository templateRepository;
    @Mock
    GroupRepository groupRepository;

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
                emailService,
                templateRepository,
                groupRepository,
                templateMapper,
                specification,
                authContext);
    }

    @Test
    void givenFormTemplateId_whenDelete_thenReturn() {
        Long formTemplateId = 1L;
        Long userId=1L;
        FormTemplate template = FormTemplate.builder()
                .id(1L)
                .build();
        Users user= Users.builder()
            .id(1L)
            .build();

        when(authContext.getUsers()).thenReturn(user);
        when(templateRepository.findByIdAndUserId(formTemplateId,userId)).thenReturn(Optional.of(template));

        templateService.delete(formTemplateId);

        verify(templateRepository, times(1)).delete(template);
    }

    @Test
    void givenNonExistentFormTemplateId_whenDelete_thenThrowWorxException() {
        Long nonExistentFormTemplateId = 1L;
        Users user= Users.builder()
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
