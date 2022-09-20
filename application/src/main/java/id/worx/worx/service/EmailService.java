package id.worx.worx.service;

import id.worx.worx.data.dto.EmailDTO;

public interface EmailService {

    void sendEmail(EmailDTO email);

    void sendRestorePasswordEmail(String email, String content);

    void sendShareFormEmail(String email, String content);

}
