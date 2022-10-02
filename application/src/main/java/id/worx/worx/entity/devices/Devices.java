package id.worx.worx.entity.devices;

import id.worx.worx.entity.Audit;
import id.worx.worx.entity.BaseEntity;
import id.worx.worx.enums.DeviceStatus;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private String deviceName;
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
    private String longitude;
    private String latitude;

}
