package id.worx.worx.controller;

import id.worx.worx.service.users.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/web/users")
@AllArgsConstructor
public class UsersController {

    private final UsersService usersService;

}
