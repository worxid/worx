package id.worx.worx.service.report;

import fr.opensagres.xdocreport.document.images.IImageProvider;
import fr.opensagres.xdocreport.template.annotations.FieldMetadata;
import fr.opensagres.xdocreport.template.annotations.ImageMetadata;
import fr.opensagres.xdocreport.template.formatter.NullImageBehaviour;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Value {

    private String label;
    @Getter(AccessLevel.NONE)
    private IImageProvider image;

    @FieldMetadata(images = { @ImageMetadata(name = "image", behaviour = NullImageBehaviour.RemoveImageTemplate) })
    public IImageProvider getImage() {
        return image;
    }
}
