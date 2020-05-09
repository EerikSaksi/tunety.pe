const fetch = require('node-fetch');
const X2JS = require('x2js');
function youtube_captions(url) {
  //extract the id of the url
  var id = url.split('v=')[1];
  var ampersandPosition = id.indexOf('&');
  if (ampersandPosition != -1) {
    id = id.substring(0, ampersandPosition);
  }
  return (
    fetch(`http://video.google.com/timedtext?lang=en&v=${id}`)
      .then((response) => {
        if (response.ok) {
          return response.text()
        }
      })
      .then((text) => {
        return text.toLowerCase().replace(/\[.\,\/#!$%\^&\*;:{}\=\-_~()\]/g,"");
      })
      .then((text) => {
        var x2js = new X2JS();
        const xml = x2js.xml2js(text);
        //"dur": 
        var id = 0;
        return [{"sleepAfter": xml.transcript.text[0]._start}].concat(...xml.transcript.text.map((caption, i, captions) => {
          var intervalDuration = (i == captions.length - 1) ? caption._dur : captions[i + 1]._start - captions[i]._start
          const words = caption.__text.split(" ");
          const wordDuration = caption._dur / words.length
          return words.map((word, wi, words) => {
            //if last word of this caption, allocate the remaining inteval duration to this word. Otherwise add the average duration length.
            const sleepTime = (wi == words.length - 1) ? intervalDuration : wordDuration;

            //subtract allocated time from the intervalDuration that will be allocated to the last word.
            intervalDuration -= sleepTime;
            return ({'dur': 3, 'sleepAfter': sleepTime, 'text': word.replace(/&#39;/g, "'")      + " ", 'horizontalPosition': Math.floor(Math.random() * 100), 'id': id++ })
          })
        }))
      })
  )
}
module.exports = youtube_captions;
