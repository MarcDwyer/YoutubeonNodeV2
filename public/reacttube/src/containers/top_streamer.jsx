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
    giveTop = () => {
        const {featured} = this.props;
        if (!featured || window.innerWidth <= 600) return;
        const vidId = featured.items[0].id
        const imageUrl = `https://s3.us-east-2.amazonaws.com/fetchappbucket/images/${this.props.featured.name}.jpg`;
  //      if (!featured) return null;
        return (
            <div className="container">
              <h4 className="fontme">Top Stream</h4>
              <div className="row row3">
                <div className="col s12 makebig">
                  <div className="topstream">
                    {this.isMobile()}
                    <div className="blocker">
                      <img className="topimage" src={imageUrl} alt="top stream image" />
                      <div className="featuredcontent">
                        <h5 className="fontme marginleft">{featured.name.charAt(0).toUpperCase() + featured.name.slice(1)}</h5>
                        <span className="marginleft">{featured.items[0].liveStreamingDetails.concurrentViewers} viewers</span>
                      </div>
                      <div className="buttorg">
                        <a onClick={(e) => this.onClicker(e, vidId, featured)} className="purple lighten-2 btn-small focusme">Watch</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
    isMobile() {
      const {featured} = this.props;
      const thumbnail = featured.items[0].snippet.thumbnails.maxres ? featured.items[0].snippet.thumbnails.maxres.url : featured.items[0].snippet.thumbnails.high.url;
      const vidId = featured.items[0].id
      const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;autohide=1&amp&mute=1&rel=0`;

        return (
          <div className="streamcontainer">
            <iframe className="stream" src={!this.props.isplaying ? vidUrl : ''} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
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
