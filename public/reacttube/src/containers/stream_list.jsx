import React, { Component } from 'react';
// import Navbar from '../components/navbar';
import {connect} from 'react-redux';
import {getStreams} from '../actions/index';
// import ActiveStreams from './active_streamers';


class StreamerList extends Component {
     componentDidMount() {
        const {getStreams} = this.props;

        getStreams();
        this.interval = setInterval(getStreams, 60000)
    }
    render() {
        if (!this.props.streamerData.length > 0) {
            return (
                <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            );
        }
        return (
            <div className="container">
            <div className="row row1">
            {this.props.streamerData ? this.renderStreamers() : ''}
            </div>
            </div>
        );
    }
    renderStreamers() {
    const {streamerData} = this.props;
        let x = 0;
   return streamerData.map(stream => {
       const newName = stream.name.charAt(0).toUpperCase() + stream.name.slice(1);
       const {items} = stream;

       const isOnline = items.length > 0 ? ' Is Online' : ' Is Offline';
       x++;
    return (
        <div key={x} className="col s12 m4 l3">
          <div className="card">
            <div className="card-content white-text">
              <span className="card-title">{newName}{isOnline}</span>
              <span>{''}</span>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
    );
        })
    }
}
function getProps({streamerData}) {
    return {
        streamerData
    }
}

export default connect(getProps, {getStreams})(StreamerList);