import React from "react";
import { Form, Input, message, Switch, Drawer, Button } from "antd";
import { useStore } from "@/store/uses";
export default function (props) {
  const { visible, handleOk, handleCancel, row } = props;
  console.log("row", row, row.id);
  const localStore = useStore();
  console.log(localStore);
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
  };
  const onValuesChange = (res) => {
    console.log(res);
  };
  const handleSubmitFinish = (values) => {
    const key = "addModalHandleOk";
    message.loading({ content: "正在处理中...", key });
    localStore.User.createUser({ payload: values }).then((res) => {
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
    <Drawer
      title="详情编辑"
      width={520}
      onClose={handleCancel}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleCancel} type="primary">
            Submit
          </Button>
        </div>
      }
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
        <Form.Item label="ID" name="id" initialValue={row.id}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="UID" name="uid" initialValue={row.uid}>
          <Input disabled />
        </Form.Item>
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
          label="创建时间"
          name="createTime"
          initialValue={row.createTime}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="更新时间"
          name="updateTime"
          initialValue={row.updateTime}
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
