package id.worx.worx.entity.devices;

import id.worx.worx.entity.Audit;
import id.worx.worx.entity.Group;
import id.worx.worx.enums.DeviceStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "devices")
public class Devices extends Audit {

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

