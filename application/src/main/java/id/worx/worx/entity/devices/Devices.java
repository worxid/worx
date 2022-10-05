package id.worx.worx.entity.devices;

import id.worx.worx.entity.Group;
import id.worx.worx.enums.DeviceStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import id.worx.worx.entity.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "devices")
@Where(clause = "deleted = false")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Devices extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String ip;
    private Integer port;
    private String label;
    private String deviceModel;
    private String deviceOsVersion;
    private String deviceAppVersion;
    private String deviceLanguage;
    private String deviceCode;
    private DeviceStatus deviceStatus;
    private LocalDateTime joinedTime;
    private boolean deleted;

    @ManyToMany(cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    })
    @JoinTable(name = "device_groups", joinColumns = @JoinColumn(name = "device_id"), inverseJoinColumns = @JoinColumn(name = "group_id"))
    @Builder.Default
    private Set<Group> deviceGroups = new HashSet<>();
}

