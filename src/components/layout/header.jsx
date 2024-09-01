import { Link, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  RedditOutlined,
  LoginOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutApi } from "../../service/api.service";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(">>> check data:", user);
  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  const handleLogout = async () => {
    const res = await logoutApi();
    if (res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.success("logout successful");
      navigate("/");
    }
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
      // disabled: true,
    },
    {
      label: <Link to={"books"}>Books</Link>,
      key: "books",
      icon: <RedditOutlined />,
    },
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),
    ...(user.id
      ? [
          {
            label: `Welcome,${user.fullName}`,
            key: "setting",
            icon: <AliwangwangOutlined />,
            children: [
              {
                label: (
                  <span
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </span>
                ),
                key: "logout",
              },
            ],
          },
        ]
      : []),
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
