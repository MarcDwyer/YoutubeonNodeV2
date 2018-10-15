import React, { Component } from 'react'


class Navbar extends Component {
  componentDidMount() {
  }
    render() {
        return (
            <nav>
              <div className="nav-wrapper">
                <a className="brand-logo">FetcherApp 2.0</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a>Future Link</a></li>
              </ul>
            </div>
          </nav>
        );
    }
}

export default Navbar;
