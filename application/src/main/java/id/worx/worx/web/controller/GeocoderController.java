package id.worx.worx.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.common.model.dto.geocoder.LocationDTO;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.service.geocoder.GeocoderService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("geocoder")
@RequiredArgsConstructor
public class GeocoderController implements SecuredRestController {

    private final GeocoderService geocoderService;

    @GetMapping("search")
    public ResponseEntity<BaseListResponse<LocationDTO>> search(
            @RequestParam String address,
            @RequestParam(required = false, defaultValue = "false") boolean withDetails) {

        List<LocationDTO> locations = geocoderService.search(address, withDetails);
        BaseListResponse<LocationDTO> response = BaseListResponse.<LocationDTO>builder()
                .list(locations)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("reverse")
    public ResponseEntity<BaseListResponse<LocationDTO>> reverse(
            @RequestParam("lat") Double lat,
            @RequestParam("lng") Double lng,
            @RequestParam(required = false, defaultValue = "false") boolean withDetails) {

        List<LocationDTO> locations = geocoderService.reverse(lat, lng, withDetails);
        BaseListResponse<LocationDTO> response = BaseListResponse.<LocationDTO>builder()
                .list(locations)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

}
