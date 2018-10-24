import React, { Component } from 'react'
import {Modal} from 'react-materialize';

class Navbar extends Component {
  styles = {
    button: {boxShadow: 'none', cursor: 'default'},
    modal: {color: 'black'},
    totalViewers: {boxShadow: 'none'},
    button: {backgroundColor: 'transparent', boxShadow: 'none', fontSize: '1rem', display: 'block', padding: '0 15px', cursor: 'pointer', transition: 'background-color .3s'}
  };
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo left">FetcherApp</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a style={this.styles.totalViewers} className="btn waves-effect waves-purple purple lighten-2">{ Number.isInteger(this.props.totalViewers) ? this.props.totalViewers + ' Viewers': 'Viewercount Unavailable'}</a></li>
              <li><a>
              <Modal
                style={this.styles.modal}
                header="Current Features"
                trigger={<span style={this.styles.button}>Features</span>}
                >
                <ul className='modalList'>
                  <li>Live Updates</li>
                  <li>Live Notifications (Yes, this app will notify you with a really cool colored box that tells you who went live!)</li>
                  <li>Individual Viewercount as well as total</li>
                  <li>App optimizes when playing a video.</li>
                  <li>Cool Colors</li>
                </ul>
              </Modal>
            </a></li>
            </ul>
          </div>
        </nav>
      </div>
        );
  }
}

export default Navbar;
