import { Button, Input, message, notification, Modal } from "antd";
import { useState } from "react";
import { createdUserApi } from "../../service/api.service";
// import { json } from "react-router-dom";

const UserForm = (props) => {
  const { loadUser } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setISModelOpen] = useState(false);
  const createdUser = async () => {
    const res = createdUserApi(fullName, email, passWord, phoneNumber);
    // console.log("check res:", res);
    if ((await res).data) {
      notification.success({
        message: "created user",
        description: "created user to success",
      });
      resetCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify((await res).message),
      });
    }
    // console.log(">>> check result:", (await res).data);
    setISModelOpen(false);
  };
  const resetCloseModal = () => {
    setISModelOpen(false);
    setFullName("");
    setEmail("");
    setPassWord("");
    setPhoneNumber("");
  };
  return (
    <>
      <div className="user-form" style={{ margin: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Table Users</h3>
          <Button
            type="primary"
            onClick={() => {
              setISModelOpen(true);
            }}
          >
            Create
          </Button>
        </div>
        <Modal
          title="Crate User"
          open={isModalOpen}
          onOk={() => {
            createdUser();
          }}
          onCancel={() => {
            resetCloseModal();
          }}
          maskClosable={false}
          okText="Create"
        >
          <div
            style={{ display: "flex", gap: "15px", flexDirection: "column" }}
          >
            <div>
              <span>Full name:</span>
              <Input
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Email:</span>
              <Input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Pass word:</span>
              <Input.Password
                value={passWord}
                onChange={(event) => {
                  setPassWord(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Phone number:</span>
              <Input
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default UserForm;
