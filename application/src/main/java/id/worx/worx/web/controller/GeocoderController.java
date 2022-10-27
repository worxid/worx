package id.worx.worx.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.service.geocoder.GeocoderService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("geocoder")
@RequiredArgsConstructor
public class GeocoderController implements SecuredRestController {

    private final GeocoderService geocoderService;

    @GetMapping("search")
    public ResponseEntity<?> search(@RequestParam String address) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(geocoderService.search(address));
    }

    public ResponseEntity<?> reverse() {
        return null;
    }

}
