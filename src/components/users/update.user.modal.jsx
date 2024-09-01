import { Button, Input, message, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateUserApi } from "../../service/api.service";
const UpdateUser = (props) => {
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;
  useEffect(() => {
    // console.log(">>> check dataUpdate props:", dataUpdate);
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);
  const updateUser = async () => {
    const res = await updateUserApi(id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "update user",
        description: "update user to success",
      });
      resetCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(res.message),
      });
    }
    // console.log(">>> check result:", res.data);
    setIsModalUpdateOpen(false);
  };
  const resetCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhone("");
    setDataUpdate(null);
  };

  return (
    <>
      <Modal
        title="Update User"
        open={isModalUpdateOpen}
        onOk={() => {
          updateUser();
        }}
        onCancel={() => {
          resetCloseModal();
        }}
        maskClosable={false}
        okText="Save"
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Id:</span>
            <Input value={id} disabled="true" />
          </div>
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
            <span>Phone number:</span>
            <Input
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UpdateUser;
