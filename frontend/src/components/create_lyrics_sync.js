import React from 'react';
import { gql } from 'apollo-boost'
import { usequery } from '@apollo/react-hooks';
const query = gql`
  query youtubesearchresults($query: string){
    youtubeSearchResults(query: $query){
      id
      text
      imgUrl
    }
  }
`
const query = gql`
  query youtubesearchresults($query: string){
    youtubeSearchResults(query: $query){
      id
      text
      imgUrl
    }
  }
`
export default function CreateLyricsSync(){
  let {y, g} = useParams();
  if (g) {
    if (!y){}
  }
}
