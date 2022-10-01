import React from "react";
import {sassClasses} from "@utils";
import styles from "./ChatCenterBackground.module.scss";

const cl = sassClasses(styles);

export const ChatCenterBackground = () => {
  return (
    <div className={cl("ChatCenterBackground")}>
      <div className={cl("bg")} />
    </div>
  );
};
