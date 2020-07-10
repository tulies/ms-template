import React from "react";
import { isUrl } from "./utils";
import defaultSettings from "../configs/defaultSettings";
import Icon, { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

export const getIcon = (icon) => {
  if (!icon) {
    return null;
  }
  if (typeof iconc === "string") {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />
          )}
        />
      );
    }
    if (icon.startsWith("icon-")) {
      return <IconFont type={icon} />;
    }
    return <Icon type={icon} />;
  }
  return React.createElement(icon);
};
