package id.worx.worx.service.storage;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.entity.File;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.repository.FileRepository;
import id.worx.worx.service.storage.client.MinioClientService;
import id.worx.worx.util.MediaUtils;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.InsufficientDataException;
import io.minio.errors.InternalException;
import io.minio.errors.InvalidResponseException;
import io.minio.errors.ServerException;
import io.minio.errors.XmlParserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MinioService implements FileStorageService {

    private static final String MEDIA_PATH = "media";

    private final MinioClientService clientService;

    private final FileRepository fileRepository;

    @Override
    public void store() {
        // TODO Auto-generated method stub

    }

    @Override
    public UrlPresignedResponse getUploadUrl(String filename) {
        String path = this.generateUniquePath(filename, MEDIA_PATH);
        String url = "";
        try {
            url = clientService.getUploadPresignedObjectUrl(path);
        } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | XmlParserException | ServerException
                | IllegalArgumentException | IOException e) {
            log.trace("File Storage failed to generate upload url: {}", e.getMessage());
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
        }

        File newFile = File.builder()
                .path(path)
                .name(filename)
                .mimeType(MediaUtils.getMimeType(filename))
                .build();
        newFile = fileRepository.save(newFile);

        return UrlPresignedResponse.builder()
                .fileId(newFile.getId())
                .url(url)
                .path(path)
                .build();
    }

    @Override
    public UrlPresignedResponse getUploadUrl(Long fileId) {
        File file = this.findByIdorElseThrowNotFound(fileId);

        if (clientService.isObjectExist(file.getPath())) {
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_UPLOAD_ERROR);
        }

        String url = "";
        try {
            url = clientService.getUploadPresignedObjectUrl(file.getPath());
        } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | XmlParserException | ServerException
                | IllegalArgumentException | IOException e) {
            log.trace("File Storage failed to generate upload url: {}", e.getMessage());
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
        }
        return UrlPresignedResponse.builder()
                .fileId(file.getId())
                .url(url)
                .path(file.getPath())
                .build();
    }

    @Override
    public UrlPresignedResponse getDownloadUrl(Long fileId) {
        File file = this.findByIdorElseThrowNotFound(fileId);
        String url = "";
        try {
            url = clientService.getDownloadPresignedObjectUrl(file.getPath());
        } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | XmlParserException | ServerException
                | IllegalArgumentException | IOException e) {
            log.trace("File Storage failed to generate download url: {}", e.getMessage());
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
        }
        return UrlPresignedResponse.builder()
                .fileId(file.getId())
                .url(url)
                .path(file.getPath())
                .build();
    }

    @Override
    public Boolean isObjectExist(String path) {
        return clientService.isObjectExist(path);
    }

    private File findByIdorElseThrowNotFound(Long id) {
        Optional<File> template = fileRepository.findById(id);

        if (template.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return template.get();
    }

}
