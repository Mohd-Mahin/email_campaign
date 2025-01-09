import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Payment from "./Payment2";
import PaymentModal from "./Modal";

function Header(props) {
  const auth = useSelector((state) => state.auth);
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? "/surveys" : "/"} className="left-brand-logo">
          Emaily
        </Link>
        <ul className="right">
          {auth && Object.keys(auth).length ? (
            <Fragment>
              <li>
                <PaymentModal />
              </li>
              <li style={{ margin: "0 7px" }}>{auth.credits} Credits</li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </Fragment>
          ) : (
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
