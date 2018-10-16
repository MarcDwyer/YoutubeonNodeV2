import React, { Component } from 'react'


class Navbar extends Component {

    render() {
        return (
            <nav>
              <div className="nav-wrapper">
                <a className="brand-logo left">FetcherApp</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a>Future Link</a></li>
                </ul>
              </div>
            </nav>
            );
    }
}

export default Navbar;
