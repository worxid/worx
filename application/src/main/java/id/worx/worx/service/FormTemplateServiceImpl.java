package id.worx.worx.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import id.worx.worx.data.request.FormTemplateCreationDTO;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.forms.service.field.CheckboxGroupField;
import id.worx.worx.forms.service.field.DateField;
import id.worx.worx.forms.service.field.DropdownField;
import id.worx.worx.forms.service.field.Field;
import id.worx.worx.forms.service.field.FieldType;
import id.worx.worx.forms.service.field.FileField;
import id.worx.worx.forms.service.field.Option;
import id.worx.worx.forms.service.field.PhotoField;
import id.worx.worx.forms.service.field.RadioGroupField;
import id.worx.worx.forms.service.field.RatingField;
import id.worx.worx.forms.service.field.SeparatorField;
import id.worx.worx.forms.service.field.SignatureField;
import id.worx.worx.forms.service.field.TextField;
import id.worx.worx.forms.service.value.CheckboxGroupValue;
import id.worx.worx.forms.service.value.DateValue;
import id.worx.worx.forms.service.value.DropdownValue;
import id.worx.worx.forms.service.value.FileValue;
import id.worx.worx.forms.service.value.PhotoValue;
import id.worx.worx.forms.service.value.RadioGroupValue;
import id.worx.worx.forms.service.value.RatingValue;
import id.worx.worx.forms.service.value.SeparatorValue;
import id.worx.worx.forms.service.value.SignatureValue;
import id.worx.worx.forms.service.value.TextValue;
import id.worx.worx.forms.service.value.Value;

@Service
public class FormTemplateServiceImpl implements FormTemplateService {

    @Override
    public List<Field> getSampleFieldList() {
        TextField field1 = TextField.builder()
                .id("7231942686725")
                .type(FieldType.TEXT)
                .label("Text field 1")
                .description("Deskripsi Text field 1")
                .required(true)
                .minLength(1)
                .maxLength(1000)
                .build();

        SeparatorField field2 = SeparatorField.builder()
                .id("2089797021326")
                .type(FieldType.SEPARATOR)
                .icon("content_cut")
                .label("Separator")
                .required(false)
                .build();

        List<Option> options = List.of(new Option("Option #1"), new Option("Option #2"));
        RadioGroupField field3 = RadioGroupField.builder()
                .id("7232054114493")
                .type(FieldType.RADIO_GROUP)
                .label("Radiobuttons")
                .description(null)
                .required(false)
                .options(options)
                .build();

        CheckboxGroupField field4 = CheckboxGroupField.builder()
                .id("7232000386362")
                .type(FieldType.CHECKBOX_GROUP)
                .label("Checkboxes 1")
                .description("Deskripsi Checkbox")
                .required(true)
                .minChecked(1)
                .maxChecked(2)
                .group(options)
                .build();

        DropdownField field5 = DropdownField.builder()
                .id("7232062265913")
                .type(FieldType.DROPDOWN)
                .label("Dropdown")
                .description("Deskripsi Dropdown")
                .required(false)
                .options(options)
                .build();

        DateField field6 = DateField.builder()
                .id("7232087887174")
                .type(FieldType.DATE)
                .label("Tanggal")
                .description("")
                .required(false)
                .disableFuture(false)
                .disablePast(true)
                .build();

        SeparatorField field7 = SeparatorField.builder()
                .id("7232133740980")
                .type(FieldType.SEPARATOR)
                .label("Separator")
                .description("Subpage deskripsi")
                .build();

        RatingField field8 = RatingField.builder()
                .id("7232145092199")
                .type(FieldType.RATING)
                .label("Rating")
                .required(false)
                .maxStars(10)
                .build();

        FileField field9 = FileField.builder()
                .id("7232173843748")
                .type(FieldType.FILE)
                .label("File")
                .description("Upload File")
                .required(false)
                .maxFiles(4)
                .maxFileSize(11534336)
                .minFileSize(120)
                .allowedExtensions(List.of("csv", "pdf"))
                .build();

        PhotoField field10 = PhotoField.builder()
                .id("7232249454552")
                .type(FieldType.PHOTO)
                .label("Image")
                .required(false)
                .maxFiles(3)
                .allowGalleryUpload(true)
                .build();

        SignatureField field11 = SignatureField.builder()
                .id("7232267516193")
                .type(FieldType.SIGNATURE)
                .label("Signature")
                .description("Signature")
                .required(true)
                .build();

        return List.of(
                field1,
                field2,
                field3,
                field4,
                field5,
                field6,
                field7,
                field8,
                field9,
                field10,
                field11);
    }

    @Override
    public Map<String, Value> getSampleValueMap() {
        TextValue value1 = new TextValue();
        value1.setValue("GMC");

        SeparatorValue value2 = new SeparatorValue();

        RadioGroupValue value3 = new RadioGroupValue();
        value3.setValueIndex(0);

        CheckboxGroupValue value4 = new CheckboxGroupValue();
        value4.setValues(List.of(true, true));

        DropdownValue value5 = new DropdownValue();
        value5.setValueIndex(0);

        DateValue value6 = new DateValue();
        value6.setValue(LocalDate.now());

        SeparatorValue value7 = new SeparatorValue();

        RatingValue value8 = new RatingValue();
        value8.setValue(10);

        FileValue value9 = new FileValue();
        value9.setFileIds(List.of(1L, 2L));

        PhotoValue value10 = new PhotoValue();
        value10.setFileIds(List.of(3L));

        SignatureValue value11 = new SignatureValue();
        value11.setFileId(4L);

        return Map.ofEntries(
                Map.entry("7231942686725", value1),
                Map.entry("2089797021326", value2),
                Map.entry("7232054114493", value3),
                Map.entry("7232000386362", value4),
                Map.entry("7232062265913", value5),
                Map.entry("7232087887174", value6),
                Map.entry("7232133740980", value7),
                Map.entry("7232145092199", value8),
                Map.entry("7232173843748", value9),
                Map.entry("7232249454552", value10),
                Map.entry("7232267516193", value11));
    }

    @Override
    public FormTemplate create(FormTemplateCreationDTO formTemplateDTO) {
        // TODO Auto-generated method stub
        return null;
    }

}
