import "./footer.css";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-footer">
          <div className="row">
            <div className="col-sm-3">
              <div className="right-center">
                <h3>Giới thiệu</h3>
                <li>
                  <a href="">Về IVY moda</a>
                </li>
                <li>
                  <a href="">Tuyển dụng</a>
                </li>
                <li>
                  <a href="">Hệ thống cửa hàng</a>
                </li>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="left-center">
                <h3>Dịch vụ khách hàng</h3>
                <li>
                  <a href="">Chính sách điều khoản</a>
                </li>
                <li>
                  <a href="">Hướng dẫn mua hàng</a>
                </li>
                <li>
                  <a href="">Chính sách thanh toán</a>
                </li>
                <li>
                  <a href="">Chính sách đổi trả</a>
                </li>
                <li>
                  <a href="">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="">Chính sách giao hàng vận chuyển</a>
                </li>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="last-footer">
                <h3>Liên hệ</h3>
                <li>
                  <a href="">Hotline: 0123456789</a>
                </li>
                <li>
                  <a href="">Email : duyhocit@gmail.com</a>
                </li>
                <li>
                  <a href="">Messenger: www.fb.messenger</a>
                </li>
              </div>
              <div>
                <div className="footer-left">
                  <div className="last-left">
                    <div className="last">
                      <p>HOTLINE : 0123456789</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">{/* update last */}</div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
