import React, {PropsWithChildren} from "react";
import {sassClasses} from "@utils";
import styles from "./VerticalScrollableView.module.scss";

const cl = sassClasses(styles);

export type VerticalScrollableViewProps = {
  hidden?: boolean;
};

export const VerticalScrollableView: React.FC<
  PropsWithChildren<VerticalScrollableViewProps>
> = ({children, hidden}) => {
  return (
    <div className={cl(["VerticalScrollableView", hidden ? "hidden" : ""])}>
      {children}
    </div>
  );
};
