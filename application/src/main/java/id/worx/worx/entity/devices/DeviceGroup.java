package id.worx.worx.entity.devices;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "DEVICE_GROUPS")
@NoArgsConstructor
public class DeviceGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    Long id;

    @Column(name = "device_id")
    Long deviceId;
    @Column(name = "group_id")
    Long groupId;

    public DeviceGroup(Long deviceId, Long groupId){
        this.deviceId=deviceId;
        this.groupId=groupId;
    }
}
