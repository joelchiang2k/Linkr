package com.example.demo.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class MailService {
    private final JavaMailSender javaMailSender;

    public void sendMail(String email, String authKey) {


        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("purdueseniordesign@naver.com");
            helper.setTo(email);
            helper.setSubject("Email Authentication");
            String htmlContent = "<!DOCTYPE html>"
                    + "<html>"
                    + "<head>"
                    + "<style>"
                    + "body {"
                    + "font-family: Arial, sans-serif;"
                    + "}"
                    + ".container {"
                    + "background-color: #f1f1f1;"
                    + "padding: 20px;"
                    + "border-radius: 10px;"
                    + "}"
                    + ".auth-key-box {"
                    + "background-color: #4CAF50;"
                    + "padding: 15px 32px;"
                    + "border-radius: 10px;"
                    + "color: white;"
                    + "font-size: 16px;"
                    + "}"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<div class='container'>"
                    + "<h1>[Project Linkr Authentication]</h1>"
                    + "<p>Your authentication code is:</p>"
                    + "<div class='auth-key-box'>" + authKey + "</div>"
                    + "</div>"
                    + "</body>"
                    + "</html>";
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
