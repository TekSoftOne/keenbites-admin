import React, { FC } from "react";
import { colorBlue } from "../../../../constants";

type TemplateLinkProps = {
  name: string;
  link: string;
};
export const TemplateLink: FC<TemplateLinkProps> = (props) => {
  return (
    <a style={{ color: colorBlue }} href={`${process.env.host}${props.link}`}>
      <b>{props.name}</b>
    </a>
  );
};
