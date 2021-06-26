import { TemplateItemButton } from "../../interfaces";

export const basedButton = (button: TemplateItemButton) => {
  return `<table width="100%"><tr class="es-mobile-hidden">
    <td
      align="center"
      style="padding: 0; margin: 0"
    >
      <span
        class="es-button-border"
        style="
          border-style: solid;
          border-color: #1a4cff;
          background: #1a4cff;
          border-width: 0px 0px 2px 0px;
          display: inline-block;
          border-radius: 40px;
          width: auto;
        "
        ><a
          href="${button.link}"
          class="es-button es-button-1"
          target="_blank"
          style="
            mso-style-priority: 100 !important;
            text-decoration: none;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
            mso-line-height-rule: exactly;
            color: #ffffff;
            font-size: 18px;
            border-style: solid;
            border-color: #1a4cff;
            border-width: 10px 20px;
            display: inline-block;
            background: #1a4cff;
            border-radius: 40px;
            font-family: arial, 'helvetica neue',
              helvetica, sans-serif;
            font-weight: normal;
            font-style: normal;
            line-height: 22px;
            width: auto;
            text-align: center;
          "
          >${button.name}</a
        ></span
      >
    </td>
  </tr></table>
  <!--[if !mso]><!-- -->
  <table><tr
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
      align="left"
      style="padding: 0; padding-right: 10px; margin: 0"
    >
      <span
        class="es-button-border"
        style="
          border-style: solid;
          border-color: #1a4cff;
          background: #1a4cff;
          border-width: 0px 0px 2px 0px;
          display: block;
          border-radius: 40px;
          width: auto;
        "
        ><a
          href=""
          class="es-button es-button-1"
          target="_blank"
          style="
            mso-style-priority: 100 !important;
            text-decoration: none;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
            mso-line-height-rule: exactly;
            color: #ffffff;
            font-size: 18px;
            border-style: solid;
            border-color: #1a4cff;
            border-width: 10px 20px;
            display: block;
            background: #1a4cff;
            border-radius: 40px;
            font-family: arial, 'helvetica neue',
              helvetica, sans-serif;
            font-weight: normal;
            font-style: normal;
            line-height: 22px;
            width: auto;
            text-align: center;
          "
          >${button.name}</a
        ></span
      >
    </td>
  </tr></table>`;
};
