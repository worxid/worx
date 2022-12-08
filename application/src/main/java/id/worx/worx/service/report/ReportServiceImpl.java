package id.worx.worx.service.report;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import fr.opensagres.xdocreport.core.XDocReportException;
import fr.opensagres.xdocreport.core.document.SyntaxKind;
import fr.opensagres.xdocreport.document.IXDocReport;
import fr.opensagres.xdocreport.document.registry.XDocReportRegistry;
import fr.opensagres.xdocreport.template.IContext;
import fr.opensagres.xdocreport.template.TemplateEngineKind;
import fr.opensagres.xdocreport.template.formatter.FieldsMetadata;
import id.worx.worx.common.WorxConstants;
import id.worx.worx.common.model.dto.LocationDTO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReportServiceImpl implements ReportService {

    @Override
    public ByteArrayOutputStream getSubmissionReport(Long formId) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        try (InputStream in = new ClassPathResource(WorxConstants.TEMPLATE_REPORT_SUBMISSION_DOCX_PATH)
                .getInputStream()) {
            IXDocReport report = XDocReportRegistry.getRegistry().loadReport(in, TemplateEngineKind.Freemarker);

            FieldsMetadata metadata = report.createFieldsMetadata();
            metadata.addFieldAsTextStyling("submitAddress", SyntaxKind.Html);
            metadata.load("fields", FieldContext.class, true);

            IContext context = report.createContext();

            FieldContext text = FieldContext.builder()
                    .label("Nama Fasilitas Umum")
                    .description("Deskripsi TextField")
                    .value("Trotoar sekitar kalibata")
                    .build();

            FieldContext checkbox = FieldContext.builder()
                    .label("Kelayakan")
                    .description("Deskripsi CheckboxField")
                    .value("Tidak Layak, Perlu Perbaikan")
                    .build();

            FieldContext radiogroup = FieldContext.builder()
                    .label("Lokasi")
                    .description("Deskripsi RadiogroupField")
                    .value("Jakarta Selatan")
                    .build();

            FieldContext dropdown = FieldContext.builder()
                    .label("Jenis Fasilitas Umum")
                    .description("Deskripsi DropdownField")
                    .value("Fasilitas di Ruang Terbuka")
                    .build();

            FieldContext date = FieldContext.builder()
                    .label("Tanggal Laporan")
                    .description("Deskripsi DateField")
                    .value("01/12/2022")
                    .build();

            FieldContext rating = FieldContext.builder()
                    .label("Tingkat Pelayanan Petugas terhadap Fasilitas Umum")
                    .description("Deskripsi RatingField")
                    .value("★★☆☆☆")
                    .build();

            FieldContext image = FieldContext.builder()
                    .label("Foto Fasilitas Umum (jika ada)")
                    .description("Deskripsi ImageField")
                    .value("IMG_01.jpg \n IMG_02.jpg")
                    .build();

            FieldContext file = FieldContext.builder()
                    .label("Foto Fasilitas Umum (jika ada)")
                    .description("Deskripsi ImageField")
                    .value("VID_01.mov")
                    .build();

            FieldContext signature = FieldContext.builder()
                    .label("Tanda Tangan Pelapor")
                    .description("Deskripsi ImageField")
                    .value("VID_01.mov")
                    .build();

            List<FieldContext> fields = List.of(
                    text,
                    checkbox,
                    radiogroup,
                    dropdown,
                    date,
                    rating);

            FormContext form = FormContext.builder()
                    .name("Kelayakan Fasilitas Umum DKI Jakarta")
                    .description("Penilaian masyarakat terhadap fasilitas umum di DKI Jakarta")
                    .source("Device 1")
                    .submitDate("2022-10-14 06:46:13.811982")
                    .submitLocation(new LocationDTO(
                            "H47V+F44, Jl. Raya Buruan, Pitra, Kec. Penebel, Kel. Penipis. Jakarta Pusat", -7.2974468,
                            108.737638))
                    .build();
            context.put("form", form);
            context.put("fields", fields);

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
