const fetch = require('node-fetch');
const { CachedLyrics } = require('./orm');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
require('dotenv').config();
const credentials = {
  client: {
    id: process.env.GENIUS_CLIENT,
    secret: process.env.GENIUS_SECRET,
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
        topText: json.response.song.primary_artist.name,
        bottomText: json.response.song.title,
        artistName: json.response.song.primary_artist.name,
        songName: json.response.song.title,
      };
    });
}
async function geniusSearch(query) {
  const token = await oauth2.clientCredentials.getToken();
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
          forwardingUrl: `/genius/${hit.result.id}`,
          imgUrl: hit.result.header_image_url,
          topText: hit.result.primary_artist.name,
          bottomText: hit.result.title,
        };
      });
      return toReturn;
    });
}
async function getDisplayLyrics(id) {
  //check cache for lyrics
  const cachedLyrics = await CachedLyrics.findOne({ where: { geniusID: id } });
  if (cachedLyrics) {
    return cachedLyrics.lyrics.split('\n');
  }

  //if a recursive call is made, we do not want this parent to write to the cache to avoid creating two cached objects
  var writeToCache = true;
  const lyrics = await fetch(`https://genius.com/songs/${id}`)
    .then((response) => {
      if (!response.ok) {
        return undefined;
      }
      return response.text();
    })
    .then(async (text) => {
      const { document } = new JSDOM(text).window;
      //response should contain a p element inside two unique divs containing all lyrics
      var response = document.querySelector('div.song_body-lyrics div.lyrics p');
      //sometimes this p does not exist, requery if this is the case
      if (response && response.innerHTML) {
        return response.innerHTML.replace(/<[^>]*>?/gm, '').split('\n');
      } else {
        writeToCache = false;
        return await getDisplayLyrics(id);
      }
    });

  if (writeToCache) {
    await CachedLyrics.create({ lyrics: lyrics.join('\n'), geniusID: id });
  }
  return lyrics;
}
async function getProcessedLyrics(geniusID) {
  var displayLyrics = await getDisplayLyrics(geniusID);
  var lyrics = [];
  var id = 0;
  var wordCount = 0;

  //iterate over each line
  displayLyrics.forEach((line) => {
    //remove meta lyrics such as [verse 1] and empty spacing lyrics
    if (line[0] !== '[' && line !== '') {
      //split the line on any whitespace, filtering empty words, and append id to it
      lyrics.push(
        line
          .split(/[\s*]/)
          .filter((text) => {
            return text !== '';
          })
          .map((text) => {
            wordCount += text.length;
            return { text, id: id++ };
          })
      );
    }
  });


  //calculate the word count to be the total characters divided by 5
  wordCount = Math.floor(wordCount / 5);


  await CachedLyrics.update({ wordCount }, { where: { geniusID } });
  return lyrics;
}
async function getWordCount(geniusID) {
  const cached = await CachedLyrics.findOne({ where: { geniusID } });
  //if the wordCount has not been cached, fetch and process the lyrics (lyrics and wordCount will be added to the cache)
  if (!cached || !cached.wordCount) {
    await getProcessedLyrics(geniusID);
  }
  const { wordCount } = await CachedLyrics.findOne({ where: { geniusID } });
  return wordCount;
}
exports.getDisplayLyrics = getDisplayLyrics;
exports.getProcessedLyrics = getProcessedLyrics;
exports.geniusSearch = geniusSearch;
exports.geniusSong = geniusSong;
exports.getWordCount = getWordCount;
