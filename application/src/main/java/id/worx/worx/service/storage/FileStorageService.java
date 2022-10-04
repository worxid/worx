package id.worx.worx.service.storage;

import java.util.List;

public interface FileStorageService {

    public void store();

    public String getUploadUrl(String filename);

    public String getDownloadUrl();

}
