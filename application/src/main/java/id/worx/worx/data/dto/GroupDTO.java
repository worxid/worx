package id.worx.worx.data.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupDTO implements Serializable {

    private static final long serialVersionUID = 60071507013720586L;

    private Long id;
    private String name;
    private String color;

}
