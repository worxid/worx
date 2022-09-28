package id.worx.worx.service;

import id.worx.worx.data.dto.UrlPresignedDTO;

public interface FileUploadService {

    String store();

    UrlPresignedDTO generatePresignedUrlForUpload();

    UrlPresignedDTO generatePresignedUrlForDownload();

}
