package id.worx.worx.entity;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "forms")
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

    @Column(nullable = false)
    private Long templateId;

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
