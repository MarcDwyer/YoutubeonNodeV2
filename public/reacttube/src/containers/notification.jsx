import React, { Component } from 'react'
import {connect} from 'react-redux';
import uuid from 'uuid';
import _ from 'lodash';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            card: {color: 'white'}
        }
        this.state = {
            nowLive: [],
            streams: null

        }
    }
    componentDidUpdate(prevProps) {
        const {activeStreamers, networkrequest} = this.props;

        if ((prevProps.activeStreamers !== activeStreamers) && networkrequest >= 2) {
          const oldnames = prevProps.activeStreamers.map(stream => stream.name);
           const newnames = activeStreamers.map(stream => stream.name);

           const diff = _.difference(newnames, oldnames);
               this.setState({nowLive: diff});
           setTimeout(() => {
                this.setState({nowLive: []});
           }, 10000)
        }
    }
    render() {
    const {nowLive} = this.state;
      if (!nowLive.length > 0) {
          return (
              <div className="notify" style={this.styles.card}></div>
          );
      }


        return (
            <div className="notify act" style={this.styles.card}>{this.updateStream()}</div>
        );
    }
    updateStream() {
        const {nowLive} = this.state;
        return nowLive.map(stream => {
            return (
                <div key={uuid()} className="flexme" style={this.styles.card}><span>{stream} has gone online!</span></div>
            );
        })
    }
}
function getProps({activeStreamers, networkrequest}) {
    return {
        activeStreamers,
        networkrequest
    };
}

export default connect(getProps)(Notification);
