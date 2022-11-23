package id.worx.worx.web.controller;

import id.worx.worx.common.model.request.DashboardRequest;
import id.worx.worx.common.model.response.BaseListResponse;
import id.worx.worx.data.dto.DashboardStatDTO;
import id.worx.worx.service.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("dashboard-stats")
@RequiredArgsConstructor
public class DashboardController implements SecuredRestController {

    private final DashboardService dashboardService;
    @PostMapping
    public ResponseEntity<BaseListResponse<DashboardStatDTO>> list(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
                                                                   @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
                                                                   @Valid @RequestBody DashboardRequest dashboardRequest) {
        List<DashboardStatDTO> dashboardStatLists = dashboardService.getDashboardStat(from, to, dashboardRequest);

        return ResponseEntity.status(HttpStatus.OK).body(BaseListResponse.<DashboardStatDTO>builder()
            .list(dashboardStatLists)
            .build());
    }
}
