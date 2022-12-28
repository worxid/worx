package id.worx.worx.service.report;

import java.util.Objects;

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
public class ValueContext {

    @Getter(AccessLevel.NONE)
    private String label;
    private String hyperlink;

    @Getter(AccessLevel.NONE)
    private IImageProvider image;

    @FieldMetadata(images = { @ImageMetadata(name = "image", behaviour = NullImageBehaviour.RemoveImageTemplate) })
    public IImageProvider getImage() {
        return image;
    }

    @FieldMetadata(syntaxKind = "Html")
    public String getLabel() {
        if (hasHyperlink()) {
            String encodedHyperlink = hyperlink.replace("&", "&amp;");
            return String.format("<a href=\"%s\"> %s </a>", encodedHyperlink, label);
        }

        return label;
    }

    public boolean hasHyperlink() {
        return Objects.nonNull(hyperlink) && !hyperlink.isBlank();
    }

}
