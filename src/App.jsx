import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountUserApi } from "./service/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";
// const ParentComponent = (props) => {
//   console.log(">>> check props parents:", props);
//   return (
//     <>
//       <div>parent components</div>
//     </>
//   );
// };
// const ChildComponent = (props) => {
//   return (
//     <>
//       <div>children components</div>
//     </>
//   );
// };

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo();
  }, []);
  // const delay = (milSeconds) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, milSeconds);
  //   });
  // };
  const fetchUserInfo = async () => {
    const res = await getAccountUserApi();
    // await delay(2000);
    if (res.data) {
      console.log(">>> check res:", res.data);
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };
  return (
    <>
      {/* <ParentComponent/> */}
      {/* <ParentComponent>dfdsfdsa</ParentComponent> */}
      {isAppLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
