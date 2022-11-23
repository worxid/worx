package id.worx.worx.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.Form;

@Repository
public interface FormRepository extends JpaRepository<Form, Long>, JpaSpecificationExecutor<Form> {

    List<Form> findAllByRespondentDeviceCode(String respondentDeviceCode);

    @Query(value = "SELECT count(f) from Form f WHERE f.submitDate BETWEEN :startDate and :endDate " +
        " and f.respondentDeviceCode = :respondentDeviceCode and f.template.id = :templateId ")
    Integer getCountByRespondentDeviceAndTemplateId(Instant startDate,Instant endDate, String respondentDeviceCode, Long templateId);

    @Query(value = "SELECT count(f) from Form f WHERE f.submitDate BETWEEN :startDate and :endDate " +
        " and f.respondentDeviceCode = :respondentDeviceCode ")
    Integer getCountByRespondentDevice(Instant startDate,Instant endDate, String respondentDeviceCode);

    @Query(value = "SELECT count(f) from Form f WHERE f.submitDate BETWEEN :startDate and :endDate " +
        " and f.template.id = :templateId ")
    Integer getCountByTemplateId(Instant startDate,Instant endDate, Long templateId);

    @Query(value = "SELECT count(f) from Form f WHERE f.submitDate BETWEEN :startDate and :endDate ")
    Integer getCountByDateOnly(Instant startDate,Instant endDate);

}
