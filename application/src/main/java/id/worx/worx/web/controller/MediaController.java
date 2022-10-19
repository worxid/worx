package id.worx.worx.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.service.storage.FileStorageService;
import lombok.RequiredArgsConstructor;

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

}
