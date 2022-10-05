package id.worx.worx.entity.devices;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import id.worx.worx.entity.BaseEntity;
import id.worx.worx.enums.DeviceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "devices")
@Where(clause = "deleted = false")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Devices extends BaseEntity {

    private static final long serialVersionUID = 796548166854517012L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private String organizationCode;
    private String deviceCode;

    private String ip;
    private Integer port;

    private String deviceModel;
    private String deviceOsVersion;
    private String deviceAppVersion;
    private String deviceLanguage;
    private DeviceStatus deviceStatus;
    private Instant joinedDate;

}
