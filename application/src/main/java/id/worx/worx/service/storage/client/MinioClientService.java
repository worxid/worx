package id.worx.worx.service.storage.client;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import id.worx.worx.config.properties.WorxProperties;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
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

}
