import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import ButtonMenu from "./ButtonMenu";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Item from "./Item";
import { Car } from "../../Icons/Car.js";
import { HoKhauIcon } from "../../Icons/HoKhauIcon.js";
import { ThuPhiIcon } from "../../Icons/ThuPhiIcon";
import { HoSoIcon } from "../../Icons/HoSoIcom";
import { LogoutIcon } from "../../Icons/LogoutIcon";
import { LoginIcon } from "../../Icons/LoginIcon";

const cx = classNames.bind(styles);

function Sidebar() {
  const [user, setUser] = useState("hoang");
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  };
  return (
    <div className={cx("wrapperparent")}>
      <div className={cx("sidebar")}>
        <div className={cx("title")}>
          <h1>Phần mềm</h1>
          <h1>quản lý chung cư</h1>
        </div>
        <div className={cx("menu")}>
          <ButtonMenu iconLeft={<ThuPhiIcon />} title="Thu phí" iconRight="">
            <NavLink
              to="/residenceReceipt"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Quản lý thu" />
            </NavLink>
            <NavLink
              to="/residenceFee"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Danh mục thu" />
            </NavLink>
          </ButtonMenu>
          <ButtonMenu
            // iconLeft={''}
            iconLeft={<HoKhauIcon />}
            title="Cư dân"
            iconRight=""
          >
            <NavLink
              to="/residence"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Hộ khẩu" />
            </NavLink>
            <NavLink
              to="/person"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Nhân khẩu" />
            </NavLink>
            <NavLink
              to="/absentPerson"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Tạm vắng" />
            </NavLink>
          </ButtonMenu>
          <ButtonMenu
            //     iconLeft={<FontAwesomeIcon icon={Car} />}
            title="Phương tiện"
            iconLeft={<Car />}
            iconRight=""
          >
            <NavLink
              to="/vehicle"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Quản lý" />
            </NavLink>
            <NavLink
              to="/vehicleFee"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Khoản thu" />
            </NavLink>
            <NavLink
              to="/vehicleReceipt"
              className={(nav) => {
                cx({ active: nav.isActive });
              }}
            >
              <Item title="Phiếu thu" />
            </NavLink>
          </ButtonMenu>
        </div>
        <div className={cx("hr")}></div>
        <div className={cx("user")}>
          <NavLink to="/profile">
            <Button
              style={{
                padding: "10px 0px",
                fontSize: "30px",
                color: "black",
                fontWeight: "400",
                textTransform: "none",
                justifyContent: "flex-start",
                paddingLeft: "50px",
                borderRadius: "10px",

                paddingBottom: "4px",
              }}
              className={cx("btn")}
              startIcon={<HoSoIcon />}
            >
              Hồ sơ
            </Button>
          </NavLink>
          {(user && sessionStorage.getItem("user") != "null") ? (
            <Button
              style={{
                backgroundColor: "#f9bf89",
                width: "80%",
                marginLeft: "10px",
                borderRadius: "10px",
                fontSize: "25px",
                padding: "0px 5px",
                textAlign: "center",
                color: "black",
              }}
              onClick={() => {
                setUser("");
                sessionStorage.setItem("user", null);
                navigate('/')
              }}
              startIcon={<LogoutIcon />}
            >
              Đăng xuất
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "#f9bf89",
                width: "80%",
                marginLeft: "10px",
                borderRadius: "10px",
                fontSize: "25px",
                padding: "0px 5px",
                textAlign: "center",
                color: "black",
              }}
              onClick={handleLogin}
              startIcon={<LoginIcon />}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
