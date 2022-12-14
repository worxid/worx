package id.worx.worx.service.storage.client;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import id.worx.worx.common.exception.ObjectStorageErrorDetail;
import id.worx.worx.config.properties.WorxProperties;
import id.worx.worx.exception.WorxErrorCode;
import id.worx.worx.exception.WorxException;
import io.minio.GetObjectArgs;
import io.minio.GetObjectResponse;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.StatObjectArgs;
import io.minio.StatObjectResponse;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.InsufficientDataException;
import io.minio.errors.InternalException;
import io.minio.errors.InvalidResponseException;
import io.minio.errors.ServerException;
import io.minio.errors.XmlParserException;
import io.minio.http.Method;
import io.minio.messages.Bucket;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MinioClientService {

    private static final int PRESIGNED_URL_EXPIRY_DAYS = 1;
    private static final String NO_SUCH_KEY_STRING_VALUE = "NoSuchKey";
    private static final String MINIO_ERROR_MESSAGE_STRING = "Error while dowloading file from MinIO";

    private final WorxProperties props;

    private final MinioClient client;

    public List<Bucket> listAllBuckets()
            throws InvalidKeyException, ErrorResponseException, InsufficientDataException, InternalException,
            InvalidResponseException, NoSuchAlgorithmException, ServerException, XmlParserException, IOException {
        return client.listBuckets();
    }

    public String getPresignedObjectUrl(Method method, String objectName)
            throws InvalidKeyException, ErrorResponseException, InsufficientDataException,
            InternalException, InvalidResponseException, NoSuchAlgorithmException, XmlParserException, ServerException,
            IllegalArgumentException, IOException {
        String url = client.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(method)
                        .bucket(props.getStorage().getBucketName())
                        .object(objectName)
                        .expiry(PRESIGNED_URL_EXPIRY_DAYS, TimeUnit.DAYS)
                        .build());
        log.trace("Get PresignedObjectUrl");
        return url;
    }

    public String getUploadPresignedObjectUrl(String path) throws InvalidKeyException, ErrorResponseException,
            InsufficientDataException, InternalException, InvalidResponseException, NoSuchAlgorithmException,
            XmlParserException, ServerException, IllegalArgumentException, IOException {
        return this.getPresignedObjectUrl(Method.PUT, path);
    }

    public String getDownloadPresignedObjectUrl(String path) throws InvalidKeyException, ErrorResponseException,
            InsufficientDataException, InternalException, InvalidResponseException, NoSuchAlgorithmException,
            XmlParserException, ServerException, IllegalArgumentException, IOException {
        return this.getPresignedObjectUrl(Method.GET, path);
    }

    public boolean isObjectExist(String path) {
        try {
            client.statObject(StatObjectArgs.builder()
                    .bucket(props.getStorage().getBucketName())
                    .object(path)
                    .build());
            return true;
        } catch (ErrorResponseException e) {
            return !e.errorResponse().code().equals(NO_SUCH_KEY_STRING_VALUE);
        } catch (InvalidKeyException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | ServerException | XmlParserException
                | IllegalArgumentException | IOException e) {
            log.error(MINIO_ERROR_MESSAGE_STRING, e);
            return false;
        }
    }

    public StatObjectResponse getStatObjectResponse(String path) {
        try {
            return client.statObject(StatObjectArgs.builder()
                    .bucket(props.getStorage().getBucketName())
                    .object(path)
                    .build());
        } catch (ErrorResponseException e) {

            if (e.errorResponse().code().equals(NO_SUCH_KEY_STRING_VALUE)) {
                throw new WorxException(
                        WorxErrorCode.OBJECT_STORAGE_ERROR, List.of(new ObjectStorageErrorDetail()));
            }
            log.error(MINIO_ERROR_MESSAGE_STRING, e);
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);

        } catch (InvalidKeyException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | ServerException | XmlParserException
                | IllegalArgumentException | IOException e) {

            log.error(MINIO_ERROR_MESSAGE_STRING, e);
            throw new WorxException(WorxErrorCode.OBJECT_STORAGE_ERROR);

        }
    }

    public byte[] getObject(String path) {
        if (!isObjectExist(path)) {
            return new byte[0];
        }

        try {
            GetObjectResponse response = client.getObject(GetObjectArgs.builder()
                    .bucket(props.getStorage().getBucketName())
                    .object(path)
                    .build());
            return IOUtils.toByteArray(response);
        } catch (InvalidKeyException | ErrorResponseException | InsufficientDataException | InternalException
                | InvalidResponseException | NoSuchAlgorithmException | ServerException | XmlParserException
                | IllegalArgumentException | IOException e) {
            return new byte[0];
        }
    }

}
