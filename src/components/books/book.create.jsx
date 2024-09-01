import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import {
  createDataBook,
  handleUpdateLoadFile,
} from "../../service/api.service";

const CreateBook = (props) => {
  const { loadBook } = props;
  const [category, setCategory] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const [selectImage, setSelectImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const listCategory = (value) => {
    setCategory(value);
  };
  const showLoading = () => {
    setOpenCreate(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    setOpenCreate(false);
  };
  const create = async (value) => {
    const resUpload = await handleUpdateLoadFile(selectImage, "book");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      // console.log(">>> check new avatar:", newAvatar);
      const resBook = await createDataBook(
        value.mainText,
        value.author,
        value.price,
        value.quantity,
        value.category,
        newAvatar
      );
      if (resBook.data) {
        setOpenCreate(false);
        setSelectImage(null);
        setPreviewImage(null);
        await loadBook();
        notification.success({
          message: "Create",
          description: "created successfully",
        });
      } else {
        notification.error({
          message: "Error create",
          description: JSON.stringify(resBook.message),
        });
      }
    } else {
      notification.error({
        message: "Upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
  };
  const handleUpdateBook = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectImage(null);
      setPreviewImage(null);
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const onFinish = (values) => {
    create(values);
  };
  return (
    <>
      <div style={{ margin: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>List Book</h3>
          <Button type="primary" onClick={showLoading}>
            Create
          </Button>
        </div>
      </div>
      <Modal
        title={<p>Create book</p>}
        onCancel={handleCancel}
        loading={loading}
        open={openCreate}
        onOk={() => {
          form.submit();
        }}
        okText="Create"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div>
            <Form.Item
              label="Title"
              name="mainText"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please input your author!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Quantity"
              name={"quantity"}
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please input your category!",
                },
              ]}
            >
              <Select onChange={listCategory}>
                <Option value="Business">Business</Option>
                <Option value="Arts">Arts</Option>
                <Option value="Teen">Teen</Option>
                <Option value="Cooking">Cooking</Option>
                <Option value="Entertainment">Entertainment</Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Thumbnail" name="thumbnail">
              <div>
                <label htmlFor="btnUploadImage" icon={<UploadOutlined />}>
                  Click to Upload
                </label>
                <input
                  id="btnUploadImage"
                  hidden
                  type="file"
                  onChange={(event) => handleUpdateBook(event)}
                ></input>
              </div>
              {previewImage && (
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
                      src={previewImage}
                    />
                  </div>
                </>
              )}
            </Form.Item>
          </div>
        </Form>
        <div style={{ bottom: "0" }}>
          <Button type="primary" onClick={showLoading}>
            Reload
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default CreateBook;
