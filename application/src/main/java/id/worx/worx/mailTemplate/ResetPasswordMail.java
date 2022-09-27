package id.worx.worx.mailTemplate;

public class ResetPasswordMail {

    public static String ResetPasswordTemplate(String linkUrl){

        return "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" +
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
            "          <td>\n" +
            "            <table class=\"content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width: 100%; max-width: 541.31px; border: 2px solid rgba(0, 0, 0, 0.87);\">\n" +
            "              <tr>\n" +
            "                <td bgcolor=\"#ffffff\" class=\"header\" style=\"padding: 25px 30px 56px 30px\">\n" +
            "                  <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
            "                    <tr>\n" +
            "                      <td style=\"padding: 0 0 0 0\">\n" +
            "                        <img class=\"fix\" src=\"https://assets.website-files.com/6073f5b57d7f7c32f8ecb245/6073f5b57d7f7c4fdeecb2bd_logo1.png\" height=\"40\"\n" +
            "                          width=\"100%\" alt=\"worx-logo\" />\n" +
            "                      </td>\n" +
            "                    </tr>\n" +
            "                  </table>\n" +
            "                </td>\n" +
            "              </tr>\n" +
            "              <tr>\n" +
            "                <td bgcolor=\"#ffffff\" class=\"innerpadding borderbottom\" style=\"\n" +
            "                      padding: 0 64px 30px 64px;\n" +
            "                      border-bottom: 1px solid #f2eeed;\n" +
            "                    \">\n" +
            "                  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
            "                    <tr>\n" +
            "                      <td class=\"bodycopy\" style=\"\n" +
            "                            color: #000000;\n" +
            "                            font-family: 'Open Sans', sans-serif;\n" +
            "                            font-size: 12px;\n" +
            "                            line-height: 16.34px;\n" +
            "                          \">\n" +
            "                        <p>Hi, Selena Gomez!</p>\n" +
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
            "                        <p style=\"padding: 20px 0 0 0\">\n" +
            "                            We hope this information will be useful for you. For further information, \n" +
            "                            please contact us through Worx.id [Message Center] or call Worx Call Center \n" +
            "                            at 14011 or 62-21-14777 if you call from overseas.\n" +
            "                        </p>\n" +
            "                        <p style=\"margin-top: 18px;\">We would be very happy to assist you.</p>\n" +
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
            "                <td bgcolor=\"#DA3630\" class=\"header\" style=\"padding: 25px 30px 10px 30px\">\n" +
            "                  <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Open Sans', sans-serif; font-size: 12px;\">\n" +
            "                    <tr align=\"center\">\n" +
            "                      <td style=\"padding: 0 0 15px 0;\">\n" +
            "                        <img class=\"fix\" src=\"https://api.nle-connect.id/mail.png\" height=\"12px\" width=\"15px\"\n" +
            "                          alt=\"mail-logo\" />\n" +
            "                        <a style=\"color: #ffffff; text-decoration: none; cursor: pointer; padding-left: 5px;\"\n" +
            "                          href=\"mailto:hai@Worx.id\">hai@Worx.id</a>\n" +
            "                      </td>\n" +
            "                      <td style=\"padding: 0 0 15px 0;\">\n" +
            "                        <img class=\"fix\" src=\"https://api.nle-connect.id/phone.png\" height=\"12px\" width=\"12px\"\n" +
            "                          alt=\"phone-logo\" />\n" +
            "                        <a style=\"color: #ffffff; text-decoration: none; padding-left: 5px;\">62-21-14777</a>\n" +
            "                      </td>\n" +
            "                      <td style=\"padding: 0 0px 15px 0; display: flex; align-items: center;\">\n" +
            "                        <img class=\"fix\" src=\"https://api.nle-connect.id/web.png\" height=\"15px\" width=\"15px\"\n" +
            "                          alt=\"web-logo\" />\n" +
            "                        <a style=\"color: #ffffff; text-decoration: none; cursor: pointer; padding-left: 5px;\"\n" +
            "                          href=\"https://www.worx.id\">www.worx.id</a>\n" +
            "                      </td>\n" +
            "                    </tr>\n" +
            "                    <tr style=\"color: #ffffff\">\n" +
            "                      <td>\n" +
            "                        <p></p>\n" +
            "                      </td>\n" +
            "                      <td>\n" +
            "                        <table style=\"color: #ffffff; text-decoration: none\">\n" +
            "                          <tr>\n" +
            "                            <td style=\"display: flex; align-items: center;\">\n" +
            "                              <a style=\"cursor: pointer; margin-right: 4px;\" href=\"https://facebook.com\" target=\"_blank\"> <img class=\"fix\"\n" +
            "                                  src=\"https://api.nle-connect.id/facebook.png\" height=\"17px\" width=\"17px\"\n" +
            "                                  alt=\"facebook-logo\" /></a>\n" +
            "                              <a style=\"cursor: pointer; margin-right: 4px;\" href=\"https://instagram.com\" target=\"_blank\"> <img class=\"fix\"\n" +
            "                                  src=\"https://api.nle-connect.id/template-instagram.png\" height=\"17px\" width=\"17px\"\n" +
            "                                  alt=\"instagram-logo\" /></a>\n" +
            "                              <a style=\"cursor: pointer;\" href=\"https://linkedin.com\" target=\"_blank\"><img class=\"fix\"\n" +
            "                                  src=\"https://api.nle-connect.id/template-linkedin.png\" height=\"17px\" width=\"17px\"\n" +
            "                                  alt=\"linkedin-logo\" /></a>\n" +
            "                              <p style=\"font-size: 12px; line-height: 1; padding-left: 10px;\">worx.indonesia</p>\n" +
            "                            </td>\n" +
            "                          </tr>\n" +
            "                        </table>\n" +
            "                      </td>\n" +
            "                      <td>\n" +
            "                        <p></p>\n" +
            "                      </td>\n" +
            "                    </tr>\n" +
            "                    <tr align=\"center\" style=\"color: #ffffff\">\n" +
            "                      <td></td>\n" +
            "                      <td style=\"padding: 15px 0px 0px 0\">\n" +
            "                        <p>®worx 2021</p>\n" +
            "                      </td>\n" +
            "                      <td></td>\n" +
            "                    </tr>\n" +
            "                  </table>\n" +
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
