import React, {useEffect, useState} from 'react'
export default function useMarginConversion(diff, dragging){
  const [marginLeft, setMarginLeft] = useState(`${(diff + 5) * 8}%`)

  useEffect(() => {
    //if we are dragging the element around, dont change the margin value
    if (dragging) {
      setMarginLeft(marginLeft => marginLeft)
    }
    else {
      setMarginLeft(`${(diff + 5) * 8}%`)
    }
  }, [diff])
  return {marginLeft}
}
