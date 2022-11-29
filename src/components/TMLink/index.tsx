import React from "react";
import { Link, LinkProps } from "react-router-dom";

const TMLink = (props: LinkProps) => <Link {...props}>{props.children}</Link>;

export default TMLink;
