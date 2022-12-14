package id.worx.worx.service;

import java.io.ByteArrayOutputStream;

public interface FormExportService {

    ByteArrayOutputStream toCSV(Long id);

    ByteArrayOutputStream toXLS(Long id);

    ByteArrayOutputStream saveFormAsPDF(Long formId);

}
