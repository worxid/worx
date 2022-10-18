package id.worx.worx.mobile.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.service.storage.FileStorageService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("mobile/media")
@RequiredArgsConstructor
public class MobileMediaController {

    private final FileStorageService storageService;

    @GetMapping("presigned-url")
    public ResponseEntity<UrlPresignedResponse> getPresignedUrlForUpload(
            @RequestHeader(value = "device-code") String deviceCode,
            @RequestParam String filename) {
                return ResponseEntity.status(HttpStatus.OK)
                .body(storageService.getUploadUrl(filename));
    }

    @GetMapping("presigned-url")
    public ResponseEntity<UrlPresignedResponse> getPresignedUrlForUpload(
            @RequestHeader(value = "device-code") String deviceCode,
            @RequestParam Long fileId) {
                return ResponseEntity.status(HttpStatus.OK)
                .body(storageService.getUploadUrl(fileId));
    }

    @GetMapping("download-presigned-url")
    public ResponseEntity<UrlPresignedResponse> getPresignedUrlForDownload(
            @RequestHeader(value = "device-code") String deviceCode,
            @RequestParam Long fileId) {
                return ResponseEntity.status(HttpStatus.OK)
                .body(storageService.getDownloadUrl(fileId));
    }

}
