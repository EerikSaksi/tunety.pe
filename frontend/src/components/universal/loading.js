import React from 'react'
import Image from 'react-bootstrap/Image'

export default function Loading({style, centered}) {
  const loading = <Image style={style} src={require('../../loading.gif')}></Image >
  if (centered) {
    return (
      <div style={{left: 0, right: 0}}>
        <div style={{position: 'absolute', left: '50%', transform: 'translate(-50%, 0px)'}}>{loading}</div>
      </div>
    )
  }
  return (loading)
}

