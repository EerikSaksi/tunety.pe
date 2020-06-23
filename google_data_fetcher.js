const {google_client} = require('./auth')
const fetch = require('node-fetch');
const {UserInputError} = require('apollo-server')
async function youtubeSearch(query){
  var url = new URL("https://www.googleapis.com/youtube/v3/search")
  const params = {key: google_client, q: query, part: 'snippet'}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return await fetch(url.href)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    return (json.items.reduce((items, item) => {
      if (item.id.videoId){
        return items.concat({
          id : item.id.videoId,
          text: item.snippet.title,
          imgUrl: item.snippet.thumbnails.default.url,
          isYoutube: true
        })
      }
      return items
    }, []))
  })
}
async function youtubeVideo(url){
  return await fetch("https://www.youtube.com/oembed?format=json&url=" + url)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    //extract the video id of the url "if it exists"
    var video_id = url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return {
      id : video_id,
      imgUrl: json.thumbnail_url, 
      text: json.title,
      isYoutube: true
    }
  })
  .catch((error) => {
    return undefined
  })
}
exports.youtubeSearch = youtubeSearch
exports.youtubeVideo = youtubeVideo
