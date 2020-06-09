const {google_client} = require('./auth')
const fetch = require('node-fetch');

async function youtube_search(query){
  var url = new URL("https://www.googleapis.com/youtube/v3/search")
  const params = {key: google_client, q: query, part: 'snippet'}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  console.log(url.href)

  return await fetch(url.href)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    return (json.items.forEach(item => {
      return {
        id : item.id.videoId,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.default.url
      }
    }))
  })
}
youtube_search('carnifex')
exports.youtube_search = youtube_search
