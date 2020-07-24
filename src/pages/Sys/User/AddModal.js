import React from "react";
import { Modal, Form, Input, message, Switch } from "antd";
import { useStore } from "@/store/uses";
import md5 from "md5";
export default function (props) {
  const { visible, handleOk, handleCancel } = props;
  const localStore = useStore();
  console.log(localStore);
  // const [componentSize, setComponentSize] = useState("default");
  // const onFormLayoutChange = (ppp) => {
  //   setComponentSize(ppp.size);
  //   console.log(ppp);
  // };
  const [form] = Form.useForm();
  const onSubmit = (res) => {
    console.log(res);
    form.submit();
  };
  const onValuesChange = (res) => {
    console.log(res);
  };
  const handleSubmitFinish = (values) => {
    const key = "addModalHandleOk";
    message.loading({ content: "正在处理中...", key });
    localStore.User.createUser({
      payload: { ...values, password: md5(values.password) },
    }).then((res) => {
      console.log(1111);
      if (res.code === 0) {
        message.success({ content: "处理成功！", key, duration: 2 });
        handleOk(values);
      } else {
        message.error({
          content: res.msg || "系统出错了，请稍后再试",
          // className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      }
    });
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
        onFinish={handleSubmitFinish}
      >
        <Form.Item
          label="登录帐号"
          name="username"
          rules={[{ required: true, message: "请输入登录帐号!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="登录密码"
          name="password"
          hasFeedback
          rules={[{ required: true, message: "请输入登录密码!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="用户称呼"
          name="alias"
          rules={[{ required: true, message: "请输入用户称呼/昵称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="是否启用"
          name="status"
          valuePropName="checked"
          initialValue={0}
          normalize={(value) => (value ? 1 : 0)}
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
