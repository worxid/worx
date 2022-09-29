package id.worx.worx.entity.devices;

import id.worx.worx.entity.Audit;
import id.worx.worx.entity.Group;
import id.worx.worx.enums.DeviceStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "DEVICES")
public class Devices extends Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
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

}