package id.worx.worx.repository;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import id.worx.worx.data.dto.DashboardStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.Form;

@Repository
public interface FormRepository extends JpaRepository<Form, Long>, JpaSpecificationExecutor<Form> {

    List<Form> findAllByRespondentDeviceCode(String respondentDeviceCode);

    @Query(value = "WITH recursive Date_Ranges AS ( " +
        "    select :from as dates union all " +
        " select dates + interval 1 day " +
        "   from Date_Ranges " +
        "   where dates < :to) " +
        "select dates, " +
        "(select count(*) from forms f " +
        " where f.submit_date like CONCAT('%',dates,'%') " +
        " and (:deviceCode is null OR(lower(f.respondent_device_code)like concat('%',lower(:deviceCode),'%'))) " +
        " and (:templateId is null OR(lower(f.template_id)like concat('%',lower(:templateId),'%'))) " +
        " ) as total_count " +
        "from Date_Ranges  ", nativeQuery = true)
    List<DashboardStat> getDasboardStat(LocalDate from, LocalDate to, String deviceCode, Long templateId);

}
