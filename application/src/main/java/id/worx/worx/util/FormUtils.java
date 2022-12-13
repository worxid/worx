package id.worx.worx.util;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.Assert;

import fr.opensagres.xdocreport.document.images.ByteArrayImageProvider;
import fr.opensagres.xdocreport.document.images.IImageProvider;
import id.worx.worx.common.model.dto.FileDTO;
import id.worx.worx.common.model.forms.field.CheckboxGroupField;
import id.worx.worx.common.model.forms.field.DropdownField;
import id.worx.worx.common.model.forms.field.Field;
import id.worx.worx.common.model.forms.field.Option;
import id.worx.worx.common.model.forms.field.RadioGroupField;
import id.worx.worx.common.model.forms.field.RatingField;
import id.worx.worx.common.model.forms.value.CheckboxGroupValue;
import id.worx.worx.common.model.forms.value.DateValue;
import id.worx.worx.common.model.forms.value.DropdownValue;
import id.worx.worx.common.model.forms.value.RadioGroupValue;
import id.worx.worx.common.model.forms.value.RatingValue;
import id.worx.worx.common.model.forms.value.TextValue;
import id.worx.worx.common.model.forms.value.Value;
import id.worx.worx.service.report.FieldContext;
import id.worx.worx.service.report.ValueContext;

public class FormUtils {

    private static final String FILL_STAR_VALUE = "★";
    private static final String EMPTY_STAR_VALUE = "☆";

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd-MMM-yyyy hh:mm:ss a z");

    private FormUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static String generateRatingString(int rating, int maxStars) {
        Assert.isTrue(rating <= maxStars, "rating must be less than or equal to maxStars");
        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < rating; i++) {
            builder.append(FILL_STAR_VALUE);
        }

        for (int i = 0; i < maxStars - rating; i++) {
            builder.append(EMPTY_STAR_VALUE);
        }

        return builder.toString();
    }

    public static String capitalize(String s) {
        return Arrays.stream(s.split(" "))
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    public static String formatLabel(String label) {
        String output = label.replace("_", " ");
        return capitalize(output);
    }

    /**
     * Utility function to convert java Date to TimeZone format
     *
     * @param date
     * @return
     */
    public static String formatDateToString(String date) {
        if (Objects.isNull(date)) {
            return null;
        }

        LocalDateTime localDateTime = LocalDateTime.parse(date, DateTimeFormatter.ISO_DATE_TIME);
        ZoneId zoneId = ZoneId.of("UTC");
        ZonedDateTime zonedDateTime = localDateTime.atZone(zoneId);
        return zonedDateTime.format(DATE_FORMATTER);
    }

    /**
     * Convert Worx {@code Field} and {@code Value} to {@code FieldContext}.
     *
     * @param field
     * @param value
     * @return
     */
    public static FieldContext toFieldContext(Field field, Value value) {
        Assert.isTrue(!field.getType().containsFile(), "only accept non file field");

        FieldContext context = FieldContext.builder()
                .label(field.getLabel())
                .description(field.getDescription())
                .build();

        List<String> values = FormUtils.getValueAsString(field, value);
        List<ValueContext> valueContexts = values.stream()
                .map(v -> ValueContext.builder()
                        .label(v)
                        .build())
                .collect(Collectors.toList());
        context.setValues(valueContexts);

        return context;
    }

    /**
     * Convert Worx {@code Field} and {@code Value} to {@code FieldContext}.
     *
     * @param field
     * @param files
     * @return
     */
    public static FieldContext toFieldContext(Field field, List<FileDTO> files) {
        Assert.isTrue(field.getType().containsFile(), "only accept file related field");

        FieldContext context = FieldContext.builder()
                .label(field.getLabel())
                .description(field.getDescription())
                .build();

        List<ValueContext> valueContexts = new ArrayList<>();

        for (FileDTO file : files) {
            ValueContext valueContext = ValueContext.builder()
                    .label(file.getName())
                    .hyperlink(file.getUrl())
                    .build();

            if (MediaUtils.isImageType(file.getMimeType())) {
                boolean useImageSize = true;
                IImageProvider image = null;

                try {
                    image = new ByteArrayImageProvider(file.getContent(), useImageSize);
                } catch (IOException e) {
                    // Image failed to load to image provider
                    // Load null image instead
                }

                valueContext.setImage(image);
            }

            valueContexts.add(valueContext);
        }

        context.setValues(valueContexts);

        return context;
    }

    private static List<String> getValueAsString(Field field, Value value) {
        Assert.isTrue(!field.getType().containsFile(), "only accept non file field");

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

        return List.of(StringUtils.EMPTY);
    }

}
