import { Table, message, Popconfirm, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUser from "./update.user.modal";
import { useState } from "react";
import DetailUser from "./detail.user.model";
import { deleteUserApi } from "../../service/api.service";
const UserTable = (props) => {
  const {
    dataUser,
    loadUser,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const confirm = async (id) => {
    const res = await deleteUserApi(id);
    // console.log(">>> check res delete:", res);
    if (res.data) {
      notification.success({
        message: "deleted ",
        description: "deleted successfully",
      });
      await loadUser();
    } else {
      notification.error({
        message: "Error delete user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const cancel = () => {
    message.error("Cancel");
  };
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        // console.log(">>>> index:", pageSize);
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataDetail(record);
              setOpenDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Full name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const onChangeBook = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
    // console.log("check :", { pagination, filters, sorter, extra });
  };
  return (
    <>
      <div style={{ margin: "10px 20px" }}>
        <Table
          columns={columns}
          dataSource={dataUser}
          rowKey={"_id"}
          pagination={{
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            total: total,
            showTotal: (total, range) => {
              return (
                <div>
                  {range[0]}-{range[1]} trên {total} rows
                </div>
              );
            },
          }}
          onChange={onChangeBook}
        />
      </div>
      <UpdateUser
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <DetailUser
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        setDataDetail={setDataDetail}
        dataDetail={dataDetail}
        loadUser={loadUser}
      />
    </>
  );
};
export default UserTable;
