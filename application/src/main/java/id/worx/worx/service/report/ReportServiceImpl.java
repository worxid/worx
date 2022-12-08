package id.worx.worx.service.report;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import fr.opensagres.xdocreport.core.XDocReportException;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReportServiceImpl implements ReportService {

    @Override
    public ByteArrayOutputStream getSubmissionReport(Long formId) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        try (InputStream in = new ClassPathResource("templates/report-submission.docx").getInputStream()) {
            IXDocReport report = XDocReportRegistry.getRegistry().loadReport(in, TemplateEngineKind.Freemarker);

            IContext context = report.createContext();
            Project project = new Project("XDocReport");
            context.put("project", project);

            report.process(context, output);
        } catch (IOException e) {
            log.error("Error during render PDF report", e);
        } catch (XDocReportException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return output;
    }

}
