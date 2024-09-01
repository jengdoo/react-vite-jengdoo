import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  message,
  notification,
} from "antd";
import "../components/layout/login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../service/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
const LoginPage = () => {
  const [form] = Form.useForm();
  const [loadLogin, setLoadLogin] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinishLogin = async (values) => {
    setLoadLogin(true);
    const res = await loginUserApi(values.email, values.password);
    if (res.data) {
      message.success("Login successful");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Error login",
        description: JSON.stringify(res.message),
      });
    }
    setLoadLogin(false);
  };
  const enter = (event) => {
    // console.log(">>>> event:", event.key);
    if (event.key === "Enter") form.submit();
  };
  return (
    <>
      <div className="form-login">
        <div className="login-login">
          <h2
            className="title-login"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            Login
          </h2>
          <Form
            form={form}
            className="login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishLogin}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
                {
                  required: false,
                  type: "email",
                  message: "Email not valid!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                onKeyDown={(event) => {
                  enter(event);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                loading={loadLogin}
                block
                type="primary"
                onClick={() => {
                  form.submit();
                }}
              >
                Log in
              </Button>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                or <Link to="/register">Register now!</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
