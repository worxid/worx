package id.worx.worx.config.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import id.worx.worx.common.enums.UserStatus;
import id.worx.worx.entity.users.Users;

public class WorxUserPrincipal implements UserDetails {

    private static final long serialVersionUID = -1582794625807710004L;

    private Long id;
    private String userName;
    private String password;
    private Users user;
    private List<GrantedAuthority> authorities;

    public WorxUserPrincipal(Users user, List<GrantedAuthority> authorities) {
        this.id = user.getId();
        this.userName = user.getEmail();
        this.password = user.getPassword();
        this.user = user;
        this.authorities = authorities;
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

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return id;
    }

    public Users getUser() {
        return user;
    }
}
