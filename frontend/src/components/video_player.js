import React from 'react';
import ReactPlayer from 'react-player';
export default class extends React.Component{
    constructor(props){
      super(props)
      this.state = {opacity: 1}
    }

    render(){
      const {controls, url, playing, setStarted} = this.props;
      return (
        <ReactPlayer
          controls = {controls}
          style={{transition: 'opacity 0.5s', opacity: this.state.opacity}}
          className='top_center'
          playing={playing}
          url={url}
          onStart={() => {
            this.setState({opacity: 0})
            setStarted(true)
          }}
        />
      )
    }
}

