import React from "react";
import styles from "./index.module.less";

const PageWrapper = ({ children, ...restProps }) => (
  <div className={styles.pageWrapper}>
    {children ? <div>{children}</div> : null}
  </div>
);
export default PageWrapper;
