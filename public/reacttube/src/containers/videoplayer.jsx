import React, { Component } from 'react'
import {connect} from 'react-redux';


class VideoPlayer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentStream: null,
        booty: false
      }
      this.styles = {
        active: {transition: '0.15s ease'}
      }

    }
    componentDidMount() {
      console.log('uh oh')
      if(this.props.onRef) this.props.onRef(this.toggle)
      }

      componentWillUnmount() {
        if(this.props.onRef) this.props.onRef(undefined)
      }
      componentDidUpdate() {
        console.log(this.state)
      }
     render() {

       const {currentStream} = this.state;
        if (!this.state.currentStream) {
            return (
                <div className="referme">
                  <div className="video">
                    <div className="videowrapper">
                      <div className="buttons">
                        <a  className="btn offcanv">Back</a>
                      </div>
                      <div className="streaminfo">
                        <span>Weeeee Viewers</span>
                      </div>
                    </div>
                    <iframe className="stream" src='' frameBorder="0" allowFullScreen="allowfullscreen" title="The Chat"></iframe>
                  </div>
                  <div className="chatter">
                    <iframe frameBorder="0" src='' className="chat" title="Video Player"></iframe>
                  </div>
                </div>
            );
        };

        const vidId =  currentStream.items[0].id;
        const url = window.location.hostname;
        const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1&amp`;
        const chatUrl = `https://www.youtube.com/live_chat?v=${vidId}&embed_domain=${url}`;

        return (
            <div className="referme">
              <div className="video activevideo">
                <div className="videowrapper">
                  <div className="buttons">
                    <a onClick={this.toggle} className="btn offcanv">Back</a>
                  </div>
                  <div className="streaminfo">
                    <span>{currentStream.items[0].liveStreamingDetails.concurrentViewers} Viewers</span>
                  </div>
                </div>
                <iframe className="stream" src={vidUrl} frameBorder="0" allowFullScreen="allowfullscreen" title="The Chat"></iframe>
              </div>
              <div className="chatter activechat">
                <iframe frameBorder="0" src={chatUrl} className="chat" title="Video Player"></iframe>
              </div>
            </div>
        );
    }

    toggle = (stream) => {
        if (!stream.type) {
        this.setState({currentStream: stream});
        }

        if (stream.type) {
                this.setState({currentStream: null});
              if (this.props.onClicker)  this.props.onClicker();
              return;
        }
    }
}
function getProps({viewedStream}) {
    return {
        viewedStream
    }
}

export default connect(getProps)(VideoPlayer);
