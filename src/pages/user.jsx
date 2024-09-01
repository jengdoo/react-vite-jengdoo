import UserForm from "../components/users/user.form";
import UserTable from "../components/users/user.table";
import { useEffect, useState } from "react";
import { fetchAllUserApi } from "../service/api.service";
const UserPage = () => {
  const [dataUser, setDataUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  // empty array => run one time
  //not empty =>next value !== prev value
  useEffect(() => {
    loadUser();
  }, [current, pageSize]); //[] + condition
  const loadUser = async () => {
    const res = await fetchAllUserApi(current, pageSize);
    if (res.data) {
      setDataUser(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };
  return (
    <>
      <div>
        <UserForm loadUser={loadUser} />
        <UserTable
          dataUser={dataUser}
          loadUser={loadUser}
          current={current}
          pageSize={pageSize}
          total={total}
          setCurrent={setCurrent}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );
};
export default UserPage;
