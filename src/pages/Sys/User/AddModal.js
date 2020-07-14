import React from "react";
import {
  Modal,
  Form,
  Input,
  // Button,
  // Radio,
  // Select,
  // Cascader,
  // DatePicker,
  // InputNumber,
  // TreeSelect,
  Switch,
} from "antd";
export default function (props) {
  const { visible, handleOk, handleCancel } = props;

  // const [componentSize, setComponentSize] = useState("default");
  // const onFormLayoutChange = (ppp) => {
  //   setComponentSize(ppp.size);
  //   console.log(ppp);
  // };
  return (
    <Modal
      title="新增"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // initialValues={{ size: componentSize }}
        // onValuesChange={onFormLayoutChange}
        // size="default"
      >
        <Form.Item label="登录帐号" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="登录密码" name="password">
          <Input />
        </Form.Item>
        <Form.Item label="手机号码">
          <Input />
        </Form.Item>
        <Form.Item label="用户称呼">
          <Input />
        </Form.Item>
        <Form.Item label="是否启用">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
