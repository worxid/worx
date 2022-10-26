package id.worx.worx.entity;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "forms")
@SQLDelete(sql = "UPDATE forms SET deleted = true WHERE id=?")
@Where(clause = "deleted = false")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Form extends BaseEntity {

    private static final long serialVersionUID = -5273984533561487955L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "template_id", nullable = false)
    private FormTemplate template;

    @Enumerated(EnumType.STRING)
    @Column(name = "respondent_type")
    private RespondentType respondentType;
    @Column(name = "respondent_label")
    private String respondentLabel;
    @Column(name = "respondent_device_code")
    private String respondentDeviceCode;
    @Column(name = "respondent_ip_address")
    private String respondentIP;

    private String label;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String fields;

    @Column(name = "form_values", columnDefinition = "MEDIUMTEXT")
    private String values;

    private Boolean submitInZone;
    private Instant submitDate;
    private String submitAddress;

    @Column(columnDefinition = "decimal(16,10)")
    private Double submitLat;
    @Column(columnDefinition = "decimal(16,10)")
    private Double submitLng;

}
