import React, {useState} from 'react';
import SearchResultForm from './search_results_form'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';
const QUERY = gql`
query geniussearchresults($query: String){
  geniusSearchResults(query: $query){
    id 
    imgUrl
    text
    isYoutube
  }
}`
export default function Home() {
  //input of the form, passed to the form but declared here as required for checking if data needs to be fetched
  const [input, setInput] = useState('');
  const {data, loading} = useQuery(QUERY, {
    variables: {query: input},
    skip: input === ''
  });
  //provide format url for isYoutube and not isYoutube
  //specifies how to format the url extension given an id and whether it's a youtube id
  return (
    <SearchResultForm results={data ? data.geniusSearchResults : undefined} input={input} setInput={setInput} formText={"Search for an artist and/or song or enter YouTube URL"} loading={loading} />
  )
}
