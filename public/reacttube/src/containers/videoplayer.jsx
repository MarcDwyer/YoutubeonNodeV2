import React, { Component } from 'react'
import {connect} from 'react-redux';
import uuid from 'uuid';
import {Button, Dropdown, NavItem} from 'react-materialize';

class VideoPlayer extends Component {
    constructor(props) {
      super(props);
      
      this.styles = {
          active: {transition: '0.15s ease'},
          actualvideo: {height: '100%', position: 'relative', display: 'flex'},
          viewercount: {position: 'absolute', top: '15px', left: '50%'},
          iframe: {marginTop: 'auto', marginBottom: 'auto'},
          backButton: {position: 'absolute', top: '15px', left: '15px', width: '150px'},
          dropButton: {position: 'absolute', top: '15px', right: '15px'},
      };
    }
    componentDidMount() {
      this.props.onRef(this.toggle);
    }
     render() {
      
       const {currentToggled, activeStreamers} = this.props;
        if (!currentToggled) {
          document.body.style.overflow = '';
          document.removeEventListener('keyup', this.toggle);
            return (
                <div className="referme">
                  <div className="video">
                       <div className="videowrapper">
                      <div className="buttons">
                      </div>
                      <div className="streaminfo">
                        <span></span>
                      </div>
                    </div>
                      <div className="actualvideo">
                          <span style={this.styles.viewercount}/>
                          <iframe className="stream" src='' frameBorder="0" allowFullScreen="allowfullscreen" title="The Chat"/>
                      </div>
                      </div>
                  <div className="chatter">
                    <iframe frameBorder="0" src='' className="chat" title="Video Player"/>
                  </div>
                </div>
            );
        };
        const indexNum = this.props.activeStreamers.findIndex(item => item.name === this.props.currentToggled.name);
        
        const vidId =  currentToggled.items[0].id;
        const url = window.location.hostname;
        const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1&amp`;
        const chatUrl = `https://www.youtube.com/live_chat?v=${vidId}&embed_domain=${url}`;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keyup', this.toggle);

        
        return (
            <div className="referme">
              <div className="video activevideo">
              
                  <div className="actualvideo" style={this.styles.actualvideo}>
                  <Dropdown trigger={
                    <Button className="purple lighten-2" style={this.styles.dropButton}>Toggle Streams</Button>
                          }>
                        {this.otherStreams()}
                    </Dropdown>
                      <button onClick={this.toggle} className="btn offcanv purple lighten-2" style={this.styles.backButton}>Back</button>
                      <span style={this.styles.viewercount}>{activeStreamers[indexNum] ?  activeStreamers[indexNum].items[0].liveStreamingDetails.concurrentViewers : ''} Viewers</span>
                      <iframe className="stream" src={vidUrl} frameBorder="0" allowFullScreen="allowfullscreen" title="the stream" style={this.styles.iframe}/>
                  </div>
              </div>
              <div className="chatter activechat">
                <iframe frameBorder="0" src={chatUrl} className="chat" title="Video Player"/>
              </div>
            </div>
        );
    }

    toggle = (stream) => {

        if (stream.type === 'click' || (stream.keyCode && stream.keyCode === 27)) {
  
              if (this.props.onClicker)  this.props.onClicker();
                      }
    }
    otherStreams() {
      return this.props.activeStreamers.map(streamer => {
        return (
          <NavItem style={this.styles.dropItem} key={uuid()} onClick={() => this.props.onClicker(streamer)}>{streamer.name}</NavItem>
        );
      })
    }
}
function getProps({activeStreamers}) {
  return {
    activeStreamers
  }
}

export default connect(getProps)(VideoPlayer);
