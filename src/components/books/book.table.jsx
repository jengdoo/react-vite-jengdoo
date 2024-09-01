import { DeleteOutlined, EditFilled, FormOutlined } from "@ant-design/icons";
import { Button, notification, Table } from "antd";
import { useState } from "react";
import BookDetail from "./book.detail";
import { render } from "react-dom";
const BookTable = (props) => {
  const { dataBook, current, pageSize, totalPage, setCurrent, setPageSize } =
    props;
  // console.log(">>>> check props book:", props);
  const [openDetailTable, setOpenDetailTable] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedKeys] = useState([]);
  const [dataBookDetail, setDataBookDetail] = useState(null);
  const showLoading = () => {
    if (selectedRowKeys.length > 0 && selectedRowKeys.length < 2) {
      setOpenDetailTable(true);
      setLoadingTable(true);
      setTimeout(() => {
        setLoadingTable(false);
      }, 1000);
      console.log(">>> check data book:", dataBook);
    } else {
      notification.error({
        message: "Select",
        description: "Please only select a row ",
      });
    }
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
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Title",
      dataIndex: "mainText",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => {
        if (text)
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text);
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <EditFilled
            style={{ color: "black", cursor: "pointer" }}
            onClick={() => {
              showLoading();
              setDataBookDetail(record);
            }}
          />
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          <FormOutlined style={{ color: "yellow", cursor: "pointer" }} />
        </div>
      ),
    },
  ];
  const onChange = (
    pagination
    // , filters, sorter, extra
  ) => {
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
  };

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedKeys([]);
      setLoading(false);
      // console.log(">>>> check selected", selectedRowKeys);
      // console.log(">>> check loading", loading);
    }, 1000);
  };
  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <div style={{ margin: "28px" }}>
        <Button
          type="primary"
          onClick={() => {
            start();
          }}
          disabled={!hasSelected}
          loading={loading}
        >
          Not select
        </Button>
        <div>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataBook}
          rowKey={"_id"}
          pagination={{
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            total: totalPage,
            showTotal: (total, range) => {
              return (
                <div>
                  {range[0]}-{range[1]} trên {total} rows
                </div>
              );
            },
          }}
          onChange={onChange}
        />
        <BookDetail
          openDetailTable={openDetailTable}
          loadingTable={loadingTable}
          setOpenDetailTable={setOpenDetailTable}
          dataBookDetail={dataBookDetail}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </>
  );
};
export default BookTable;
