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
  const [form] = Form.useForm();
  console.log(form);
  const onSubmit = (res) => {
    console.log(res);
    form.submit();
    handleOk(res);
  };
  const onValuesChange = (res) => {
    console.log(res);
  };
  return (
    <Modal
      title="新增"
      visible={visible}
      onOk={onSubmit}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // initialValues={{ size: componentSize }}
        onValuesChange={onValuesChange}
        // size="default"
        onFinish={(values) => {
          console.log("onFinish", values);
        }}
      >
        <Form.Item label="登录帐号" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="登录密码" name="password" hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item label="用户称呼" name="alais">
          <Input />
        </Form.Item>
        <Form.Item label="是否启用" name="status" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
}
