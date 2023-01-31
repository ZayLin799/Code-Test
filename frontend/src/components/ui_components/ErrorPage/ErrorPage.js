import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import scss from "./errorPage.scss";

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleGoback = this.handleGoback.bind(this);
  }

  handleGoback() {
    this.props.history.push({
      pathname: "/",
    });
  }

  render() {
    const { classMode } = this.props;
    return (
      <div className={scss.errorPage}>
        <div
          className={`error-page ${
            typeof classMode !== "undefined" ? classMode : ""
          }`}
        >
          <div className="error-number">
            {/* <img className="error-img" src={errorImg} alt="error..." /> */}
            <div className="error-text">404</div>
          </div>
          <div className="error-description">
            The page you are looking for is not found or removed.
          </div>
          {typeof classMode !== "undefined" ? (
            ""
          ) : (
            <React.Fragment>
              <div className="error-goback-text">
                Would you like to go home?
              </div>
              <div className="error-goback-btn">
                <Button
                  type="default"
                  className="error-btn"
                  text="Let's go home"
                  onClick={this.handleGoback}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorPage;
