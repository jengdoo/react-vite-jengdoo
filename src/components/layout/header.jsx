import { NavLink, Link } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/">TRANG CHỦ</NavLink>
              </li>
              <li>
                <NavLink to="/Danhmuc">DANH MỤC</NavLink>
                <ul className="sub-menu">
                  <li>
                    <NavLink to="/abc">Bóng đá</NavLink>
                    <ul>
                      <li>Euro</li>
                      <li>World cup</li>
                      <li>Champion</li>
                      <li>Premier league</li>
                    </ul>
                  </li>
                  <li>
                    <NavLink to="/abc">Quần vợt</NavLink>
                    <ul>
                      <li>Châu âu</li>
                      <li>Châu á</li>
                      <li>Châu mỹ</li>
                    </ul>
                  </li>
                  <li>
                    <NavLink to="/abc">Bóng bàn</NavLink>
                  </li>
                  <li>
                    <NavLink to="/abc">Bóng chuyền</NavLink>
                  </li>
                  <li>
                    <NavLink to="/abc">Cầu lông</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/users">User</NavLink>
              </li>
              <li>
                <NavLink to="/books">Book</NavLink>
              </li>
              <li>
                <NavLink to="/Help">TRỢ GIÚP</NavLink>
              </li>
            </ul>
          </div>
          <div className="others">
            <ul>
              <li className="search">
                <input type="text" placeholder="Tìm kiếm" />
                {/* <i className="fa-solid fa-magnifying-glass"></i> */}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
