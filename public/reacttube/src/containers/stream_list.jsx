import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getStreams} from '../actions/index';
import _ from 'lodash';
import uuid from 'uuid';


class StreamerList extends Component {
  styles = {
      gridList: {justifyContent: 'center', alignItems: 'center'},
      card: {backgroundColor: '#353A49'},
      streamName: {color: 'hsl(200, 25%, 94%)', fontWeight: 'bold', marginBottom: '10px !important'},
      column: {marginBottom: '30px'}
  };
     componentDidMount() {
        const {getStreams} = this.props;
        getStreams();
    }

    render() {
        if (!this.props.streamerData.length > 0) {
            return (
                <div className="preloader-wrapper big active">

                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"/>
                  </div><div className="gap-patch">
                    <div className="circle"/>
                  </div><div className="circle-clipper right">
                    <div className="circle"/>
                  </div>
                </div>
              </div>
            );
        } else {
            return (
                <div>
                  <div className="container bordertopme">
                    <div className="row row1">
                        <h5 style={this.styles.streamName}>Streamer Catalog</h5>
                {this.props.streamerData ? this.renderStreamers() : ''}
                </div>
                </div>
                <div className="helpme">
                <span>Enjoy my work? Contact me envdia@gmail.com</span>
                </div>
                </div>
            );
        }
    }
    renderStreamers() {
    const {streamerData} = this.props;
    const shuffled = _.shuffle(streamerData)
   return shuffled.map(stream => {
       const newName = stream.name;
        const imageUrl = `https://s3.us-east-2.amazonaws.com/fetchappbucket/images/${stream.name}.jpg`;
        const youtubeLink = `https://www.youtube.com/channel/${stream.channelId}`;
    return (
        <div key={uuid()} className="col s12 m4 l3" style={this.styles.column}>
          <div className="card" style={this.styles.card}>
            <div className="card-content carder4 white-text">
              <span className="card-title cardertitle" style={this.styles.streamName}>{newName}</span>
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
        streamerData
    }
}

export default connect(getProps, {getStreams})(StreamerList);
