package id.worx.worx.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.common.usermodel.HyperlinkType;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFHyperlink;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import id.worx.worx.common.model.dto.FormDTO;
import id.worx.worx.common.model.dto.FormTemplateDTO;
import id.worx.worx.common.model.export.FormExportEntry;
import id.worx.worx.common.model.export.FormExportObject;
import id.worx.worx.common.model.forms.field.CheckboxGroupField;
import id.worx.worx.common.model.forms.field.DropdownField;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.field.Option;
import id.worx.worx.common.model.forms.field.RadioGroupField;
import id.worx.worx.common.model.forms.field.RatingField;
import id.worx.worx.common.model.forms.value.CheckboxGroupValue;
import id.worx.worx.common.model.forms.value.DateValue;
import id.worx.worx.common.model.forms.value.DropdownValue;
import id.worx.worx.common.model.forms.value.FileValue;
import id.worx.worx.common.model.forms.value.PhotoValue;
import id.worx.worx.common.model.forms.value.RadioGroupValue;
import id.worx.worx.common.model.forms.value.RatingValue;
import id.worx.worx.common.model.forms.value.SignatureValue;
import id.worx.worx.common.model.forms.value.TextValue;
import id.worx.worx.common.model.forms.value.Value;
import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.entity.File;
import id.worx.worx.entity.Form;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.mapper.FormMapper;
import id.worx.worx.mapper.FormTemplateMapper;
import id.worx.worx.repository.FileRepository;
import id.worx.worx.repository.FormTemplateRepository;
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

    private final FileRepository fileRepository;
    private final FormTemplateRepository templateRepository;

    private final FileStorageService storageService;

    private final FormMapper formMapper;
    private final FormTemplateMapper templateMapper;

    @Override
    public ByteArrayOutputStream toCSV(Long id) {
        FormTemplate template = this.findByIdorElseThrowNotFound(id);
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
        FormTemplate template = this.findByIdorElseThrowNotFound(id);
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

    private boolean hasCellRange(int size, int maxRows) {
        return size == 1 && maxRows > 1;
    }

    private FormTemplate findByIdorElseThrowNotFound(Long id) {
        Optional<FormTemplate> optTemplate = templateRepository.findById(id);

        if (optTemplate.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return optTemplate.get();
    }

    private FormExportObject toFormExportObject(FormTemplate template) {
        FormTemplateDTO templateDTO = templateMapper.toDTO(template);
        Set<Form> forms = template.getForms();
        List<FormDTO> formDTOs = forms.stream()
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
        valueRow.add(new FormExportEntry(formDTO.getSource().getLabel()));
        valueRow.add(new FormExportEntry(formDTO.getSubmitDate()));
        valueRow.add(new FormExportEntry(formDTO.getSubmitLocation().getAddress()));

        Map<String, Value> values = formDTO.getValues();

        for (Field field : fields) {
            List<String> valueStrings = List.of(StringUtils.EMPTY);
            List<String> hyperlinks = List.of(StringUtils.EMPTY);

            if (!field.getType().isSeparator()) {
                if (values.containsKey(field.getId())) {
                    Value value = values.get(field.getId());
                    valueStrings = this.getValueAsString(field, value);

                    if (field.getType().containsFile()) {
                        hyperlinks = this.getHyperlinkAsString(value);
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

    private List<String> getValueAsString(Field field, Value value) {
        if (value instanceof TextValue) {
            TextValue temp = (TextValue) value;
            return List.of(temp.getValue());
        }

        if (value instanceof CheckboxGroupValue) {
            CheckboxGroupField tempField = (CheckboxGroupField) field;
            CheckboxGroupValue temp = (CheckboxGroupValue) value;
            List<String> labels = new ArrayList<>();
            List<Option> options = tempField.getGroup();
            List<Boolean> values = temp.getValues();

            for (int i = 0; i < options.size(); i++) {
                if (values.get(i).booleanValue()) {
                    Option option = options.get(i);
                    labels.add(option.getLabel());
                }
            }

            return labels;
        }

        if (value instanceof DropdownValue) {
            DropdownField tempField = (DropdownField) field;
            DropdownValue temp = (DropdownValue) value;
            List<Option> options = tempField.getOptions();
            Integer index = temp.getValueIndex();
            Option option = options.get(index);

            return List.of(option.getLabel());
        }

        if (value instanceof RadioGroupValue) {
            RadioGroupField tempField = (RadioGroupField) field;
            RadioGroupValue temp = (RadioGroupValue) value;
            List<Option> options = tempField.getOptions();
            Integer index = temp.getValueIndex();
            Option option = options.get(index);

            return List.of(option.getLabel());
        }

        if (value instanceof DateValue) {
            DateValue temp = (DateValue) value;
            return List.of(temp.getValue().toString());
        }

        if (value instanceof RatingValue) {
            RatingField tempField = (RatingField) field;
            RatingValue temp = (RatingValue) value;
            return List.of(FormUtils.generateRatingString(temp.getValue(), tempField.getMaxStars()));
        }

        if (value instanceof FileValue) {
            FileValue temp = (FileValue) value;
            List<Long> fileIds = temp.getFileIds();
            List<File> files = fileRepository.findAllById(fileIds);
            return files.stream()
                    .map(File::getName)
                    .collect(Collectors.toList());
        }

        if (value instanceof PhotoValue) {
            PhotoValue temp = (PhotoValue) value;
            List<Long> fileIds = temp.getFileIds();
            List<File> files = fileRepository.findAllById(fileIds);
            return files.stream()
                    .map(File::getName)
                    .collect(Collectors.toList());
        }

        if (value instanceof SignatureValue) {
            SignatureValue temp = (SignatureValue) value;
            Long fileId = temp.getFileId();
            List<File> files = fileRepository.findAllById(List.of(fileId));
            return files.stream()
                    .map(File::getName)
                    .collect(Collectors.toList());
        }

        return List.of(StringUtils.EMPTY);
    }

    private List<String> getHyperlinkAsString(Value value) {
        if (value instanceof FileValue) {
            FileValue temp = (FileValue) value;
            List<Long> fileIds = temp.getFileIds();
            List<UrlPresignedResponse> responses = storageService.getDownloadUrls(fileIds);
            return responses.stream()
                    .map(UrlPresignedResponse::getUrl)
                    .collect(Collectors.toList());
        }

        if (value instanceof PhotoValue) {
            PhotoValue temp = (PhotoValue) value;
            List<Long> fileIds = temp.getFileIds();
            List<UrlPresignedResponse> responses = storageService.getDownloadUrls(fileIds);
            return responses.stream()
                    .map(UrlPresignedResponse::getUrl)
                    .collect(Collectors.toList());
        }

        if (value instanceof SignatureValue) {
            SignatureValue temp = (SignatureValue) value;
            Long fileId = temp.getFileId();
            UrlPresignedResponse response = storageService.getDownloadUrl(fileId);
            return List.of(response.getUrl());
        }

        return List.of(StringUtils.EMPTY);
    }

}
