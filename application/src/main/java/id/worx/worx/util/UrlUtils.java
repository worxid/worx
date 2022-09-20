package id.worx.worx.util;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

public class UrlUtils {

    private static final char[] DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .toCharArray();

    private UrlUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static String generateUrlCode() {
        return NanoIdUtils.randomNanoId(
                NanoIdUtils.DEFAULT_NUMBER_GENERATOR,
                DEFAULT_ALPHABET,
                NanoIdUtils.DEFAULT_SIZE);
    }

}
