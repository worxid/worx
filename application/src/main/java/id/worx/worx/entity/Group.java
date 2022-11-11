package id.worx.worx.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import id.worx.worx.entity.devices.Device;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "worx_groups")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Group extends BaseEntity {

    private static final long serialVersionUID = 6325298257149916015L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Default
    @Column(nullable = false)
    private Long userId = 0L;

    @Column(name = "group_name", nullable = false)
    private String name;
    @Column(name = "group_color", nullable = false, length = 10)
    private String color;

    @Default
    @Column(nullable = false)
    private Boolean isDefault = false;

    @ManyToMany(mappedBy = "assignedGroups", cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @Default
    private Set<FormTemplate> templates = new HashSet<>();

    @ManyToMany(mappedBy = "assignedGroups", cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @Default
    private Set<Device> devices = new HashSet<>();

    public int getFormCount() {
        return templates.size();
    }

    public int getDeviceCount() {
        return devices.size();
    }

}
