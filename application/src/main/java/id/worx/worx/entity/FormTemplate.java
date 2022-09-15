package id.worx.worx.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "form_templates")
@SQLDelete(sql = "UPDATE form_templates SET deleted = true WHERE id=?")
@Where(clause = "deleted = false")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FormTemplate extends BaseEntity {

    private static final long serialVersionUID = 5793901469269802065L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Default
    @Column(nullable = false)
    private Long userId = 0L;

    private String label;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String fields;

    private Boolean submitInZone;

    private Boolean isDefaultForm;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "template_groups", joinColumns = @JoinColumn(name = "template_id"), inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<Group> assignedGroups;

}
