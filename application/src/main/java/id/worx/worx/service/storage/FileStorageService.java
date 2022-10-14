package id.worx.worx.service.storage;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public interface FileStorageService {

    public void store();

    public String getUploadUrl(String filename);

    public String getDownloadUrl();

    default String generateUniquePath(String filename, String foldername) {
        DateFormat writeFormat = new SimpleDateFormat("yyyy/MM/dd/HH/mm/ss");
        return String.format("%s/%s/%s", foldername.toLowerCase(), writeFormat.format(new Date()), filename);
    }

}
