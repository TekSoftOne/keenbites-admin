export const emailBodyFormats = (content: string) => {
  return `<div
    style="
      margin: 0;
      -webkit-text-size-adjust: none;
      -ms-text-size-adjust: none;
      mso-line-height-rule: exactly;
      font-family: arial, 'helvetica neue',
        helvetica, sans-serif;
      line-height: 30px;
      color: #32325d;
      font-size: 16px;
    "
  >
    ${content}
  </div>`;
};
