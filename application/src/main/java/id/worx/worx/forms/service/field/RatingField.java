package id.worx.worx.forms.service.field;

public class RatingField extends Field {

    private static final long serialVersionUID = -8828077945547824010L;

    private Integer maxStars;

    public RatingField() {
        super(FieldType.RATING);
    }

    public RatingField(String id, String label, String description, Boolean required,
            Integer maxStars) {
        super(id, label, description, FieldType.RATING, required);
        this.maxStars = maxStars;
    }

    public Integer getMaxStars() {
        return maxStars;
    }

    public void setMaxStars(Integer maxStars) {
        this.maxStars = maxStars;
    }

}
