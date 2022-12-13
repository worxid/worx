package id.worx.worx.service.storage;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import id.worx.worx.common.model.dto.FileDTO;
import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.web.model.request.FileRequestDTO;
import io.minio.errors.*;

public interface FileStorageService {

    void store();

    FileDTO get(Long id);

    FileDTO get(String mediaId);

    List<FileDTO> getAll(List<Long> ids);

    UrlPresignedResponse toDtoFilename(UrlPresignedResponse urlPresignedResponse);

    UrlPresignedResponse getUploadUrl(String filename);

    UrlPresignedResponse getUploadUrl(Long fileId);

    UrlPresignedResponse getDownloadUrl(String fileId);

    UrlPresignedResponse getDownloadUrl(Long fileId);

    List<UrlPresignedResponse> getDownloadUrls(List<Long> fileIds);

    boolean isObjectExist(String path);

    long getObjectSize(String path);

    default String generateUniquePath(String filename, String foldername) {
        DateFormat writeFormat = new SimpleDateFormat("yyyy/MM/dd/HH/mm/ss");
        return String.format("%s/%s/%s", foldername.toLowerCase(), writeFormat.format(new Date()), filename);
    }

    List<UrlPresignedResponse> getFiles(FileRequestDTO fileRequestDTO)
            throws IOException, InvalidResponseException, InvalidKeyException, NoSuchAlgorithmException,
            ServerException, ErrorResponseException, XmlParserException, InsufficientDataException, InternalException;
}
