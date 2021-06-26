import { emailBodyFormats } from "./email-body-formats";

import { renderToString } from "react-dom/server";

export const emailTemplate = (title: string, _body: JSX.Element): string => {
  const html = emailBodyFormats(renderToString(_body));

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="telephone=no" name="format-detection" />
        <title>Keenbites</title>
        <!--[if (mso 16)]>
          <style type="text/css">
            a {
              text-decoration: none;
            }
          </style>
        <![endif]-->
        <!--[if gte mso 9
          ]><style>
            sup {
              font-size: 100% !important;
            }
          </style><!
        [endif]-->
        <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
        <!--[if !mso]><!-- -->
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i"
          rel="stylesheet"
        />
        <!--<![endif]-->
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
          }
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
          .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
          }
          [data-ogsb] .es-button {
            border-width: 0 !important;
            padding: 10px 20px 10px 20px !important;
          }
          [data-ogsb] .es-button.es-button-1 {
            padding: 10px 20px !important;
          }
          @media only screen and (max-width: 600px) {
            p,
            ul li,
            ol li,
            a {
              line-height: 150% !important;
            }
            h1 {
              font-size: 30px !important;
              text-align: center;
              line-height: 120% !important;
            }
            h2 {
              font-size: 26px !important;
              text-align: center;
              line-height: 120% !important;
            }
            h3 {
              font-size: 20px !important;
              text-align: center;
              line-height: 120% !important;
            }
            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
              font-size: 30px !important;
            }
            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
              font-size: 26px !important;
            }
            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
              font-size: 20px !important;
            }
            .es-menu td a {
              font-size: 16px !important;
            }
            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
              font-size: 16px !important;
            }
            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
              font-size: 16px !important;
            }
            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
              font-size: 16px !important;
            }
            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
              font-size: 12px !important;
            }
            *[class="gmail-fix"] {
              display: none !important;
            }
            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
              text-align: center !important;
            }
            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
              text-align: right !important;
            }
            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
              text-align: left !important;
            }
            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
              display: inline !important;
            }
            .es-button-border {
              display: block !important;
            }
            a.es-button,
            button.es-button {
              font-size: 20px !important;
              display: block !important;
              border-width: 10px 0px 10px 0px !important;
            }
            .es-adaptive table,
            .es-left,
            .es-right {
              width: 100% !important;
            }
            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
              width: 100% !important;
              max-width: 600px !important;
            }
            .es-adapt-td {
              display: block !important;
              width: 100% !important;
            }
            .adapt-img {
              width: 100% !important;
              height: auto !important;
            }
            .es-m-p0 {
              padding: 0px !important;
            }
            .es-m-p0r {
              padding-right: 0px !important;
            }
            .es-m-p0l {
              padding-left: 0px !important;
            }
            .es-m-p0t {
              padding-top: 0px !important;
            }
            .es-m-p0b {
              padding-bottom: 0 !important;
            }
            .es-m-p20b {
              padding-bottom: 20px !important;
            }
            .es-mobile-hidden,
            .es-hidden {
              display: none !important;
            }
            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
              width: auto !important;
              overflow: visible !important;
              float: none !important;
              max-height: inherit !important;
              line-height: inherit !important;
            }
            tr.es-desk-hidden {
              display: table-row !important;
            }
            table.es-desk-hidden {
              display: table !important;
            }
            td.es-desk-menu-hidden {
              display: table-cell !important;
            }
            .es-menu td {
              width: 1% !important;
            }
            table.es-table-not-adapt,
            .esd-block-html table {
              width: auto !important;
            }
            table.es-social {
              display: inline-block !important;
            }
            table.es-social td {
              display: inline-block !important;
            }
          }
        </style>
      </head>
      <body
        style="
          width: 100%;
          font-family: arial, 'helvetica neue', helvetica, sans-serif;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          padding: 0;
          margin: 0;
        "
      >
        <div class="es-wrapper-color" style="background-color: #f6f6f6">
          <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#f6f6f6"></v:fill>
            </v:background>
          <![endif]-->
          <table
            class="es-wrapper"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              background-repeat: repeat;
              background-position: center top;
            "
          >
            <tr>
              <td valign="top" style="padding: 0; margin: 0">
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
                >
                  <tr>
                    <td
                      align="center"
                      bgcolor="#f7f9fc"
                      style="padding: 0; margin: 0; background-color: #f7f9fc"
                    >
                      <table
                        class="es-content-body"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 600px;
                        "
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                      >
                        <tr class="es-mobile-hidden">
                          <td align="left" style="padding: 5px; margin: 0">
                            <!--[if mso]><table style="width:590px" cellpadding="0" cellspacing="0"><tr><td style="width:371px" valign="top"><![endif]-->
                            <table
                              class="es-left"
                              cellspacing="0"
                              cellpadding="0"
                              align="left"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                float: left;
                              "
                            >
                              <tr>
                                <td
                                  class="es-m-p0r es-m-p20b"
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 371px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        class="es-infoblock es-m-txt-c"
                                        align="left"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          line-height: 14px;
                                          font-size: 12px;
                                          color: #cccccc;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 14px;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                        >
                                          <br />
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td><td style="width:20px"></td><td style="width:199px" valign="top"><![endif]-->
                            <table
                              cellspacing="0"
                              cellpadding="0"
                              align="right"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="left"
                                  style="padding: 0; margin: 0; width: 199px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        class="es-infoblock es-m-txt-c"
                                        align="right"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          line-height: 14px;
                                          font-size: 12px;
                                          color: #cccccc;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 14px;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                        >
                                          <br />
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        class="es-infoblock es-m-txt-c"
                                        align="right"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          line-height: 14px;
                                          font-size: 12px;
                                          color: #cccccc;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 14px;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                        >
                                          <br />
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="padding: 0; margin: 0">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="padding-top: 10px; margin: 0; width: 600px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <!--[if !mso]><!-- -->
                                    <tr
                                      class="es-desk-hidden"
                                      style="
                                        display: none;
                                        float: left;
                                        overflow: hidden;
                                        width: 0;
                                        max-height: 0;
                                        line-height: 0;
                                        mso-hide: all;
                                      "
                                    >
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          font-size: 0px;
                                        "
                                      >
                                        <img
                                          class="adapt-img"
                                          src="https://keenbites-medias.s3.ap-southeast-1.amazonaws.com/netinger-7a043a52-539b-4642-a465-03cb7beedf4f-email-logo.png"
                                          alt
                                          style="
                                            display: block;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                            border-top-left-radius: 15px;
                                            border-top-right-radius: 15px;
                                          "
                                          width="600"
                                        />
                                      </td>
                                    </tr>
                                    <!--<![endif]-->
                                    <tr class="es-mobile-hidden">
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          font-size: 0px;
                                        "
                                      >
                                        <img
                                          class="adapt-img"
                                          src="https://keenbites-medias.s3.ap-southeast-1.amazonaws.com/netinger-c2d58dc1-eac5-49cc-99bf-8c71af386246-email-logo-lg.png"
                                          alt
                                          style="
                                            display: block;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                            border-top-left-radius: 15px;
                                            border-top-right-radius: 15px;
                                          "
                                          width="600"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
                >
                  <tr>
                    <td
                      align="center"
                      bgcolor="#f7f9fc"
                      style="padding: 0; margin: 0; background-color: #f7f9fc"
                    >
                      <table
                        class="es-content-body"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #ffffff;
                          width: 600px;
                          border-bottom-left-radius: 15px;
                          border-bottom-right-radius: 15px;
                        "
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 20px;
                              padding-bottom: 20px;
                              padding-left: 20px;
                              padding-right: 20px;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 560px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 0; margin: 0"
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 27px;
                                            color: #32325d;
                                            font-size: 18px;
                                          "
                                        >
                                          <strong
                                            >${title}</strong
                                          >
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="left"
                                        style="
                                          margin: 0;
                                          padding-left: 10px;
                                          padding-right: 10px;
                                          padding-bottom: 5px;
                                          padding-top: 20px;
                                        "
                                      >
                                        ${html}
                                      </td>
                                    </tr>                                   
                                    <!--<![endif]-->
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-footer"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                    background-color: transparent;
                    background-repeat: repeat;
                    background-position: center top;
                  "
                >
                  <tr>
                    <td
                      align="center"
                      bgcolor="#f7f9fc"
                      style="padding: 0; margin: 0; background-color: #f7f9fc"
                    >
                      <table
                        class="es-footer-body"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 600px;
                        "
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 20px;
                              padding-bottom: 20px;
                              padding-left: 20px;
                              padding-right: 20px;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 560px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 0; margin: 0"
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 21px;
                                            color: #5b6885;
                                            font-size: 14px;
                                          "
                                        >
                                          In case of questions, please write to
                                          <a
                                            href="mailto:hello@keenbites.com"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #1376c8;
                                              font-size: 14px;
                                              font-family: 'open sans',
                                                'helvetica neue', helvetica, arial,
                                                sans-serif;
                                            "
                                            >hello@keenbites.com</a
                                          >
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-top: 10px;
                                          padding-bottom: 10px;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: 'open sans',
                                              'helvetica neue', helvetica, arial,
                                              sans-serif;
                                            line-height: 21px;
                                            color: #5b6885;
                                            font-size: 14px;
                                          "
                                        >
                                          © 2021&nbsp;Keenbites
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  class="es-content"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
                >
                  <tr>
                    <td
                      align="center"
                      bgcolor="#f7f9fc"
                      style="padding: 0; margin: 0; background-color: #f7f9fc"
                    >
                      <table
                        class="es-content-body"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 600px;
                        "
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              padding: 0;
                              margin: 0;
                              padding-left: 20px;
                              padding-right: 20px;
                              padding-bottom: 30px;
                            "
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  valign="top"
                                  align="center"
                                  style="padding: 0; margin: 0; width: 560px"
                                >
                                  <table
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding: 0; margin: 0; display: none"
                                      ></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>`;
};
