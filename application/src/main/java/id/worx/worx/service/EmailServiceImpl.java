package id.worx.worx.service;

import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import id.worx.worx.common.model.dto.EmailDTO;
import id.worx.worx.config.properties.WorxProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final WorxProperties worxProps;
    private static final String EMAIL_RESET_PASSWORD_TEMPLATE = "email-reset-password.html";

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Override
    public void sendEmail(EmailDTO email) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            helper.setTo(email.getTo());
            helper.setText(email.getContent(), true);
            helper.setSubject(email.getSubject());
            helper.setFrom(email.getFrom());
            javaMailSender.send(message);
            log.info("Mail sent to : " + email.getTo());
        } catch (MessagingException e) {
            log.error("Mail Sending failure : " + e.getMessage(), e);
        }
    }

    @Override
    public void sendRestorePasswordEmail(String email, String content) {
        Context context = new Context();
        context.setVariable("confirmationUrl", content);
        context.setVariable("greeting", String.format("Hi %s,", email));
        String body = templateEngine.process(EMAIL_RESET_PASSWORD_TEMPLATE, context);
        EmailDTO emailDTO = EmailDTO.builder()
                .from(worxProps.getMail().getFromAddress())
                .to(email)
                .content(body)
                .subject("Restore Password for Your Lacak Account")
                .build();
        sendEmail(emailDTO);
    }

    @Override
    public void sendShareFormEmail(String email, String code) {
        String url = String.format("https://dev.worx.id/fill-form?code=%s", code);
        log.info("share url {}", url);
        EmailDTO emailDTO = EmailDTO.builder()
                .from(worxProps.getMail().getFromAddress())
                .to(email)
                .content(url)
                .subject("Fill Your Form with Worx")
                .build();
        sendEmail(emailDTO);
    }

}
