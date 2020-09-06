import React, { useEffect, useState, memo } from 'react';
import Button from 'react-bootstrap/Button';
import { DraggableCore } from 'react-draggable';

export default function PreviewLyric({
  id,
  text,
  time,
  timePixelOffset,
  changeLyricById,
  videoDuration,
  width,
  playing,
  setPlaying,
}) {
  const [buttonVariant, setButtonVariant] = useState('primary');
  const [transitionTime, setTransitionTime] = useState(130);
  useEffect(() => {
    //videoDuration is updated every 500 seconds. if the videoDuration would match the time before the next time update, sleep the difference and at the end of it indicate that this is the current time
    if (time - videoDuration <= 0.5 && time - videoDuration > 0) {
      const sleepAndUpdate = async () => {
        await new Promise((resolve) => setTimeout(resolve, (time - videoDuration) * 1000));
        setButtonVariant('warning');
        await new Promise((resolve) => setTimeout(resolve, 500));
        setButtonVariant('primary');
      };
      sleepAndUpdate();
    }
  }, [videoDuration, time]);

  //this is the pixel offset that the client sees. This is because sometimes we want to use the offset based on the time of this lyric, and other times the offset of the element being currently dragged
  const [clientPixelOffset, setClientPixelOffset] = useState(timePixelOffset);

  //whether or not we are dragging an element, used to remove margin transitions and to temporarily stop an element from moving around
  const [dragging, setDragging] = useState(false);

  const handleStopDragging = async (pixelOffset) => {
    var deltaTime = pixelOffset / width;

    //normalize 0 to 1 ratio between -5 and 5
    deltaTime = (deltaTime - 0.5) * 10;

    //set the transition time to 1, and pause the video for 1 seconds to smoothly animate the lyrics moving back two secodns
    setTransitionTime(1000);
    const wasPlaying = playing;
    setPlaying(false);

    //set the time of this lyric to be the current time plus the amount that the lyric is offset from the current time
    changeLyricById(id, videoDuration + deltaTime);
    setDragging(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (wasPlaying) {
      setPlaying(true);
    }
    setTransitionTime(130);
  };

  //when the video is playing, the time pixel offset changes which messes with the element we are dragging
  useEffect(() => {
    if (!dragging) {
      setClientPixelOffset(timePixelOffset);
    }
  }, [timePixelOffset, dragging]);

  return (
    <>
      <DraggableCore
        axis={'x'}
        onStart={() => setDragging(true)}
        onStop={() => handleStopDragging(clientPixelOffset)}
        onDrag={(event) => {
          const { movementX, clientX, screenX } = event;
          setClientPixelOffset((clientPixelOffset) => movementX * (clientX / screenX) + clientPixelOffset);
          setTransitionTime(0);
        }}
      >
        <Button
          key={id}
          variant={buttonVariant}
          style={{
            transition: `transform linear ${transitionTime}ms`,
            position: 'absolute',
            alignSelf: 'center',
            transform: `translate(${clientPixelOffset}px, 0px)`,
            justifyContent: 'start',
          }}
        >
          <p style={{ fontSize: '30px' }}>{text}</p>
        </Button>
      </DraggableCore>
    </>
  );
}
