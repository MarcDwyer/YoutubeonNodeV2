import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getStreams} from '../actions/index';
import uuid from 'uuid';


class StreamerList extends Component {
     componentDidMount() {
        const {getStreams} = this.props;
        getStreams();
        this.interval = setInterval(getStreams, 60000)
    }
    componentDidUpdate(prevProps) {
        console.log(prevProps, this.props)
        if (prevProps.streamerData.length < this.props.streamerData.length) {
            const names = this.props.streamerData.map(item => item.name);
            this.setState({names})
        }
    }
    state = {
        names: [],

    }
    render() {
        console.log(this.state)
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
   return streamerData.map(stream => {
       const newName = stream.name.charAt(0).toUpperCase() + stream.name.slice(1);
         const {items} = stream;
        const imageUrl = `https://s3.us-east-2.amazonaws.com/fetchappbucket/images/${stream.name}.jpg`;
         const isOnline = items.length > 0 ? ' Is Online' : ' Is Offline';
        const youtubeLink = `https://www.youtube.com/channel/${stream.channelId}`;
    return (
        <div key={uuid()} className="col s12 m4 l3">
          <div className="card">
            <div className="card-content carder4 white-text">
              <span className="card-title cardertitle">{newName}{isOnline}</span>
              <img className="cardimages" src={imageUrl} alt="cardimages"/>
            </div>
            <div className="card-action cardlinks">
              <a rel="noopener noreferrer" target="_blank" href={youtubeLink}><i className="material-icons">ondemand_video</i></a>
            </div>
          </div>
        </div>
    );
        })
    }
}
function getProps({streamerData}) {
    return {
        streamerData,
    }
}

export default connect(getProps, {getStreams})(StreamerList);
