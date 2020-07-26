/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import md5 from "md5";
import styles from "./index.module.less";
import { useStore } from "@/store/uses";
const Login = (props) => {
  const { history } = props;
  const localStore = useStore();
  const [loginLoading, setLoginLoading] = useState(false);
  const handleLoginSunmit = (values) => {
    setLoginLoading(true);
    localStore.User.login({
      payload: { ...values, password: md5(values.password) },
    }).then((res) => {
      setLoginLoading(false);
      console.log(res);
      if (res.code === 0) {
        message.success("登录成功");
        history.push("/");
      } else {
        message.error(res.msg || "登录失败，请重试！");
      }
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

          <a className={styles.loginFormForgot}>忘记密码</a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loginLoading}
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
