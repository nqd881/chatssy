import {sassClasses} from "@utils";
import styles from "./LeftHeader.module.scss";

const cl = sassClasses(styles);

export const LeftHeader = () => {
  return (
    <div className={cl("LeftHeader")}>
      <div className={cl("title")}>Messages</div>
    </div>
  );
};
