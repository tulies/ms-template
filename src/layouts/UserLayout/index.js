import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import routes from "@/router/routes";
import logo from "@/assets/logo.svg";
import styles from "./index.module.less";

export default (props) => {
  const { location, children } = props;
  const branch = matchRoutes(routes, location.pathname);
  const pageInfo = branch[branch.length - 1];
  const pageTitle =
    (pageInfo.route.meta && pageInfo.route.meta.title) || pageInfo.route.name;
  const pageDesc =
    (pageInfo.route.meta &&
      (pageInfo.route.meta.description || pageInfo.route.meta.title)) ||
    pageInfo.route.name;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Tulies's Ms Template</span>
              </Link>
            </div>
            <div className={styles.desc}>
              使用 react+mobx+antd 搭建的后台管理系统界面模板
            </div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};
