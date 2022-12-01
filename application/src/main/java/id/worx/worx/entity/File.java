package id.worx.worx.entity;

import javax.persistence.*;

import id.worx.worx.entity.users.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder.Default;

@Entity
@Table(name = "files")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class File extends BaseEntity {

    private static final long serialVersionUID = 2568112317390407171L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String path;
    private String name;
    private String mediaId;
    private String originalName;
    private String mimeType;
    private long size;
    @Default
    private FileState state = FileState.CREATED;
    private Long userId;
    @ManyToOne
    @JoinColumn(name = "dashboard_logo", nullable = false)
    private Users users;

}
