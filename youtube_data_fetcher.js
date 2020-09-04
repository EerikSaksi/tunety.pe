const fetch = require('node-fetch');
const { SchemaError } = require('apollo-server');
const moment = require('moment');
require('dotenv').config();

async function youtubeSearch(query) {
  var url = new URL('https://www.googleapis.com/youtube/v3/search');
  const params = { key: process.env.GOOGLE_CLIENT, q: query, part: 'snippet' };
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  return await fetch(url.href)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (!json.items) {
        throw new SchemaError('Out of youtube dollas');
      }
      return json.items.reduce((items, item) => {
        debugger
        if (item.id.videoId) {
          return items.concat({
            id: item.id.videoId,
            bottomText: item.snippet.title,
            topText: item.snippet.channelTitle,
            imgUrl: item.snippet.thumbnails.high.url,
            origin: 'youtube',
          });
        }
        return items;
      }, []);
    });
}
async function youtubeVideo(url, fields) {
  var video_id = url.split('v=')[1];
  if (!video_id) {
    return null;
  }
  var ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  var toReturn = {};
  if (fields.duration) {
    var googleUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    const params = { id: video_id, part: 'contentDetails', key: process.env.GOOGLE_CLIENT };
    Object.keys(params).forEach((key) => googleUrl.searchParams.append(key, params[key]));
    await fetch(googleUrl.href)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          return null;
        }
        toReturn = { duration: moment.duration(json.items[0].contentDetails.duration).asSeconds() };
      });
  }

  await fetch('https://www.youtube.com/oembed?format=json&url=' + url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      toReturn = {
        ...toReturn,
        id: video_id,
        imgUrl: json.thumbnail_url,
        bottomText: json.title,
        topText: json.author_name
      };
    })
    .catch(() => {
      return null;
    });
  return toReturn;
}
exports.youtubeSearch = youtubeSearch;
exports.youtubeVideo = youtubeVideo;
