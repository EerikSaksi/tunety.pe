import React, {forwardRef} from 'react';
import CustomCard from 'components/universal/custom_card'
import ReactPlayer from 'react-player'
const VideoCard = forwardRef(({inView, children}, playerRef) => {
  return (
    <CustomCard inView={inView}>
      <div  style={{position: 'relative', paddingTop: '56.25%'}} >
        <ReactPlayer
          ref={playerRef}
          playing={inView}
          url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
style={{minWidth: '100%', minHeight: '100%', position: 'absolute', left: 0, top: 0}}
          controls = {false}
      />
      {children}
      </div>
    </CustomCard>
  )
  }
)
export default VideoCard
