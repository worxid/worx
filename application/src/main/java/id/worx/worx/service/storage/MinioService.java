package id.worx.worx.service.storage;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.service.storage.client.MinioClientService;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.InsufficientDataException;
import io.minio.errors.InternalException;
import io.minio.errors.InvalidResponseException;
import io.minio.errors.ServerException;
import io.minio.errors.XmlParserException;
import io.minio.messages.Bucket;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MinioService implements FileStorageService {

    private final MinioClientService clientService;

    @Override
    public void store() {
        // TODO Auto-generated method stub

    }

    @Override
    public String getUploadUrl(String filename) {
        // TODO Generate path
        String path = filename;
        String url = "";
        try {
            url = clientService.getUploadPresignedObjectUrl(path);
        } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | XmlParserException | ServerException
                | IllegalArgumentException | IOException e) {
            e.printStackTrace();
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
        }
        return url;
    }

    @Override
    public String getDownloadUrl() {
        // TODO Auto-generated method stub
        return null;
    }

}
