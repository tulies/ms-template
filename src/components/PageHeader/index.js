import React from "react";
import styles from "./index.module.less";
import BreadcrumbView from "./breadcrumb";

const PageHeader = (props) => {
  console.log("PageHeader", props);
  const { title, content, hiddenBreadcrumb = false } = props;
  return (
    <div className={styles.pageHeader}>
      {hiddenBreadcrumb ? null : (
        <div className={styles.breadcrumb}>
          <BreadcrumbView {...props} />
        </div>
      )}
      {title && (
        <div className={styles.heading}>
          <div className={styles.headingLeft}>
            <span className={styles.headingTitle}>{title}</span>
          </div>
        </div>
      )}
      {content && <div className="headingContent">{content}</div>}
    </div>
  );
};
export default PageHeader;
