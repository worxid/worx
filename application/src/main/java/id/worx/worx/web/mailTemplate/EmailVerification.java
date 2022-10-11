package id.worx.worx.web.mailTemplate;

public class EmailVerification {
    // TODO #82 Convert this template as html file, read from resources/templates
    public static String EmailVerify(String linkUrl, String fullname){
        return "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:th=\"http://www.thymeleaf.org\">\n" +
            "\n" +
            "    <head>\n" +
            "      <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" +
            "      <title>Email Verification</title>\n" +
            "      <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n" +
            "      <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n" +
            "      <link href=\"https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap\" rel=\"stylesheet\">\n" +
            "      <link href=\"https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap\" rel=\"stylesheet\">\n" +
            "    </head>\n" +
            "    \n" +
            "    <body yahoo=\"\" bgcolor=\"#f8f9fa\" style=\"margin: 0; padding: 0; min-width: 100% !important\">\n" +
            "      <table width=\"100%\" bgcolor=\"#f8f9fa\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "        <tr>\n" +
            "          <td>\n" +
            "            <table class=\"content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width: 100%; max-width: 541.31px; border: 2px solid rgba(0, 0, 0, 0.87);\">\n" +
            "              <tr>\n" +
            "                <td bgcolor=\"#ffffff\" class=\"header\" style=\"padding: 48px 30px 0 30px\">\n" +
            "                  <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                    <tr>\n" +
            "                      <td style=\"padding: 0 0 0 0\">\n" +
            "                        <img src=\"https://i.ibb.co/j4vm3Z1/worx.png\" alt=\"worx-logo\" border=\"0\" height=\"40\" class=\"fix\" width=\"100%\">" +
            "                          <h1 style=\"\n" +
            "                            font-family: 'Open Sans', sans-serif;\n" +
            "                            font-weight: 600;\n" +
            "                            font-size: 16px;\n" +
            "                            line-height: 22px;\n" +
            "                            text-align: center;\n" +
            "                          \">Welcome to Worx</h1>\n" +
            "                      </td>\n" +
            "                    </tr>\n" +
            "                  </table>\n" +
            "                </td>\n" +
            "              </tr>\n" +
            "              <tr>\n" +
            "                <td bgcolor=\"#ffffff\" class=\"innerpadding borderbottom\" style=\"padding: 24px 52px 64px 52px;\">\n" +
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
            "                            Thank you for registering in our application! Worx is a new and easy way to monitor fleet that you have.\n" +
            "                        </p>\n" +
            "                        <p style=\"margin-top: 18px;\">\n" +
            "                            To login your account, please click the button below:\n" +
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
            "                                  \">Confirm Account</a>\n" +
            "                            </td>\n" +
            "                          </tr>\n" +
            "                        </table>\n" +
            "                        <p style=\"padding: 20px 0 0 0\">\n" +
            "                            By clicking on the button above you will be logged in to your new account at \n" +
            "                            Worx and have to complete access to all features. You also agree to receive \n" +
            "                            occasional emails with helpful hints, product updates, and industry news.\n" +
            "                        </p>\n" +
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
            "                <td style=\"padding: 12px\" align=\"center\" bgcolor=\"#ffffff\">\n" +
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
