package id.worx.worx.util;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

public class UrlUtils {

    private static final char[] DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .toCharArray();

    private static final int MEDIA_ID_SIZE = 16;

    private UrlUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static String generateUrlCode() {
        return NanoIdUtils.randomNanoId(
                NanoIdUtils.DEFAULT_NUMBER_GENERATOR,
                DEFAULT_ALPHABET,
                NanoIdUtils.DEFAULT_SIZE);
    }

    public static String generateMediaId() {
        return NanoIdUtils.randomNanoId(
                NanoIdUtils.DEFAULT_NUMBER_GENERATOR,
                DEFAULT_ALPHABET,
                MEDIA_ID_SIZE);
    }

}
