package id.worx.worx.common.exception;

import id.worx.worx.common.exception.detail.ErrorDetail;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class ObjectStorageErrorDetail extends ErrorDetail {

    private static final long serialVersionUID = -6253222436021148375L;
    private static final String NO_SUCH_KEY_STRING = "NO_SUCH_KEY";

    public ObjectStorageErrorDetail() {
        super(NO_SUCH_KEY_STRING, "No such key found.");
    }

}
