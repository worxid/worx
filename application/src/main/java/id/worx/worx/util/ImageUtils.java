package id.worx.worx.util;

import java.awt.Dimension;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import javaxt.io.Image;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageUtils {

    public static Dimension getImageDimension(BufferedImage image) {
        return new Dimension(image.getWidth(), image.getHeight());
    }

    public static Dimension getScaledDimension(BufferedImage image, Dimension boundary) {
        return getScaledDimension(getImageDimension(image), boundary);
    }

    public static Dimension getScaledDimension(byte[] image, Dimension boundary) throws IOException {
        try (InputStream is = new ByteArrayInputStream(image)) {
            return getScaledDimension(ImageIO.read(is), boundary);
        }
    }

    public static Dimension getScaledDimension(Dimension imageSize, Dimension boundary) {

        double widthRatio = boundary.getWidth() / imageSize.getWidth();
        double heightRatio = boundary.getHeight() / imageSize.getHeight();
        double ratio = Math.min(widthRatio, heightRatio);

        return new Dimension((int) (imageSize.width * ratio), (int) (imageSize.height * ratio));
    }

    public static byte[] rotateImageByExif(byte[] bytes) {
        Image image = new Image(bytes);
        image.rotate();
        return image.getByteArray();
    }

}
