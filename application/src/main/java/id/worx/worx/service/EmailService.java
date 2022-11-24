package id.worx.worx.service;

import org.thymeleaf.context.Context;

import id.worx.worx.common.model.dto.EmailDTO;

public interface EmailService {

    void sendEmail(EmailDTO email);

    void sendRestorePasswordEmail(String email, String content);

    void sendResetPassword(String email, String content, String url);

    void sendShareFormEmail(String email, Context context);

    void sendWelcomingEmail(String email, String content, String url);

    void sendInviteDeviceEmail(String[] emails,String organizationCode);

}
