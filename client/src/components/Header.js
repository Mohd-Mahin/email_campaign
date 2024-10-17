import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";

function Header(props) {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={props.auth ? "/surveys" : "/"} className="left-brand-logo">
          Emaily
        </Link>
        <ul className="right">
          {!props.auth ? (
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          ) : (
            <Fragment>
              <li>
                <Payment />
              </li>
              <li style={{ margin: "0 7px" }}>{props.auth.credits} Credits</li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Header);
