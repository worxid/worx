package id.worx.worx.service.report;

import java.io.ByteArrayOutputStream;

public interface ReportService {

    ByteArrayOutputStream getSubmissionReport(Long formId);

}
