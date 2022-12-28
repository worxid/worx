package id.worx.worx.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class WorxConstants {

    public static final String ENV_GEOCODER_ENABLED_STRING = "worx.geocoder.enabled";
    public static final String ENV_GEOCODER_GOOGLE_API_KEY_STRING = "worx.geocoder.google-api-key";

    public static final String TEMPLATE_REPORT_SUBMISSION_DOCX_PATH = "templates/report-submission.docx";

}
