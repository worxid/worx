package id.worx.worx.util;

import java.net.URLConnection;

import org.apache.commons.io.FilenameUtils;

import com.google.common.net.MediaType;

public class MediaUtils {

    private MediaUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static String getMimeType(String filename) {
        return URLConnection.guessContentTypeFromName(filename);
    }

    public static String getExtension(String filename) {
        return FilenameUtils.getExtension(filename);
    }

    public static boolean isImageType(String mimeType) {
        return MediaType.parse(mimeType).is(MediaType.ANY_IMAGE_TYPE);
    }

}
