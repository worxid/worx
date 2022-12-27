package id.worx.worx.service.report;


import java.io.ByteArrayOutputStream;

public interface FormExportService {

    ByteArrayOutputStream toCSV(Long id);

    ByteArrayOutputStream toXLS(Long id);

    ByteArrayOutputStream saveFormAsDOCX(Long formId);
    ByteArrayOutputStream saveFormAsPDF(Long formId);

}
