package id.worx.worx.util;

import java.net.URLConnection;

public class MediaUtils {

    private MediaUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static String getMimeType(String filename) {
        return URLConnection.guessContentTypeFromName(filename);
    }

}
