import React from "react";
import { Card, Alert, Typography } from "antd";

import PageWrapper from "@/components/PageWrapper";
// import PageHeader from "@/components/PageHeader";
import PageContent from "@/components/PageWrapper/Content";

// const CodePreview = ({ children }) => (
//   <pre className={styles.pre}>
//     <code>
//       <Typography.Text copyable>{children}</Typography.Text>
//     </code>
//   </pre>
// );
const { Title, Paragraph } = Typography;

export default (props) => (
  <PageWrapper>
    <PageContent {...props}>
      <Card>
        <Alert
          message="本系统前端使用react+mobx+hooks+antd开发，不过没有使用typescript。完全按照自己的想法在搞，一边学习一边摸索。"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Title level={3}>开发计划 </Title>
        <Paragraph>
          <ul>
            <li>自动生成表单集成</li>
            <li>markdown编辑器集成</li>
            <li>列设置功能开发</li>
          </ul>
        </Paragraph>
      </Card>
    </PageContent>
  </PageWrapper>
);
