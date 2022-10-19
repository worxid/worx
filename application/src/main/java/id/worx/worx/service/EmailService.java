package id.worx.worx.service;

import id.worx.worx.common.model.dto.EmailDTO;

public interface EmailService {

    void sendEmail(EmailDTO email);

    void sendRestorePasswordEmail(String email, String content);

    void sendResetPassword(String email, String content, String url);

    void sendShareFormEmail(String email, String content);
    void sendWelcomingEmail(String email, String content, String url);

}
