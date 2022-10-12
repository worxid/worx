package id.worx.worx.service;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

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

    @BeforeEach
    void init() {
        templateService = new FormTemplateServiceImpl(
                emailService,
                templateRepository,
                groupRepository,
                templateMapper,
                specification);
    }

    @Test
    void givenFormTemplateId_whenDelete_thenReturn() {
        Long formTemplateId = 1L;
        FormTemplate template = FormTemplate.builder()
                .id(1L)
                .build();

        when(templateRepository.findById(formTemplateId)).thenReturn(Optional.of(template));

        templateService.delete(formTemplateId);

        verify(templateRepository, times(1)).delete(template);
    }

    @Test
    void givenNonExistentFormTemplateId_whenDelete_thenThrowVocException() {
        Long nonExistentFormTemplateId = 1L;

        when(templateRepository.findById(nonExistentFormTemplateId)).thenReturn(Optional.empty());

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