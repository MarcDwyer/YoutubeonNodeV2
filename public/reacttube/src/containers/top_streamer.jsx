import React, { Component } from 'react'
import {connect} from 'react-redux';
import VideoPlayer from './videoplayer';
import {currentStream} from '../actions/index';

class TopStream extends Component {

    render() {
        
      return (
          <div>
              {this.giveTop()}
              <VideoPlayer onRef={ref => (this.child = ref)} videoId={''} />
          </div>
      );
    }
    giveTop(){

        const {activeStreamers} = this.props;
        if (!activeStreamers.length > 0) return null;
        const sortedViewers = activeStreamers.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);
        const topChannel = sortedViewers[0];
        const vidId = topChannel.items[0].id
        const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1`;

        return (
            <div className="container">
            <h4>Top Stream</h4>
            <div className="row row3">
            <div className="col s12 makebig">
            <div className="topstream">
            <iframe className="stream" src={!this.props.isplaying ? vidUrl : ''} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
            <div className="blocker">
            <h5>{topChannel.name.charAt(0).toUpperCase() + topChannel.name.slice(1)}</h5>
            <a onClick={(e) => this.onClicker(e, vidId, topChannel)} className="purple lighten-2 btn-small focusme"> Watch Now</a>
            </div>
            </div>
            </div>
            </div>
            </div>
        );
    }
    onClicker(e, vidid, stream) {
        this.props.currentStream(stream);
       this.child.toggle(vidid);
    }
}
function getProps({activeStreamers, isplaying}) {
    return {
        activeStreamers,
        isplaying
    }
}
export default connect(getProps, {currentStream})(TopStream);