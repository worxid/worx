package id.worx.worx.model;

import id.worx.worx.entity.users.Users;
import id.worx.worx.enums.UserStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetails  implements UserDetails {

    private Long id;
    private String userName;
    private String password;
    private UserStatus status;
    private List<GrantedAuthority> authorities;

    public MyUserDetails(Users user) {
        this.id = user.getId();
        this.userName = user.getEmail();
        this.password = user.getPassword();
        this.status = user.getStatus();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public Long getId() {
        return id;
    }

}
