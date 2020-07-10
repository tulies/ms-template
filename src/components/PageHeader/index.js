import React from "react";
import styles from "./index.module.less";
import BreadcrumbView from "./breadcrumb";

const PageHeader = (props) => {
  console.log("PageHeader", props);
  const {
    title,
    logo,
    action,
    content,
    extraContent,
    hiddenBreadcrumb = false,
  } = props;
  return (
    <div className={styles.pageHeader}>
      {hiddenBreadcrumb ? null : <BreadcrumbView {...props} />}
      <div className={styles.detail}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <div className={styles.main}>
          <div className={styles.row}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {action && <div className={styles.action}>{action}</div>}
          </div>
          <div className={styles.row}>
            {content && <div className={styles.content}>{content}</div>}
            {extraContent && (
              <div className={styles.extraContent}>{extraContent}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageHeader;
