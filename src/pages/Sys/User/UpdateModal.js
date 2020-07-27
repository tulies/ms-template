import React from "react";
import { Form, Input, message, Switch, Drawer, Button, Divider } from "antd";
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
  const onSubmit = () => {
    form.submit();
  };
  const onValuesChange = (res) => {
    console.log(res);
  };
  const handleSubmitFinish = (values) => {
    // console.log(values);
    // return;
    const key = "updateModalHandleOk";
    message.loading({ content: "正在处理中...", key });
    localStore.User.updateUser({ payload: values }).then((res) => {
      console.log(res);
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
          <Button onClick={onSubmit} type="primary">
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
        <Form.Item label="用户ID">
          <Input disabled value={row.uid} />
        </Form.Item>
        <Form.Item
          label="登录帐号"
          name="username"
          initialValue={row.username}
          rules={[{ required: true, message: "请输入登录帐号!" }]}
        >
          <Input placeholder="请输入登录帐号" />
        </Form.Item>
        <Form.Item
          label="用户昵称"
          name="alias"
          initialValue={row.alias}
          rules={[{ required: true, message: "请输入用户称呼/昵称!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="创建时间">
          <Input disabled value={row.createTime} />
        </Form.Item>
        <Form.Item label="更新时间">
          <Input disabled value={row.updateTime} />
        </Form.Item>
        <Divider orientation="center" plain>
          更多操作
        </Divider>
        <Form.Item
          label="是否启用"
          valuePropName="checked"
          initialValue={row.status === 1}
        >
          <Switch checkedChildren="启用" unCheckedChildren="停用" />
        </Form.Item>
        <Form.Item label="其他操作">
          <Button type="primary">重置密码</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
