import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getActiveStreams, fetchTimes} from '../actions/index';
import VideoPlayer from '../containers/videoplayer';
import TopStream from '../containers/top_streamer';
import Navbar from '../components/navbar'
import uuid from 'uuid';

class ActiveStreams extends Component {
  constructor(props) {
    super(props);
    this.state = {
        totalViewers: 0,
        featured: null,
        toggledStream: null,
    }
  }
  styles = {
      title: {marginBottom: '25px', color: 'hsl(200, 25%, 94%)', fontSize: '32px', fontWeight: 'bold'},
      carder: {borderRadius: '25px', height: '100%', maxWidth: '450px'},
      card: {display: 'flex', marginLeft: 'auto', marginRight: 'auto'},
      avatar: {width: '85px', height: '85px', borderRadius: '50%', border: 'solid 2px #353A49', marginLeft: '-105px'},
      cardText: {flexDirection: 'column', display: 'flex',textAlign: 'center', marginTop: '-55px'},
      cardName: {fontWeight: 'bold', fontSize: '22px', color: 'hsl(200, 25%, 94%)', marginBottom: '10px', marginTop: '-20px'},
      cardViewers: {fontSize: '18px'},
      cardButton: {marginLeft: 'auto', marginRight: 'auto'},
      container: {borderTop: '1px solid #353A49'},
      activeNumber: {borderRadius: '50%', marginLeft: '10px', cursor: 'default'},
      thumbnail: {borderTopRightRadius: '25px', borderTopLeftRadius: '25px'},
  };
    componentDidMount() {
    const {getActiveStreams, fetchTimes} = this.props;
      getActiveStreams();
      fetchTimes();
      this.interval = setInterval(() => {
        getActiveStreams();
        fetchTimes();
      }, 45000);
    }
    componentDidUpdate(prevProps) {

        if (prevProps.activeStreamers !== this.props.activeStreamers) {
            const sortedViewers = this.props.activeStreamers.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);
            this.setState({featured: sortedViewers[0]});

          const total = this.props.activeStreamers.reduce((total, item) => {
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
        <div className="contained">
        <div className="preloader-wrapper big active">

          <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
          <div className="circle"/>
        </div>
          <div className="gap-patch">
             <div className="circle"/>
            </div><div className="circle-clipper right">
    <div className="circle"/>
  </div>
</div>
</div>
        </div>
      </div>
    );
    }
        return (
            <div>
              <Navbar totalViewers={this.state.totalViewers}/>
              <TopStream onClick={this.onClick} isFeatured={this.state.featured} thisToggle={this.state.toggledStream}/>
              <div className="container" style={this.styles.container}>
                <h5 style={this.styles.title}>Active Streamers <button className='btn purple lighten-2' style={this.styles.activeNumber}>{activeStreamers.length}</button></h5>
                <div className='row2'>
                    {this.props.activeStreamers.length > 0 ? this.renderActive() : ''}
                </div>
              </div>
              <VideoPlayer onClicker={this.onClick} currentToggled={this.state.toggledStream}/>
            </div>
        );
    }
    renderActive() {
    const {activeStreamers} = this.props;

    const sortedViewers = activeStreamers.sort((a, b) => +a.items[0].liveStreamingDetails.concurrentViewers < +b.items[0].liveStreamingDetails.concurrentViewers ? 1 : -1);

  return sortedViewers.map((stream) => {

        const {snippet} = stream.items[0];
        const thumbNail = window.innerWidth <= 600 ? ''  : snippet.thumbnails.maxres ? snippet.thumbnails.maxres.url : snippet.thumbnails.high.url;
        const viewerCount = stream.items[0].liveStreamingDetails.concurrentViewers;
        const isMobile = window.innerWidth <= 600 ? 'change smalleractive' : 'change activator';
        const avatar = `https://s3.us-east-2.amazonaws.com/fetchappbucket/images/${stream.name}.jpg`;

           return (
            <div key={uuid()} className="dontflexme">
              <div className="carder" style={this.styles.carder}>
                <div className='carder-image'>
                  <img className={isMobile} src={thumbNail} style={this.styles.thumbnail} alt="" />
                </div>
                <div className="carder-content" style={this.styles.card}>
                  <div className="cardText" style={this.styles.cardText}>
                    <img src={avatar} style={this.styles.avatar} className="avatarimg" alt="" />
                    <span className="carder-title" style={this.styles.cardName}>{stream.name === 'code' ? stream.name + ' Train' : stream.name}</span>
                    <span className="viewercount" style={this.styles.cardViewers}>{viewerCount + ' Viewers'}</span>
                    <p className="mt"><button onClick={() => this.onClick(stream)} className="purple lighten-2 btn-small focusme" style={this.styles.cardButton}>Watch</button></p>
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
        this.setState({toggledStream: stream})
     }
}

function getProps({activeStreamers}) {
   return {
        activeStreamers
   }
}
export default connect(getProps, {getActiveStreams, fetchTimes})(ActiveStreams);
