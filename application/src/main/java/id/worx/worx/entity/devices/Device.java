package id.worx.worx.entity.devices;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
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

import id.worx.worx.common.enums.DeviceStatus;
import id.worx.worx.entity.BaseEntity;
import id.worx.worx.entity.Group;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "devices")
@SQLDelete(sql = "UPDATE devices SET deleted = true WHERE id=?")
@Where(clause = "deleted = false")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Device extends BaseEntity {

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

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "device_groups", joinColumns = @JoinColumn(name = "device_id"), inverseJoinColumns = @JoinColumn(name = "group_id"))
    @Builder.Default
    private Set<Group> assignedGroups = new HashSet<>();

}
