import React from "react";
import styles from "./index.module.less";

const PageContent = ({ children, ...restProps }) => (
  <div className={styles.pageContent}>
    {children ? <div>{children}</div> : null}
  </div>
);
export default PageContent;
