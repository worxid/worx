package id.worx.worx.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "template_groups")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TemplateGroups {
    private Long templateId;
    private Long groupId;
}