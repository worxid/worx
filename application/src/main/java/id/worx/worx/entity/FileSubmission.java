package id.worx.worx.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "files_submissions")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FileSubmission extends BaseEntity {

    private static final long serialVersionUID = 3244572252921312082L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "file_id", nullable = false)
    private File file;

    @ManyToOne
    @JoinColumn(name = "form_id", nullable = false)
    private Form form;

    private String fieldId;

    private Boolean isSubmitted;
}
