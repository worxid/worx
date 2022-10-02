package id.worx.worx.entity.devices;

import id.worx.worx.entity.Audit;
import id.worx.worx.enums.DeviceStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    @Enumerated(EnumType.ORDINAL)
    private DeviceStatus deviceStatus;
    private LocalDateTime joinedTime;

}
