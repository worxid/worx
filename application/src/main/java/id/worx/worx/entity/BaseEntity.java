package id.worx.worx.entity;

import javax.persistence.MappedSuperclass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity extends Audit {

    private static final long serialVersionUID = -4494802825499661626L;

    private boolean deleted;

}
