import {ReactElement} from "react";
import {Appbar} from "./Appbar/Appbar";
import styles from "./AppPageWithAppbarLayout.module.scss";

export const AppPageWithAppbarLayout = (page: ReactElement) => {
  return (
    <div className={styles.root}>
      <Appbar />
      <div className={styles.app}>{page}</div>
    </div>
  );
};
