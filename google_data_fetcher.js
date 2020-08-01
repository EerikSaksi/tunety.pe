const {google_client} = require('./auth')
const fetch = require('node-fetch');
const {SchemaError} = require('apollo-server');
const moment = require('moment')
async function youtubeSearch(query) {
  var url = new URL("https://www.googleapis.com/youtube/v3/search")
  const params = {key: google_client, q: query, part: 'snippet'}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return await fetch(url.href)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      if (!json.items) {
        throw new SchemaError('Out of youtube dollas')
      }
      return (json.items.reduce((items, item) => {
        if (item.id.videoId) {
          return items.concat({
            id: item.id.videoId,
            text: item.snippet.title,
            imgUrl: item.snippet.thumbnails.default.url,
            origin: 'youtube'
          })
        }
        return items
      }, [])
      )
    })

}
async function youtubeVideo(url, fields) {

  var video_id = url.split('v=')[1];
  if (!video_id){
    return null
  }
  var ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  var toReturn = {}
  if (fields.duration) {
    var googleUrl = new URL("https://www.googleapis.com/youtube/v3/videos")
    const params = {id: video_id, part: 'contentDetails', key: google_client}
    Object.keys(params).forEach(key => googleUrl.searchParams.append(key, params[key]))
    await fetch(googleUrl.href)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.error){
          return null
        }
        toReturn = {'duration': moment.duration(json.items[0].contentDetails.duration).asSeconds()}
      })
  }

  await fetch("https://www.youtube.com/oembed?format=json&url=" + url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      toReturn = {
        ...toReturn,
        id: video_id,
        imgUrl: json.thumbnail_url,
        text: json.title,
        origin: 'youtube'
      }
    })
    .catch(() => {
      return null
    })

  return toReturn
}
exports.youtubeSearch = youtubeSearch
exports.youtubeVideo = youtubeVideo
