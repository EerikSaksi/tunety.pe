var parseString = require('xml2js').parseString;
const fetch = require('node-fetch')
fetch('http://video.google.com/timedtext?type=list&v=zzfCVBSsvqA')
.then((response) => {
  if (response.ok){ 
    return response.text()
  }
})
.then((text) => {
  parseString(text, (err, result) => {
    result.transcript_list.track.forEach(t => console.log(t.$))
  });
})

