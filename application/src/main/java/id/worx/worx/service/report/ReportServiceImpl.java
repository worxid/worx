package id.worx.worx.service.report;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import fr.opensagres.xdocreport.core.XDocReportException;
import fr.opensagres.xdocreport.core.document.SyntaxKind;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.images.ByteArrayImageProvider;
import fr.opensagres.xdocreport.document.images.IImageProvider;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import id.worx.worx.common.WorxConstants;
import id.worx.worx.common.model.dto.FileDTO;
import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.value.FileValue;
import id.worx.worx.common.model.forms.value.PhotoValue;
import id.worx.worx.common.model.forms.value.SignatureValue;
import id.worx.worx.common.model.forms.value.Value;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.repository.FormRepository;
import id.worx.worx.service.AuthenticationContext;
import id.worx.worx.service.storage.FileStorageService;
import id.worx.worx.util.FormUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final AuthenticationContext authContext;

    private final FormMapper formMapper;

    private final FormRepository formRepository;

    private final FileStorageService storageService;

    @Override
    public ByteArrayOutputStream getSubmissionReport(Long formId) {
        Users user = authContext.getUsers();
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR));
        FormDTO formDTO = formMapper.toDTO(form);
        FormContext formContext = FormContext.builder()
                .name(formDTO.getLabel())
                .description(formDTO.getDescription())
                .source(formDTO.getSource().getLabel())
                .submitDate(formDTO.getSubmitDate())
                .submitLocation(formDTO.getSubmitLocation())
                .build();

        IImageProvider logoImageProvider = null;
        try {
            InputStream defaultLogo = new ClassPathResource("templates/default_logo.png").getInputStream();
            logoImageProvider = new ByteArrayImageProvider(defaultLogo);
            logoImageProvider.setSize(99.84f, 29.76f);
        } catch (IOException e) {
            log.error("Failed to load default logo", e);
        }

        if (Objects.nonNull(user.getDashboardLogo())) {
            try {
                InputStream logoInputStream = new ClassPathResource("templates/default_logo.png").getInputStream();
                logoImageProvider = new ByteArrayImageProvider(logoInputStream);
                logoImageProvider.setSize(99.84f, 29.76f);
            } catch (IOException e) {
                log.error("Failed to load user logo", e);
            }
        }

        Organization org = Organization.builder()
                .logo(logoImageProvider)
                .build();
        List<FieldContext> fields = getFieldContexts(formDTO);

        try (InputStream in = new ClassPathResource(WorxConstants.TEMPLATE_REPORT_SUBMISSION_DOCX_PATH)
                .getInputStream()) {
            IXDocReport report = XDocReportRegistry.getRegistry().loadReport(in, TemplateEngineKind.Freemarker);

            FieldsMetadata metadata = report.createFieldsMetadata();
            metadata.addFieldAsTextStyling("submitAddress", SyntaxKind.Html);
            metadata.load("v", ValueContext.class);
            metadata.load("organization", Organization.class);

            IContext context = report.createContext();
            context.put("organization", org);
            context.put("form", formContext);
            context.put("fields", fields);

            report.process(context, output);
        } catch (IOException e) {
            log.error("Error during render PDF report", e);
        } catch (XDocReportException e) {
            log.error("Error during render PDF report", e);
        }
        return output;
    }

    private List<FieldContext> getFieldContexts(FormDTO formDTO) {
        List<Field> fields = formDTO.getFields();
        Map<String, Value> values = formDTO.getValues();

        List<FieldContext> results = new ArrayList<>();

        for (Field field : fields) {
            if (values.containsKey(field.getId())) {
                Value value = values.get(field.getId());

                if (field.getType().containsFile()) {
                    List<FileDTO> files = this.getFiles(value);
                    results.add(FormUtils.toFieldContext(field, files));
                } else {
                    results.add(FormUtils.toFieldContext(field, value));
                }
            }
        }

        return results;
    }

    private List<FileDTO> getFiles(Value value) {
        List<Long> fileIds = new ArrayList<>();

        if (value instanceof FileValue) {
            FileValue temp = (FileValue) value;
            fileIds = temp.getFileIds();
        }

        if (value instanceof PhotoValue) {
            PhotoValue temp = (PhotoValue) value;
            fileIds = temp.getFileIds();
        }

        if (value instanceof SignatureValue) {
            SignatureValue temp = (SignatureValue) value;
            fileIds = List.of(temp.getFileId());
        }

        return storageService.getAll(fileIds);
    }

}
