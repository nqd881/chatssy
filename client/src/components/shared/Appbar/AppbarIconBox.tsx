import {PropsWithChildren} from "react";
import {buildSassClassName} from "@utils/buildClassName";
import styles from "./Appbar.module.scss";

interface AppbarIconBoxProps {
  active?: boolean;
}

export const AppbarIconBox: React.FC<PropsWithChildren<AppbarIconBoxProps>> = ({
  children,
  active,
}) => {
  return (
    <div className={styles.AppbarIconBox}>
      <div className={styles["wrap-child"]}>
        {children}
        <div
          className={buildSassClassName(styles, [
            "marker",
            active ? "active" : "disable",
          ])}
        />
      </div>
    </div>
  );
};
