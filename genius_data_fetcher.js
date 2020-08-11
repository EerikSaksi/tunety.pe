const fetch = require('node-fetch');
const { genius_client, genius_secret } = require('./auth');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const credentials = {
  client: {
    id: genius_client,
    secret: genius_secret,
  },
  auth: {
    tokenHost: 'https://api.genius.com',
  },
};
const oauth2 = require('simple-oauth2').create(credentials);

async function geniusSong(id) {
  const token = await oauth2.clientCredentials.getToken();
  return fetch(`https://api.genius.com/songs/${id}`, {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token.access_token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return {
        id: json.response.song.id,
        forwardingUrl: `/genius/${json.response.song.id}`,
        imgUrl: json.response.song.header_image_url,
        text:
          json.response.song.primary_artist.name +
          ' - ' +
          json.response.song.title,
        artistName: json.response.song.primary_artist.name,
        songName: json.response.song.title,
      };
    });
}
async function geniusSearch(query) {
  console.log({ genius_client, genius_secret });
  const token = await oauth2.clientCredentials.getToken();
  console.log('wowwa');
  return await fetch(`https://api.genius.com/search?q=${query}`, {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token.access_token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const toReturn = json.response.hits.map((hit) => {
        return {
          id: hit.result.id,
          forwardingUrl: `/genius/${json.response.song.id}`,
          imgUrl: hit.result.header_image_url,
          text: hit.result.primary_artist.name + ' - ' + hit.result.title,
        };
      });

      return toReturn;
    });
}
async function getDisplayLyrics(id) {
  return await fetch(`https://genius.com/songs/${id}`)
    .then((response) => {
      if (!response.ok) {
        return undefined;
      }
      return response.text();
    })
    .then(async (text) => {
      const { document } = new JSDOM(text).window;
      //response should contain a p element inside two unique divs containing all lyrics
      var response = document.querySelector(
        'div.song_body-lyrics div.lyrics p'
      );
      //sometimes this p does not exist, requery if this is the case
      if (response && response.innerHTML) {
        return response.innerHTML.replace(/<[^>]*>?/gm, '').split('\n');
      } else {
        return await getDisplayLyrics(id);
      }
    });
}
async function getProcessedLyrics(id) {
  var lyrics = await getDisplayLyrics(id);
  var toReturn = [];
  var id = 0;
  lyrics.forEach((line) => {
    if (line[0] !== '[' && line !== '') {
      toReturn.push(
        line
          .split(/[^A-Za-z0-9']/)
          .filter((word) => {
            return word !== '';
          })
          .map((word) => {
            return { text: word, id: id++ };
          })
      );
    }
  });
  return toReturn;
}
exports.getDisplayLyrics = getDisplayLyrics;
exports.getProcessedLyrics = getProcessedLyrics;
exports.geniusSearch = geniusSearch;
exports.geniusSong = geniusSong;
