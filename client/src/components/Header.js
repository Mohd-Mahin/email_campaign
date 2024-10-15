import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={props.auth ? "/surveys" : "/"} className="left-brand-logo">
          Emaily
        </Link>
        <ul className="right">
          <li>
            {!props.auth ? (
              <a href="/auth/google">Login with Google</a>
            ) : (
              <a href="/api/logout">Logout</a>
            )}
          </li>
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
