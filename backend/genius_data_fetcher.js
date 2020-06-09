const fetch = require('node-fetch')
const {genius_client_id, genius_secret} = require('./auth');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const credentials = {
  client: {
    id: genius_client_id,
    secret: genius_secret
  },
  auth: {
    tokenHost: 'https://api.genius.com'
  }
};
const oauth2 = require('simple-oauth2').create(credentials);

async function geniusSong(id){
  const token = await oauth2.clientCredentials.getToken();
  return fetch(`https://api.genius.com/songs/${id}`,   {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Authorization': 'Bearer ' + token.access_token
    }
  })
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    return {
      id: response.song.id,
      imgUrl: response.song.header_image_url,
      text: response.song.primary_artist.name_+ " - " + response.song.title,
    }
  })
}
async function geniusSearch(query){
  const token = await oauth2.clientCredentials.getToken();
  return fetch(`https://api.genius.com/search?q=${query}`,   {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Authorization': 'Bearer ' + token.access_token
    }
  })
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    return json.response.hits.map((hit) => {
      return {
        id: hit.result.id,
        imgUrl: hit.result.header_image_url,
        text: hit.result.primary_artist.name_+ " - " + hit.result.title,
      }
    })
  })
}
async function getDisplayLyrics(id){
  return await fetch(`https://genius.com/songs/${id}`)
  .then((response) => {
    return (response.text())
  })
  .then(async (text) => {
    const { document } = (new JSDOM(text)).window;
    //response should contain a p element inside two unique divs containing all lyrics
    var response = document.querySelector('div.song_body-lyrics div.lyrics p')
    //sometimes this p does not exist, requery if this is the case
    if (response && response.innerHTML){
      return (response.innerHTML.replace(/<[^>]*>?/gm, '').split('\n'))
    }
    else {
      return await getDisplayLyrics(id)
    }
  })
}
async function getProcessedLyrics(id){
  var lyrics = getDisplayLyrics()
  lyrics = lyrics.toLowerCase();

  //remove lines such as [chorus]
  lyrics = lyrics.split('\n').filter(line => {
    return (line[0] !== '[')
  })

  //tokenize
  lyrics = lyrics.split(' ')

  //strip punctuation
  return lyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
} 
exports.getDisplayLyrics = getDisplayLyrics
exports.getProcessedLyrics = getProcessedLyrics
exports.geniusSearch = geniusSearch
exports.geniusSong = geniusSong
