import React, { FC } from "react";
import { basedButton } from "./based-button";
import { PreviewHtmlItem } from "./email-preview-html";

type TemplateButtonProps = {
  name: string;
  link: string;
};

export const TemplateButton: FC<TemplateButtonProps> = (props) => {
  return (
    <PreviewHtmlItem
      rawHtml={basedButton({
        name: props.name,
        link: `${process.env.host}${props.link}`,
      })}
    />
  );
};
