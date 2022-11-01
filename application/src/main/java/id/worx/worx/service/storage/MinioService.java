package id.worx.worx.service.storage;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.entity.Group;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.web.model.request.FileRequestDTO;
import io.minio.http.Method;
import org.springframework.stereotype.Service;

import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.entity.File;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import id.worx.worx.repository.FileRepository;
import id.worx.worx.service.storage.client.MinioClientService;
import id.worx.worx.util.MediaUtils;
import io.minio.StatObjectResponse;
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
    public boolean isObjectExist(String path) {
        return clientService.isObjectExist(path);
    }

    @Override
    public long getObjectSize(String path) {
        StatObjectResponse response = clientService.getStatObjectResponse(path);
        return response.size();
    }

    @Override
    public List<UrlPresignedResponse> getFiles(FileRequestDTO fileRequestDTO)  throws IOException, InvalidResponseException, InvalidKeyException, NoSuchAlgorithmException, ServerException, ErrorResponseException, XmlParserException, InsufficientDataException, InternalException {

        List<UrlPresignedResponse> responses = new ArrayList<>();

        for (Long ids:fileRequestDTO.getFileIds()){

            Optional<File> file = fileRepository.findById(ids);
            if(file.isPresent()){

                File files = file.get();


                boolean objectExist = clientService.isObjectExist(files.getPath());

                if(objectExist){

                    UrlPresignedResponse url = new UrlPresignedResponse();
                    url.setFileId(ids);
                    url.setPath(files.getPath());
                    url.setUrl(clientService.getDownloadPresignedObjectUrl(files.getPath()));

                    responses.add(url);

                }

            }
        }

        return responses;
    }

    private File findByIdorElseThrowNotFound(Long id) {
        Optional<File> file = fileRepository.findById(id);

        if (file.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return file.get();
    }

}
