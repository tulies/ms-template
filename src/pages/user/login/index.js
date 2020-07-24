import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import md5 from "md5";
import styles from "./index.module.less";
import { useStore } from "@/store/uses";
const Login = (props) => {
  const localStore = useStore();
  //   const { userAndlogin = {}, submitting } = props;
  //   const { status, type: loginType } = userAndlogin;
  //   const [autoLogin, setAutoLogin] = useState(true);
  //   const [type, setType] = useState("account");

  //   const handleSubmit = (values) => {
  //     console.log(values);
  //     // const { dispatch } = props;
  //     // dispatch({
  //     //   type: "userAndlogin/login",
  //     //   payload: { ...values, type },
  //     // });
  //   };
  const handleLoginSunmit = (values) => {
    console.log("Received values of form: ", values);
    localStore.User.login({
      payload: { ...values, password: md5(values.password) },
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className={styles.main}>
      <Divider plain style={{ color: "#40a9ff" }}>
        帐号登录
      </Divider>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        size="large"
        onFinish={handleLoginSunmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入您的账号!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="帐号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入您的密码!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>自动登录</Checkbox>
          </Form.Item>

          <a className={styles.loginFormForgot} href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginFormButton}
          >
            登录
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
