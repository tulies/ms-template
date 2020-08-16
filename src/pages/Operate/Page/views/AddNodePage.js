import React from "react";
import { Modal, Form, Input, message, InputNumber } from "antd";
import { useStore } from "@/store/uses";
export default function (props) {
  const { visible, handleOk, handleClose, newLeaf, parentNode } = props;
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
    const key = "AddNodePageHandleOk";
    message.loading({ content: "正在处理中...", key });
    localStore.Operate.createOperateNode({
      payload: { ...values },
    }).then((res) => {
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
      title={newLeaf ? "新建页面" : "新建节点"}
      visible={visible}
      onOk={onSubmit}
      onCancel={handleClose}
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
          label="父节点ID"
          name="parentNid"
          initialValue={parentNode.nid}
          hidden={true}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="是否叶子"
          name="leaf"
          initialValue={newLeaf}
          hidden={true}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: "请输入名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="排序序号"
          name="orderNo"
          hasFeedback
          initialValue="100"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
