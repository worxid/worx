package id.worx.worx.web.mailTemplate;

public class ResetPasswordMail {

    public static String ResetPasswordTemplate(String linkUrl, String fullname){

        return "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:th=\"http://www.thymeleaf.org\">\n" +
            "\n" +
            "    <head>\n" +
            "      <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" +
            "      <title>Email Reset Password</title>\n" +
            "      <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n" +
            "      <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n" +
            "      <link href=\"https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap\" rel=\"stylesheet\">\n" +
            "      <link href=\"https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap\" rel=\"stylesheet\">\n" +
            "    </head>\n" +
            "    \n" +
            "    <body yahoo=\"\" bgcolor=\"#f8f9fa\" style=\"margin: 0; padding: 0; min-width: 100% !important\">\n" +
            "      <table width=\"100%\" bgcolor=\"#f8f9fa\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "        <tr>\n" +
            "          <td style=\"background-color: #ffffff;\">\n" +
            "            <table class=\"content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width: 100%; max-width: 541.31px; border: 2px solid rgba(0, 0, 0, 0.87);\">\n" +
            "              <tr>\n" +
            "                <td bgcolor=\"#ffffff\" class=\"header\" style=\"padding: 64px 30px 56px 30px\">\n" +
            "                  <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                    <tr>\n" +
            "                      <td style=\"padding: 0 0 0 0\">\n" +
            "                        <img src=\"https://i.ibb.co/j4vm3Z1/worx.png\" alt=\"worx-logo\" border=\"0\" height=\"40\" class=\"fix\" width=\"100%\">" +
            "                      </td>\n" +
            "                    </tr>\n" +
            "                  </table>\n" +
            "                </td>\n" +
            "              </tr>\n" +
            "              <tr>\n" +
            "                <td bgcolor=\"#ffffff\" class=\"innerpadding borderbottom\" style=\"padding: 0 64px 64px 64px;\">\n" +
            "                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
            "                    <tr>\n" +
            "                      <td class=\"bodycopy\" style=\"\n" +
            "                            color: #000000;\n" +
            "                            font-family: 'Open Sans', sans-serif;\n" +
            "                            font-size: 12px;\n" +
            "                            line-height: 16.34px;\n" +
            "                          \">\n" +
            "                        <p>Hi, "+fullname+"!</p>\n" +
            "                        <p style=\"margin-top: 18px;\">\n" +
            "                          Thank you for using Worx.\n" +
            "                          </br>\n" +
            "                          Please click the following link to change your password:\n" +
            "                        </p>\n" +
            "                        <table align=\"center\" class=\"buttonwrapper\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"\n" +
            "                          style=\"margin-top: 30px\">\n" +
            "                          <tr>\n" +
            "                            <td class=\"button\" width=\"181\" height=\"36\" bgcolor=\"#DA3630\" style=\" \n" +
            "                                  text-align: center;\n" +
            "                                  border: 2px solid rgba(0, 0, 0, 0.87);\n" +
            "                                  box-shadow: 2px 2px 0px #000000;\n" +
            "                                \">\n" +
            "                              <a href=\""+linkUrl+"\" target=\"_blank\" style=\"\n" +
            "                                    font-family: 'Space Mono', sans-serif;\n" +
            "                                    font-style: normal;\n" +
            "                                    font-weight: 700;\n" +
            "                                    font-size: 14px;\n" +
            "                                    line-height: 24px;\n" +
            "                                    color: #ffffff;\n" +
            "                                    letter-spacing: 0.4px;\n" +
            "                                    text-decoration: none;\n" +
            "                                  \">Reset Password</a>\n" +
            "                            </td>\n" +
            "                          </tr>\n" +
            "                        </table>\n" +
            "                        <p style=\"margin-top: 28px;\">We would be very happy to assist you.</p>\n" +
            "                        <p style=\"margin-top: 18px;\">\n" +
            "                          Thank you<br />\n" +
            "                          Everyone at Worx\n" +
            "                        </p>\n" +
            "                      </td>\n" +
            "                    </tr>\n" +
            "                  </table>\n" +
            "                </td>\n" +
            "              </tr>\n" +
            "              <tr>\n" +
            "                <td style=\"padding: 12px\" align=\"center\">\n" +
            "                  <p style=\"margin: 0; font-family: 'Open Sans', sans-serif; font-size: 12px;\">®worx 2021</p>\n" +
            "                </td>\n" +
            "              </tr>\n" +
            "            </table>\n" +
            "          </td>\n" +
            "        </tr>\n" +
            "      </table>\n" +
            "    </body>\n" +
            "    \n" +
            "    </html>";
    }
}
