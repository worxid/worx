package id.worx.worx.util;

import org.springframework.util.Assert;

public class FormUtils {

    private static final String FILL_STAR_VALUE = "★";
    private static final String EMPTY_STAR_VALUE = "☆";

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
}
