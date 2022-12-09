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
import fr.opensagres.xdocreport.document.images.ByteArrayImageProvider;
import fr.opensagres.xdocreport.document.images.IImageProvider;
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
            metadata.load("v", Value.class);
            metadata.load("organization", Organization.class);

            IContext context = report.createContext();

            InputStream logo = new ClassPathResource("templates/default_logo.png").getInputStream();
            IImageProvider logoImageProvider = new ByteArrayImageProvider(logo);
            logoImageProvider.setSize(99.84f, 29.76f);
            Organization org = Organization.builder()
                    .logo(logoImageProvider)
                    .build();

            FieldContext text = FieldContext.builder()
                    .label("Nama Fasilitas Umum")
                    .description("Deskripsi TextField")
                    .values(List.of(
                            Value.builder()
                                    .label("Trotoar sekitar kalibata")
                                    .build()))
                    .build();

            FieldContext checkbox = FieldContext.builder()
                    .label("Kelayakan")
                    .description("Deskripsi CheckboxField")
                    .values(List.of(
                            Value.builder().label("Tidak Layak, Perlu Perbaikan").build()))
                    .build();

            FieldContext radiogroup = FieldContext.builder()
                    .label("Lokasi")
                    .description("Deskripsi RadiogroupField")
                    .values(List.of(Value.builder().label("Jakarta Selatan").build()))
                    .build();

            FieldContext dropdown = FieldContext.builder()
                    .label("Jenis Fasilitas Umum")
                    .description("Deskripsi DropdownField")
                    .values(List.of(Value.builder().label("Fasilitas di Ruang Terbuka").build()))
                    .build();

            FieldContext date = FieldContext.builder()
                    .label("Tanggal Laporan")
                    .description("Deskripsi DateField")
                    .values(List.of(Value.builder().label("01/12/2022").build()))
                    .build();

            FieldContext rating = FieldContext.builder()
                    .label("Tingkat Pelayanan Petugas terhadap Fasilitas Umum")
                    .description("Deskripsi RatingField")
                    .values(List.of(Value.builder().label("★★☆☆☆").build()))
                    .build();

            boolean useImageSize = true;
            InputStream image1 = new ClassPathResource("templates/placholder_1.jpg").getInputStream();
            IImageProvider image1ImageProvider = new ByteArrayImageProvider(image1, useImageSize);

            InputStream image2 = new ClassPathResource("templates/placholder_2.jpg").getInputStream();
            IImageProvider image2ImageProvider = new ByteArrayImageProvider(image2, useImageSize);

            FieldContext image = FieldContext.builder()
                    .label("Foto Fasilitas Umum (jika ada)")
                    .description("Deskripsi ImageField")
                    .values(List.of(
                            Value.builder()
                                    .label("IMG_01.jpg")
                                    .image(image1ImageProvider)
                                    .build(),
                            Value.builder()
                                    .label("IMG_02.jpg")
                                    .image(image2ImageProvider)
                                    .build()))
                    .build();

            FieldContext file = FieldContext.builder()
                    .label("Video Fasilitas Umum (jika ada)")
                    .description("Deskripsi FileField")
                    .values(List.of(Value.builder().label("VID_01.mov").build()))
                    .build();

            FieldContext signature = FieldContext.builder()
                    .label("Tanda Tangan Pelapor")
                    .description("Deskripsi SignatureField")
                    .values(List.of(Value.builder().label("").build()))
                    .build();

            List<FieldContext> fields = List.of(
                    text,
                    checkbox,
                    radiogroup,
                    dropdown,
                    date,
                    rating,
                    image,
                    file,
                    signature);

            FormContext form = FormContext.builder()
                    .name("Kelayakan Fasilitas Umum DKI Jakarta")
                    .description("Penilaian masyarakat terhadap fasilitas umum di DKI Jakarta")
                    .source("Device 1")
                    .submitDate("2022-10-14 06:46:13.811982")
                    .submitLocation(new LocationDTO(
                            "H47V+F44, Jl. Raya Buruan, Pitra, Kec. Penebel, Kel. Penipis. Jakarta Pusat", -7.2974468,
                            108.737638))
                    .build();
            context.put("organization", org);
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
