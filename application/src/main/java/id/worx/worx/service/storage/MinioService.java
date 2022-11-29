package id.worx.worx.service.storage;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import id.worx.worx.mapper.FileMapper;
import id.worx.worx.util.UrlUtils;
import id.worx.worx.web.model.request.FileRequestDTO;
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

    private static final String FAILED_GENERATE_UPLOAD_URL = "File Storage failed to generate upload url : {}";
    private static final String FAILED_GENERATE_DOWNLOAD_URL = "File Storage failed to generate download url: {}";

    private final MinioClientService clientService;

    private final FileRepository fileRepository;

    private final FileMapper fileMapper;

    @Override
    public void store() {
        // TODO Auto-generated method stub

    }

    @Override
    public UrlPresignedResponse toDtoFilename(UrlPresignedResponse urlPresignedResponse) {
        Optional<File> file = fileRepository.findById(urlPresignedResponse.getId());
        if (file.isPresent()) {
            UrlPresignedResponse resp = fileMapper.toResponse(file.get());
            resp.setUrl(urlPresignedResponse.getUrl());
            resp.setFileId(urlPresignedResponse.getFileId());

            return resp;
        }

        return null;

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
            log.trace(FAILED_GENERATE_UPLOAD_URL, e.getMessage());
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
        }
        String mediaId = UrlUtils.generateMediaId();
        String extension = MediaUtils.getExtension(filename);
        File newFile = File.builder()
                .path(path)
                .mediaId(mediaId)
                .name(String.format("%s.%s", mediaId, extension))
                .originalName(filename)
                .mimeType(MediaUtils.getMimeType(filename))
                .build();

        newFile = fileRepository.save(newFile);

        return UrlPresignedResponse.builder()
                .id(newFile.getId())
                .mediaId(mediaId)
                .name(String.format("%s.%s", mediaId, extension))
                .url(url)
                .path(path)
                .mimeType(MediaUtils.getMimeType(filename))
                .size(newFile.getSize())
                .fileId(newFile.getId())
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
            log.trace(FAILED_GENERATE_UPLOAD_URL, e.getMessage());
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
        }
        return UrlPresignedResponse.builder()
                .id(file.getId())
                .mediaId(file.getMediaId())
                .name(file.getName())
                .url(url)
                .path(file.getPath())
                .mimeType(file.getMimeType())
                .size(file.getSize())
                .fileId(file.getId())
                .build();
    }

    @Override
    public UrlPresignedResponse getDownloadUrl(String mediaId) {
        File file = this.findByMediaIdorElseThrowNotFound(mediaId);
        String url = "";
        try {
            url = clientService.getDownloadPresignedObjectUrl(file.getPath());
        } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | XmlParserException | ServerException
                | IllegalArgumentException | IOException e) {
            log.trace(FAILED_GENERATE_DOWNLOAD_URL, e.getMessage());
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
        }
        return UrlPresignedResponse.builder()
                .id(file.getId())
                .mediaId(file.getMediaId())
                .fileId(file.getId())
                .name(file.getName())
                .url(url)
                .path(file.getPath())
                .mimeType(file.getMimeType())
                .size(file.getSize())
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
            log.trace(FAILED_GENERATE_DOWNLOAD_URL, e.getMessage());
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
        }
        return UrlPresignedResponse.builder()
                .id(file.getId())
                .mediaId(file.getMediaId())
                .fileId(file.getId())
                .name(file.getName())
                .url(url)
                .path(file.getPath())
                .mimeType(file.getMimeType())
                .size(file.getSize())
                .build();
    }

    @Override
    public List<UrlPresignedResponse> getDownloadUrls(List<Long> fileIds) {
        List<File> files = fileRepository.findAllById(fileIds);
        List<UrlPresignedResponse> responses = new ArrayList<>();

        for (File file : files) {
            String url = "";
            try {
                url = clientService.getDownloadPresignedObjectUrl(file.getPath());
            } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
                    | InvalidResponseException | NoSuchAlgorithmException | XmlParserException | ServerException
                    | IllegalArgumentException | IOException e) {
                log.trace(FAILED_GENERATE_DOWNLOAD_URL, e.getMessage());
                throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);
            }

            UrlPresignedResponse response = UrlPresignedResponse.builder()
                    .fileId(file.getId())
                    .url(url)
                    .path(file.getPath())
                    .build();
            responses.add(response);
        }

        return responses;
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
    public List<UrlPresignedResponse> getFiles(FileRequestDTO fileRequestDTO)
            throws IOException, InvalidResponseException, InvalidKeyException, NoSuchAlgorithmException,
            ServerException, ErrorResponseException, XmlParserException, InsufficientDataException, InternalException {

        List<UrlPresignedResponse> responses = new ArrayList<>();

        for (String ids : fileRequestDTO.getMediaIds()) {

            Optional<File> file = fileRepository.findByMediaId(ids);
            if (file.isPresent()) {

                File files = file.get();

                boolean objectExist = clientService.isObjectExist(files.getPath());
                if (objectExist) {

                    UrlPresignedResponse url = new UrlPresignedResponse();
                    url.setId(files.getId());
                    url.setMediaId(files.getMediaId());
                    url.setName(files.getName());
                    url.setUrl(clientService.getDownloadPresignedObjectUrl(files.getPath()));
                    url.setPath(files.getPath());
                    url.setMimeType(files.getMimeType());
                    url.setSize(files.getSize());
                    url.setFileId(files.getId());

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

    private File findByMediaIdorElseThrowNotFound(String mediaId) {
        Optional<File> file = fileRepository.findByMediaId(mediaId);

        if (file.isEmpty()) {
            throw new WorxException(WorxErrorCode.ENTITY_NOT_FOUND_ERROR);
        }

        return file.get();
    }
}
