package id.worx.worx.entity;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public class Audit implements Serializable {

    private static final long serialVersionUID = -434520343546169056L;
    @CreatedBy
    @Column(name = "created_by", length = 100, nullable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "created_on", nullable = false)
    private Instant createdOn;

    @LastModifiedBy
    @Column(name = "modified_by", length = 100, nullable = false)
    private String modifiedBy;

    @LastModifiedDate
    @Column(name = "modified_on", nullable = false)
    private Instant modifiedOn;

}
