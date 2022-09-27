package id.worx.worx.entity;

public enum RespondentType {
    MOBILE_APP("mobile_app"),
    WEB_BROWSER("web_browser");

    private String name;

    RespondentType(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

}
