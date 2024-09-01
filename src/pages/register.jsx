import { Button, Col, Form, Input, notification, Row } from "antd";
import { registerUserApi } from "../service/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (value) => {
    const res = await registerUserApi(
      value.fullName,
      value.email,
      value.password,
      value.phone
    );
    if (res.data) {
      notification.success({
        message: "Register",
        description: "Register successful",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Error register",
        description: JSON.stringify(res.message),
      });
    }
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Register</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Full name"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Full name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Pass word"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Phone number"
                name="phone"
                rules={[
                  {
                    // required: true,
                    pattern: new RegExp(/\d+/g),
                    message: "Wrong format!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Col xs={24} md={8}>
              <Button
                onClick={() => {
                  form.submit();
                }}
                type="primary"
              >
                Register
              </Button>
            </Col>
          </div>
        </Row>
      </Form>
    </>
  );
};
export default RegisterPage;
