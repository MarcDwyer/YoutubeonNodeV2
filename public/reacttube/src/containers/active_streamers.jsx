import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getActiveStreams} from '../actions/index';
import VideoPlayer from '../containers/videoplayer';
import TopStream from '../containers/top_streamer';
import Navbar from '../components/navbar'
import uuid from 'uuid';

class ActiveStreams extends Component {
  constructor(props) {
    super(props);
    this.state = {
        totalViewers: 0,
        featured: null
    }
  }
  styles = {
      title: {marginBottom: '25px', color: 'hsl(200, 25%, 94%)', fontSize: '32px', fontWeight: 'bold'},
      carder: {marginBottom: '35px', borderRadius: '25px', height: '100%'},
      card: {marginTop: '-50px'},
      avatar: {width: '85px', height: '85px', borderRadius: '50%', border: 'solid 2px #353A49', marginLeft: '25px'},
      cardText: {display: 'flex', flexDirection: 'column', textAlign:'center', marginTop: '-45px'},
      cardName: {fontWeight: 'bold', fontSize: '22px', color: 'hsl(200, 25%, 94%)', marginBottom: '10px', marginTop: '10px'},
      cardViewers: {fontSize: '18px'},
      cardButton: {marginLeft: 'auto', marginRight: 'auto'},
      container: {borderTop: '1px solid #353A49'},
      activeNumber: {borderRadius: '50%', marginLeft: '10px', cursor: 'default'},
      thumbnail: {borderTopRightRadius: '25px', borderTopLeftRadius: '25px'}
  };
    componentDidMount() {
      const {getActiveStreams} = this.props;
      getActiveStreams();
      this.interval = setInterval(getActiveStreams, 45000);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.activeStreamers !== this.props.activeStreamers) {
            const sortedViewers = this.props.activeStreamers.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);
            this.setState({featured: sortedViewers[0]});
          const total = this.props.activeStreamers.reduce((total, item) => {
              if (!item.items[0].liveStreamingDetails.concurrentViewers) return;
              total += +item.items[0].liveStreamingDetails.concurrentViewers;
              return total;
          }, 0);

          this.setState({totalViewers: total});
        }
    }

    render() {
    if (!this.props.activeStreamers) return;
    const {activeStreamers} = this.props;

    if (this.props.activeStreamers.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="container">
          No streams currently online...
        </div>
      </div>
    );
    }
        return (
            <div>
              <Navbar totalViewers={this.state.totalViewers}/>
              <TopStream onClick={this.onClick} onToggle={ref => (this.topStream = ref)} isFeatured={this.state.featured}/>
              <div className="container" style={this.styles.container}>
                <div className='row row2'>
                  <h5 style={this.styles.title}>Active Streamers <button className='btn purple lighten-2' style={this.styles.activeNumber}>{activeStreamers.length}</button></h5>
                    {this.props.activeStreamers.length > 0 ? this.renderActive() : ''}
                </div>
              </div>
              <VideoPlayer onRef={ref => (this.child = ref)} onClicker={this.onClick}/>
            </div>
        );
    }
    renderActive() {
    const {activeStreamers} = this.props;
    const filterUndefined = activeStreamers.filter(item => item.items[0].liveStreamingDetails.concurrentViewers);

    const sortedViewers = filterUndefined.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);

  return sortedViewers.map((stream) => {
        const newName = stream.name.charAt(0).toUpperCase() + stream.name.slice(1);
        const {snippet} = stream.items[0];
        const thumbNail = snippet.thumbnails.maxres ? snippet.thumbnails.maxres.url : snippet.thumbnails.high.url;
        const viewerCount = stream.items[0].liveStreamingDetails.concurrentViewers;
        const isMobile = window.innerWidth <= 600 ? 'smalleractive' : 'activator';
        const avatar = `https://s3.us-east-2.amazonaws.com/fetchappbucket/images/${stream.name}.jpg`;
           return (
            <div key={uuid()} className="col s12 m6 l4">
              <div className="carder" style={this.styles.carder}>
                <div className='carder-image'>
                  <img className={isMobile} src={thumbNail} style={this.styles.thumbnail} />
                </div>
                <div className="carder-content" style={this.styles.card}>
                  <img src={avatar} style={this.styles.avatar} />
                  <div className="cardText" style={this.styles.cardText}>
                    <span className="carder-title" style={this.styles.cardName}>{newName}</span>
                    <span className="viewercount" style={this.styles.cardViewers}>{viewerCount + ' Viewers'}</span>
                    <p className="mt"><a onClick={() => this.onClick(stream)} className="purple lighten-2 btn-small focusme" style={this.styles.cardButton}>Watch</a></p>
                  </div>
                </div>
              </div>
            </div>
           );
       })
    }
     onClick = (stream) => {
        if ( window.innerWidth <= 600) {
          const youtubeLink = `https://www.youtube.com/watch?v=${stream.items[0].id}`;
          const win = window.open(youtubeLink, '_blank');
          win.focus();
          return;
        }
      this.topStream();
      if (stream) this.child(stream);
     }
}

function getProps({activeStreamers}) {
   return {
        activeStreamers
   }
}
export default connect(getProps, {getActiveStreams})(ActiveStreams);
