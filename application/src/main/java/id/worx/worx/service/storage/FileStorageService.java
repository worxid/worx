package id.worx.worx.service.storage;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import id.worx.worx.common.model.response.UrlPresignedResponse;

public interface FileStorageService {

    void store();

    UrlPresignedResponse getUploadUrl(String filename);

    UrlPresignedResponse getUploadUrl(Long fileId);

    UrlPresignedResponse getDownloadUrl(Long fileId);

    Boolean isObjectExist(String path);

    default String generateUniquePath(String filename, String foldername) {
        DateFormat writeFormat = new SimpleDateFormat("yyyy/MM/dd/HH/mm/ss");
        return String.format("%s/%s/%s", foldername.toLowerCase(), writeFormat.format(new Date()), filename);
    }

}
