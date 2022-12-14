package id.worx.worx.service.report;

import java.awt.Dimension;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.common.usermodel.HyperlinkType;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFHyperlink;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.export.FormExportEntry;
import id.worx.worx.common.model.export.FormExportObject;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.value.FileValue;
import id.worx.worx.common.model.forms.value.PhotoValue;
import id.worx.worx.common.model.forms.value.SignatureValue;
import id.worx.worx.common.model.forms.value.Value;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.users.Users;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.repository.FormRepository;
import id.worx.worx.repository.FormTemplateRepository;
import id.worx.worx.service.AuthenticationContext;
import id.worx.worx.service.storage.FileStorageService;
import id.worx.worx.util.FormUtils;
import kotlin.text.Charsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FormExportServiceImpl implements FormExportService {

    private static final int MINIMUM_SUBMISSION_COUNT_VALUE = 0;
    private static final int MAXIMUM_SUBMISSION_COUNT_VALUE = 1000;

    private static final int HEADER_ROW_NUMBER_VALUE = 0;

    private static final Dimension DEFAULT_DIMENSION_VALUE = new Dimension(480, 360);

    private final AuthenticationContext authContext;

    private final FormRepository formRepository;
    private final FormTemplateRepository templateRepository;

    private final FileStorageService storageService;

    private final FormMapper formMapper;
    private final FormTemplateMapper templateMapper;

    @Override
    public ByteArrayOutputStream toCSV(Long id) {
        Users user = authContext.getUsers();
        FormTemplate template = this.findByIdorElseThrowNotFound(id, user.getId());
        FormExportObject exportObject = this.toFormExportObject(template);
        List<String> headers = exportObject.getHeadersWithQuote();
        List<List<String>> valueRows = exportObject.getValueRowsWithQuote();

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try (OutputStreamWriter writer = new OutputStreamWriter(output, Charsets.UTF_8)) {
            writer.write(String.join(",", headers));
            writer.write(StringUtils.CR);
            writer.write(StringUtils.LF);
            for (List<String> values : valueRows) {
                writer.write(String.join(",", values));
                writer.write(StringUtils.CR);
                writer.write(StringUtils.LF);
            }
        } catch (IOException e) {
            log.error("Failed to write to the stream", e);
            throw new WorxException(WorxErrorCode.INTERNAL_SERVER_ERROR);
        }

        return output;
    }

    @Override
    public ByteArrayOutputStream toXLS(Long id) {
        Users user = authContext.getUsers();
        FormTemplate template = this.findByIdorElseThrowNotFound(id, user.getId());
        FormExportObject exportObject = this.toFormExportObject(template);
        List<FormExportEntry> headers = exportObject.getHeaders();
        List<List<FormExportEntry>> valueRows = exportObject.getValueRows();
        return toXLSHelper(headers, valueRows);
    }

    private ByteArrayOutputStream toXLSHelper(List<FormExportEntry> headers, List<List<FormExportEntry>> valueRows) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet();

            fillHeader(sheet, headers);
            fillFormEntry(workbook, sheet, valueRows);
            prettify(workbook, sheet, headers.size());

            workbook.write(output);

        } catch (IOException e) {
            log.error("Failed to write to the stream", e);
            throw new WorxException(WorxErrorCode.INTERNAL_SERVER_ERROR);
        }

        return output;
    }

    private void fillHeader(Sheet sheet, List<FormExportEntry> headers) {
        Row headerRow = sheet.createRow(HEADER_ROW_NUMBER_VALUE);
        for (int i = 0; i < headers.size(); i++) {
            String header = headers.get(i).getValues().get(0);
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(header);
        }
    }

    private void fillFormEntry(Workbook workbook, Sheet sheet, List<List<FormExportEntry>> valueRows) {
        CreationHelper creationHelper = workbook.getCreationHelper();

        CellStyle hlinkstyle = workbook.createCellStyle();
        Font hlinkfont = workbook.createFont();
        hlinkfont.setUnderline(Font.U_SINGLE);
        hlinkfont.setColor(IndexedColors.BLUE.index);
        hlinkstyle.setFont(hlinkfont);

        int rowNumber = 1;
        for (int i = 0; i < valueRows.size(); i++) {
            List<FormExportEntry> entries = valueRows.get(i);
            int maxRows = entries.stream()
                    .mapToInt(FormExportEntry::size)
                    .max()
                    .orElseThrow(NoSuchElementException::new);
            for (int j = 0; j < maxRows; j++) {
                sheet.createRow(rowNumber + j);
            }

            for (int columnIndex = 0; columnIndex < entries.size(); columnIndex++) {
                FormExportEntry entry = entries.get(columnIndex);
                int size = entry.size();
                for (int k = 0; k < size; k++) {
                    Row tempRow = sheet.getRow(rowNumber + k);
                    Cell cell = tempRow.createCell(columnIndex);
                    cell.setCellValue(entry.getValues().get(k));

                    if (entry.hasHyperlink()) {
                        XSSFHyperlink link = (XSSFHyperlink) creationHelper.createHyperlink(HyperlinkType.URL);
                        link.setAddress(entry.getHyperlinks().get(k));
                        cell.setHyperlink(link);
                        cell.setCellStyle(hlinkstyle);
                    }
                }

                if (hasCellRange(size, maxRows)) {
                    sheet.addMergedRegion(
                            new CellRangeAddress(rowNumber, rowNumber + maxRows - 1, columnIndex, columnIndex));
                }
            }

            rowNumber = rowNumber + maxRows;
        }
    }

    private void prettify(Workbook workbook, Sheet sheet, int columnCount) {
        Row headerRow = sheet.getRow(HEADER_ROW_NUMBER_VALUE);
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        for (int i = 0; i < columnCount; i++) {
            sheet.autoSizeColumn(i);
            Cell cell = headerRow.getCell(i);
            if (Objects.nonNull(cell)) {
                cell.setCellStyle(headerStyle);
                String value = cell.getStringCellValue();
                if (!value.isBlank()) {
                    cell.setCellValue(FormUtils.formatLabel(value));
                }
            }
        }
    }

    private boolean hasCellRange(int size, int maxRows) {
        return size <= 1 && maxRows > 1;
    }

    @Override
    public ByteArrayOutputStream saveFormAsPDF(Long formId) {
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
                // TODO change with custom logo
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
        List<FieldContext> fields = toFieldContexts(formDTO);

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

    private FormTemplate findByIdorElseThrowNotFound(Long id, Long userId) {
        Optional<FormTemplate> optTemplate = templateRepository.findByIdAndUserId(id, userId);

        if (optTemplate.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return optTemplate.get();
    }

    private FormExportObject toFormExportObject(FormTemplate template) {
        FormTemplateDTO templateDTO = templateMapper.toDTO(template);
        Set<Form> forms = template.getForms();
        Set<Form> sorted = forms.stream()
                .sorted(Comparator.comparing(Form::getSubmitDate))
                .collect(Collectors.toCollection(LinkedHashSet::new));
        List<FormDTO> formDTOs = sorted.stream()
                .map(formMapper::toDTO)
                .collect(Collectors.toList());
        Integer fromIndex = Math.max(MINIMUM_SUBMISSION_COUNT_VALUE, formDTOs.size() - MAXIMUM_SUBMISSION_COUNT_VALUE);
        formDTOs = formDTOs.subList(fromIndex, formDTOs.size());

        List<FormExportEntry> headers = new ArrayList<>();
        headers.add(new FormExportEntry("Source"));
        headers.add(new FormExportEntry("Submission Date"));
        headers.add(new FormExportEntry("Submission Address"));

        List<Field> fields = templateDTO.getFields();
        List<FormExportEntry> fieldEntries = fields.stream()
                .filter(field -> !field.getType().isSeparator())
                .map(field -> new FormExportEntry(field.getLabel()))
                .collect(Collectors.toList());
        headers.addAll(fieldEntries);

        List<List<FormExportEntry>> valueRows = formDTOs.stream()
                .map(formDTO -> this.createFormExportEntries(formDTO, fields))
                .collect(Collectors.toList());

        return new FormExportObject(headers, valueRows);

    }

    private List<FormExportEntry> createFormExportEntries(FormDTO formDTO, List<Field> fields) {
        List<FormExportEntry> valueRow = new ArrayList<>();
        String label = FormUtils.formatLabel(formDTO.getSource().getLabel());
        String submitDate = FormUtils.formatDateToString(formDTO.getSubmitDate());
        valueRow.add(new FormExportEntry(label));
        valueRow.add(new FormExportEntry(submitDate));
        valueRow.add(new FormExportEntry(formDTO.getSubmitLocation().getAddress()));

        Map<String, Value> values = formDTO.getValues();

        for (Field field : fields) {
            List<String> valueStrings = List.of();
            List<String> hyperlinks = List.of();

            if (!field.getType().isSeparator()) {
                if (values.containsKey(field.getId())) {
                    Value value = values.get(field.getId());

                    if (field.getType().containsFile()) {
                        List<FileDTO> files = this.getFiles(value);
                        valueStrings = FormUtils.getValueAsString(files);
                        hyperlinks = FormUtils.getHyperlinkAsString(files);
                    } else {
                        valueStrings = FormUtils.getValueAsString(field, value);
                    }
                }

                FormExportEntry entry;
                if (hyperlinks.isEmpty()) {
                    entry = new FormExportEntry(valueStrings);
                } else {
                    entry = new FormExportEntry(valueStrings, hyperlinks);
                }
                valueRow.add(entry);
            }

        }

        return valueRow;
    }

    private List<FieldContext> toFieldContexts(FormDTO formDTO) {
        List<Field> fields = formDTO.getFields();
        Map<String, Value> values = formDTO.getValues();

        List<FieldContext> results = new ArrayList<>();

        for (Field field : fields) {
            if (values.containsKey(field.getId())) {
                Value value = values.get(field.getId());

                if (field.getType().containsFile()) {
                    List<FileDTO> files = this.getFiles(value);
                    results.add(FormUtils.toFieldContext(field, files, DEFAULT_DIMENSION_VALUE));
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
