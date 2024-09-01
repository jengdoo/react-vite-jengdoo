import { useEffect, useState } from "react";
import BookTable from "../components/books/book.table";
import { pageDataBook } from "../service/api.service";
import CreateBook from "../components/books/book.create";

const BookPage = () => {
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    loadBook();
  }, [current, pageSize]);
  const loadBook = async () => {
    const res = await pageDataBook(current, pageSize);
    // console.log(">>>> check res:", res.data);
    if (res.data) {
      setDataBook(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotalPage(res.data.meta.total);
    }
  };
  return (
    <>
      <CreateBook loadBook={loadBook} dataBook={dataBook} />
      <BookTable
        dataBook={dataBook}
        loadBook={loadBook}
        current={current}
        pageSize={pageSize}
        totalPage={totalPage}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </>
  );
};
export default BookPage;
