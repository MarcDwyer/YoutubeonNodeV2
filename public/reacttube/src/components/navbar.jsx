import React, { Component } from 'react'


class Navbar extends Component {
  componentDidMount() {
  }
    render() {
        return (
            <nav>
              <div className="nav-wrapper">
                <a className="brand-logo">FetcherApp</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a>How Many is do</a></li>
              </ul>
            </div>
          </nav>
        );
    }
}

export default Navbar;
