import {NextPage} from "next";
import React, {ReactElement} from "react";
import {sassClasses} from "@utils";
import styles from "./AuthPage.module.scss";

const cl = sassClasses(styles);

interface AuthPageProps {
  title: string;
  content: ReactElement;
}

export const AuthPage: NextPage<AuthPageProps> = ({title, content}) => {
  return (
    <div className={cl("AuthPage")}>
      <div className={cl("box")}>
        <div className={cl("logo")}>Chatssy</div>
        <div className={cl("title")}>{title}</div>
        <div className={cl("content")}>{content}</div>
      </div>
    </div>
  );
};
