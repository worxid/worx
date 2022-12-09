package id.worx.worx.service.report;

import fr.opensagres.xdocreport.document.images.IImageProvider;
import fr.opensagres.xdocreport.template.annotations.FieldMetadata;
import fr.opensagres.xdocreport.template.annotations.ImageMetadata;
import fr.opensagres.xdocreport.template.formatter.NullImageBehaviour;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Organization {

    private IImageProvider logo;

    @FieldMetadata(images = { @ImageMetadata(name = "logo", behaviour = NullImageBehaviour.RemoveImageTemplate) })
    public IImageProvider getLogo() {
        return logo;
    }
}
