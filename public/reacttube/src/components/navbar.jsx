import React, { Component } from 'react'


class Navbar extends Component {
  styles = {
    button: {boxShadow: 'none', cursor: 'default'}
  };
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo left">FetcherApp</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a className="btn waves-effect waves-purple purple lighten-2" style={this.styles.button}>{this.props.totalViewers} Viewers</a></li>
            </ul>
          </div>
        </nav>
      </div>
        );
  }
}

export default Navbar;
