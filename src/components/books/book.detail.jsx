import { Drawer } from "antd";

const BookDetail = (props) => {
  const {
    openDetailTable,
    loadingTable,
    setOpenDetailTable,
    dataBookDetail,
    setSelectedKeys,
  } = props;
  return (
    <>
      {dataBookDetail ? (
        <Drawer
          closable
          destroyOnClose
          title={<p>Detail books</p>}
          placement="right"
          open={openDetailTable}
          loading={loadingTable}
          onClose={() => {
            setOpenDetailTable(false),
              dataBookDetail(null),
              setSelectedKeys([]);
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <p>ID: {dataBookDetail._id}</p>
            <p>Title: {dataBookDetail.mainText}</p>
            <p>Author: {dataBookDetail.author}</p>
            <p>Category: {dataBookDetail.category}</p>
            <p>
              Price:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataBookDetail.price)}
            </p>
            <p>Quantity: {dataBookDetail.quantity}</p>
            <p>Sold: {dataBookDetail.sold}</p>
            <p>Thumbnail: </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "150px",
                  border: "1px solid #ddd",
                }}
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    dataBookDetail.thumbnail
                  }`}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </Drawer>
      ) : (
        <div>Not data</div>
      )}
    </>
  );
};
export default BookDetail;
