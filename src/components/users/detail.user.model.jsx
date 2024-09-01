import { Button, Drawer, notification } from "antd";
import { Input } from "antd";
import { useState } from "react";
import {
  handleUpdateLoadFile,
  updateUserAvatarApi,
} from "../../service/api.service";
const DetailUser = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { openDetail, setOpenDetail, dataDetail, setDataDetail, loadUser } =
    props;
  const restDetailModelClose = () => {
    setOpenDetail(false), setDataDetail(null);
  };
  const handleUploadFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  // console.log(">>> check file,", preview);
  const handleUpdateAvatar = async () => {
    const resUpload = await handleUpdateLoadFile(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      // console.log(">>> check new avatar:", newAvatar);
      const resUpdateAvatar = await updateUserAvatarApi(
        newAvatar,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone
      );
      if (resUpdateAvatar.data) {
        setOpenDetail(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser();
        notification.success({
          message: "Update user avatar",
          description: "Update user avatar successful",
        });
      } else {
        notification.error({
          message: "Error update user avatar",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
    } else {
      notification.error({
        message: "Upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
    // console.log("check resUpload:", resUpload);
  };
  return (
    <>
      <Drawer
        width={"40vw"}
        title="Detail user"
        onClose={restDetailModelClose}
        open={openDetail}
      >
        {dataDetail ? (
          <div
            style={{ display: "flex", gap: "15px", flexDirection: "column" }}
          >
            <div>
              <span>Id:</span>
              <Input value={dataDetail._id} readOnly="true" />
            </div>
            <div>
              <span>Full name:</span>
              <Input value={dataDetail.fullName} readOnly="true" />
            </div>
            <div>
              <span>Email:</span>
              <Input value={dataDetail.email} readOnly="true" />
            </div>
            <div>
              <span>Phone number:</span>
              <Input value={dataDetail.phone} readOnly="true" />
            </div>
            <div>Avatar:</div>
            <div
              style={{
                margin: "0 auto",
                width: "200px",
                height: "250px",
                border: "1px solid #ddd",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                  dataDetail.avatar
                }`}
              />
            </div>
            <div>
              <label htmlFor="btnUpload">Upload file</label>
              <input
                type="file"
                hidden
                id="btnUpload"
                // onChange={handleUploadFile}
                onChange={(event) => handleUploadFile(event)}
              ></input>
            </div>
            {preview && (
              <>
                <div
                  style={{
                    margin: "0 auto",
                    width: "200px",
                    height: "250px",
                    border: "1px solid #ddd",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={preview}
                  />
                </div>
                <Button type="primary" onClick={handleUpdateAvatar}>
                  Save
                </Button>
              </>
            )}
          </div>
        ) : (
          <>
            <p>Not data</p>
          </>
        )}
      </Drawer>
    </>
  );
};
export default DetailUser;
