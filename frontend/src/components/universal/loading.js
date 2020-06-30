import React from 'react'
import Image from 'react-bootstrap/Image'
export default function Loading({style}) {
  return (
    <Image style={style} src = {require('../../loading.gif')} ></Image >
  )
}

