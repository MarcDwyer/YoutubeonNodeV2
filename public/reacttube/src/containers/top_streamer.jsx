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
    giveTop() {
        const {featured} = this.props;
        if (!featured) return null;

        const vidId = featured.items[0].id
        const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;autohide=1&amp&mute=1`;

        return (
            <div className="container">
            <h4 className="fontme">Top Stream</h4>
            <div className="row row3">
            <div className="col s12 makebig">
            <div className="topstream">
            <iframe className="stream" src={!this.props.isplaying ? vidUrl : ''} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
            <div className="blocker">
            <h5 className="fontme marginleft">{featured.name.charAt(0).toUpperCase() + featured.name.slice(1)}</h5>
            <span className="marginleft">{featured.items[0].liveStreamingDetails.concurrentViewers} viewers</span>
            <a onClick={(e) => this.onClicker(e, vidId, featured)} className="purple lighten-2 btn-small focusme"> Watch Now</a>
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
function getProps({isplaying, featured}) {
    return {
        isplaying,
        featured
    }
}
export default connect(getProps, {currentStream})(TopStream);