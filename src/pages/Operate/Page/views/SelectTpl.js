import React from "react";
import { Modal, Card, Row, Col } from "antd";
import {
  CaretRightOutlined,
  // FileSearchOutlined,
} from "@ant-design/icons";
export default () => {
  return (
    <Modal title="绑定数据模版选择" visible={true} footer={null} width={600}>
      <Row>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <Card
            hoverable
            style={{ width: 170 }}
            actions={[
              <span>
                进入
                <CaretRightOutlined />
              </span>,
            ]}
          >
            <Card.Meta
              title="新建数据模板"
              description="直接新建全新模版进行绑定"
            />
          </Card>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <Card
            hoverable
            style={{ width: 170 }}
            actions={[
              <span>
                进入
                <CaretRightOutlined />
              </span>,
            ]}
          >
            <Card.Meta
              title="从模版库中挑选"
              description="从现有模版库中选择模版绑定"
            />
          </Card>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <Card
            hoverable
            style={{ width: 170, background: "#f1f1f1", opacity: 0.5 }}
            actions={[
              <span>
                进入（暂未开放）
                <CaretRightOutlined />
              </span>,
            ]}
          >
            <Card.Meta
              title="反向生成模版"
              description="根据json数据，生成数据模板"
            />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};
