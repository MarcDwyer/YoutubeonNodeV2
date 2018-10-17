import React, { Component } from 'react'
import {connect} from 'react-redux';


class TopStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggled: false,
    }
    this.styles = {
      title: {marginBottom: '25px', color: 'hsl(200, 25%, 94%)', fontSize: '32px'},
      featuredContent: {fontWeight: 'bold', color: 'hsl(200, 25%, 94%)'},
      viewerCount: {fontSize: '20px', marginTop: '5px'},
      featuredImage: {boxShadow: '5px 5px 8px #323232'}
    }
  }
  componentDidMount() {
    if(this.props.onToggle) this.props.onToggle(this.onClicker);
  }
    render() {
      if (!this.props.featured) return null
      return (
          <div>
            {this.giveTop()}
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
              <h5 style={this.styles.title} className="fontme divtitle">Top Stream</h5>
              <div className="row row3">
                <div className="col s12 makebig">
                  <div className="topstream">
                    {this.isMobile()}
                    <div className="blocker">
                      <img className="topimage" src={imageUrl} alt="top stream image" style={this.styles.featuredImage}/>
                      <div className="featuredcontent">
                        <h5 className="fontme marginleft" style={this.styles.featuredContent}>{featured.name.charAt(0).toUpperCase() + featured.name.slice(1)}</h5>
                        <span className="marginleft" style={this.styles.viewerCount}>{featured.items[0].liveStreamingDetails.concurrentViewers} viewers</span>
                      </div>
                      <div className="buttorg">
                        <a onClick={(e) => this.onClicker(featured)} className="waves-effect waves-purple purple lighten-2 focusme btn">Watch</a>
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
            <iframe className="stream" src={!this.state.isToggled ? vidUrl : ''} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
          </div>
        );
      }
    onClicker = (featured) => {
        this.setState({isToggled: !this.state.isToggled})
        if(featured)  this.props.onClick(featured);
}
}
function getProps({isplaying, featured}) {
    return {
        featured
    }
}
export default connect(getProps)(TopStream);
