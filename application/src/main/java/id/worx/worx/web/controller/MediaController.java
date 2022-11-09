package id.worx.worx.web.controller;

import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.web.model.request.FileRequestDTO;
import io.minio.errors.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.service.storage.FileStorageService;
import lombok.RequiredArgsConstructor;

import javax.validation.Valid;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("media")
@RequiredArgsConstructor
public class MediaController {

    private final FileStorageService storageService;

    @GetMapping("presigned-url")
    public ResponseEntity<UrlPresignedResponse> getPresignedUrlForUpload(@RequestParam String filename) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(storageService.getUploadUrl(filename));
    }

    @PostMapping("files")
    public ResponseEntity<BaseListResponse<UrlPresignedResponse>> getFiles(@RequestBody @Valid FileRequestDTO fileRequestDTO) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {

        List<UrlPresignedResponse> urlPresignedResponses = storageService.getFiles(fileRequestDTO);

        return ResponseEntity.status(HttpStatus.OK).body(BaseListResponse.<UrlPresignedResponse>builder()
            .list(urlPresignedResponses)
            .build());
    }
}
