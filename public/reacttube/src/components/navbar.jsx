import React, { Component } from 'react'


class Navbar extends Component {
  componentDidMount() {
    this.handleScroll();
  }
    render() {
        return (
            <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">FetcherApp</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a>Click for Free Pie</a></li>
              </ul>
            </div>
          </nav>
        );
    }   
    handleScroll() {
      window.onscroll = () => {myFunction()};

const navbar = document.querySelector('nav');
const sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
  } 
}

export default Navbar;