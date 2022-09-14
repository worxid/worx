package id.worx.worx.controller;

import java.util.List;

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

import id.worx.worx.data.request.GroupRequest;
import id.worx.worx.entity.Group;
import id.worx.worx.service.GroupService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public ResponseEntity<?> list() {
        List<Group> groups = groupService.list();
        return ResponseEntity.status(HttpStatus.OK)
                .body(groups);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid GroupRequest request) {
        Group group = groupService.create();
        return null;
    }

    @GetMapping("{id}")
    public ResponseEntity<?> read(@PathVariable("id") Long id) {
        Group group = groupService.read(id);
        return null;
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id) {
        Group group = groupService.update(id);
        return null;
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        groupService.delete(id);
        return null;
    }

}
