package id.worx.worx.config.security;

import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;

public class SkipPathRequestMatcher implements RequestMatcher {

    private OrRequestMatcher matchers;

    public SkipPathRequestMatcher(List<String> pathsToSkip) {
        Assert.notNull(pathsToSkip, "List of paths to skip is required.");
        List<RequestMatcher> m = pathsToSkip.stream()
                .map(AntPathRequestMatcher::new)
                .collect(Collectors.toList());
        this.matchers = new OrRequestMatcher(m);
    }

    @Override
    public boolean matches(HttpServletRequest request) {
        return !matchers.matches(request);
    }

}
