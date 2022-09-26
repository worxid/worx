package id.worx.worx.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.worx.worx.data.dto.GroupDTO;
import id.worx.worx.data.request.GroupRequest;
import id.worx.worx.data.response.BaseListResponse;
import id.worx.worx.data.response.BaseResponse;
import id.worx.worx.data.response.BaseValueResponse;
import id.worx.worx.entity.Group;
import id.worx.worx.service.GroupService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public ResponseEntity<BaseListResponse<GroupDTO>> list() {
        List<Group> groups = groupService.list();
        List<GroupDTO> dtos = groups.stream()
                .map(groupService::toDTO)
                .collect(Collectors.toList());
        BaseListResponse<GroupDTO> response = BaseListResponse.<GroupDTO>builder()
                .list(dtos)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping
    public ResponseEntity<BaseValueResponse<GroupDTO>> create(@RequestBody @Valid GroupRequest request) {
        Group group = groupService.create(request);
        GroupDTO dto = groupService.toDTO(group);
        BaseValueResponse<GroupDTO> response = BaseValueResponse.<GroupDTO>builder()
                .value(dto)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<BaseValueResponse<GroupDTO>> read(@PathVariable("id") Long id) {
        Group group = groupService.read(id);
        GroupDTO dto = groupService.toDTO(group);
        BaseValueResponse<GroupDTO> response = BaseValueResponse.<GroupDTO>builder()
                .value(dto)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<BaseValueResponse<GroupDTO>> update(@PathVariable("id") Long id,
            @RequestBody @Valid GroupRequest request) {
        Group group = groupService.update(id, request);
        GroupDTO dto = groupService.toDTO(group);
        BaseValueResponse<GroupDTO> response = BaseValueResponse.<GroupDTO>builder()
                .value(dto)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable("id") Long id) {
        groupService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(BaseResponse.builder().build());
    }

}