package id.worx.worx.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.util.Assert;

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
     * @param format
     * @param timeZone
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

}
