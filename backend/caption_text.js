const fetch = require('node-fetch')
const {client_id, secret} = require('./genius_auth');
const credentials = {
  client: {
    id: client_id,
    secret: secret
  },
  auth: {
    tokenHost: 'https://api.genius.com'
  }
};
const oauth2 = require('simple-oauth2').create(credentials);
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
        artistName: hit.result.primary_artist.name,
        songName:hit.result.title,
      }
    })
  })
}
async function getDisplayLyrics(id){
  const token = await oauth2.clientCredentials.getToken();
  const lyricist = new Lyricist(token.access_token);
  const song = await lyricist.song(id, { fetchLyrics: true });
  return song.lyrics.split('\n')
}
async function getProcessedLyrics(id){
  const token = await oauth2.clientCredentials.getToken();
  const lyricist = new Lyricist(token.access_token);
  const song = await lyricist.song(id, { fetchLyrics: true });
  var lyrics = song.lyrics
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
