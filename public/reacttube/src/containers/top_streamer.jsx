import React, { Component } from 'react'

class TopStream extends Component {
    concurrentViewers;
    liveStreamingDetails;
    isFeatured;

  constructor(props) {
    super(props);

    this.state = {
      isToggled: false,
    };
    this.styles = {
      title: {marginBottom: '25px', color: 'hsl(200, 25%, 94%)', fontSize: '32px'},
      featuredContent: {fontWeight: 'bold', color: 'hsl(200, 25%, 94%)'},
      viewerCount: {fontSize: '20px', marginTop: '5px'},
      featuredImage: {boxShadow: '5px 5px 8px #323232'},
      mobileView: {fontSize: '18px !important'},
      margintop: {marginTop: '45px'},
      textTop: {display: 'flex', flexDirection: 'column'},
      button: {marginLeft: 'auto', marginRight: '10px'}
    }
  }
  componentDidMount() {
    if(this.props.onToggle) this.props.onToggle(this.onClicker);
  }

    render() {

      if (!this.props.isFeatured) return null;
      return (
          <div>
            {this.giveTop()}
          </div>
      );
    }
    giveTop = () => {
        const {isFeatured} = this.props;
        if (!isFeatured) return;
        const imageUrl = `https://s3.us-east-2.amazonaws.com/fetchappbucket/images/${this.props.isFeatured.name}.jpg`;

        return (
            <div className="container" style={this.styles.margintop}>
              <div className="row row3">
                <div className="col s12 makebig">
                  <div className="topstream">
                    {this.isMobile()}
                    <div className="blocker">
                      <img className="topimage" src={imageUrl} alt="top stream image" style={this.styles.featuredImage}/>
                      <div className="featuredcontent">
                        <div className="textTop" style={this.styles.textTop}>
                          <h5 className="fontme marginleft" style={this.styles.featuredContent}>{isFeatured.name.charAt(0).toUpperCase() + isFeatured.name.slice(1)}</h5>
                          {window.innerWidth <= 600 ? '' : <span className="marginleft" style={this.styles.viewerCount}>{isFeatured.items[0].liveStreamingDetails.concurrentViewers} viewers</span>}
                        </div>
                        <a style={this.styles.button} onClick={(e) => this.onClicker(isFeatured)} className={window.innerWidth <= 600 ? 'waves-effect waves-purple purple lighten-2 btn-small' : "waves-effect waves-purple purple lighten-2 focusme btn"}>Watch</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
    isMobile() {
      const {isFeatured} = this.props;
      const vidId = isFeatured.items[0].id
      const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;autohide=1&amp&mute=1&rel=0`;
        if (window.innerWidth <= 600) return;
        return (
            <div className="streamcontainer">
            <iframe className="stream" src={!this.state.isToggled ? vidUrl : ''} frameBorder="0" allowFullScreen="allowfullscreen"/>
          </div>
        );
      }
    onClicker = (featured) => {
        this.setState({isToggled: !this.state.isToggled});
        if(featured)  this.props.onClick(featured);
}
}

export default TopStream;
