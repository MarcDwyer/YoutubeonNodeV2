import React, { Component } from 'react'
import {connect} from 'react-redux';
import {isPlaying} from '../actions/index';

class VideoPlayer extends Component {

    componentDidMount() {
      console.log('uh oh')
      if(this.props.onRef) this.props.onRef(this)
      }

      componentWillUnmount() {
        if(this.props.onRef) this.props.onRef(undefined)
      }
    state = {
        isOn: false
    }
     render() {

       const {viewedStream} = this.props;
        if (!viewedStream) {
            return (
                <div className="referme">
                  <div className="video">
                    <div className="videowrapper">
                      <div className="buttons">
                        <a onClick={this.toggle} className="btn offcanv">Back</a>
                      </div>
                      <div className="streaminfo">
                        <span>Currently Viewing Nothing: Something is wrong, with Nobody</span>
                      </div>
                    </div>
                    <iframe className="stream" src='' frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
                  </div>
                  <div className="chatter">
                    <iframe frameBorder="0" src='' className="chat" title="Ice Poseidon"></iframe>
                  </div>
                </div>
            );
        }
        return (

            <div className="referme">
              <div className="video">
                <div className="videowrapper">
                  <div className="buttons">
                    <a onClick={this.toggle} className="btn offcanv">Back</a>
                  </div>
                  <div className="streaminfo">
                    <span>{viewedStream.items[0].liveStreamingDetails.concurrentViewers} Viewers</span>
                  </div>
                </div>
                <iframe className="stream" src='' frameBorder="0" allowFullScreen="allowfullscreen" title="The Chat"></iframe>
              </div>
              <div className="chatter">
                <iframe frameBorder="0" src='' className="chat" title="Video Player"></iframe>
              </div>
            </div>
        );
    }

    toggle = (vidId) => {
        const url = window.location.hostname;
        const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1&amp`;
        const chatUrl = `https://www.youtube.com/live_chat?v=${vidId}&embed_domain=${url}`;
        const mainDiv = document.querySelector('.referme')
        const video = mainDiv.querySelector('.video');
        const chatter = mainDiv.querySelector('.chatter');

        if (vidId.type && vidId.type == 'click') {
                video.querySelector('iframe').src = '' ;
                chatter.querySelector('iframe').src = '';
               setTimeout(() => {
                video.classList.remove('activevideo');
                chatter.classList.remove('activechat');
                document.querySelector('body').style.overflow = '';
               }, 250)
               this.props.isPlaying(false);
        return;
        }
        setTimeout(() => {
        video.querySelector('.stream').src = vidUrl ;
        chatter.querySelector('.chat').src = chatUrl;
        document.querySelector('body').style.overflow = 'hidden';
        }, 250)
        this.props.isPlaying(true)
        video.classList.add('activevideo');
        chatter.classList.add('activechat');

    }
}
function getProps({viewedStream}) {
    return {
        viewedStream
    }
}

export default connect(getProps, {isPlaying})(VideoPlayer);
