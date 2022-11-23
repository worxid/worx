package id.worx.worx.service.dashboard;

import id.worx.worx.common.model.request.DashboardRequest;
import id.worx.worx.data.dto.DashboardStatDTO;

import java.time.LocalDate;
import java.util.List;

public interface DashboardService {

    List<DashboardStatDTO> getDashboardStat(LocalDate from, LocalDate to, DashboardRequest dashboardStatList);
}
