import React from "react";
import { Card, Alert, Typography } from "antd";
import styles from "./Welcome.less";

import PageWrapper from "@/components/PageWrapper";
// import PageHeader from "@/components/PageHeader";
import PageContent from "@/components/PageWrapper/Content";

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (props) => (
  <PageWrapper>
    <PageContent {...props}>
      <Card>
        <Alert
          message="更快更强的重型组件，已经发布。"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          高级表格{" "}
          <a
            href="https://protable.ant.design/"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-table</CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          高级布局{" "}
          <a
            href="https://prolayout.ant.design/"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
      </Card>
    </PageContent>
  </PageWrapper>
);
