import React from "react";
import clsx from "clsx";
import { Icon as IconifyIcon } from "@iconify/react";
import classes from "@/Icon.module.css";

interface IconProps {
  type: string;
  className?: string;
}

const Icon = ({ type, className, ...rest }: IconProps) => {
  switch (type) {
    case "Person": {
      return (
        <IconifyIcon
          className={clsx(classes.root, className)}
          icon="ion:person"
          {...rest}
        />
      );
    }
    case "Mail": {
      return (
        <IconifyIcon
          className={clsx(classes.root, className)}
          icon="ion:mail"
          {...rest}
        />
      );
    }
    case "List": {
      return (
        <IconifyIcon
          className={clsx(classes.root, className)}
          icon="ion:list"
          {...rest}
        />
      );
    }
    case "Document": {
      return (
        <IconifyIcon
          className={clsx(classes.root, className)}
          icon="ion:document"
          {...rest}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default Icon;
