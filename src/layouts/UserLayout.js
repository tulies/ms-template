import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { matchRoutes } from "react-router-config";
import routes from "../router/routes";
export default (props) => {
  const { location } = props;
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
      {props.children}
    </HelmetProvider>
  );
};
