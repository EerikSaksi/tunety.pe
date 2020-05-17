const Tesseract = require('tesseract.js');
const { createWorker } = Tesseract;
const fs = require('fs')
const youtubedl = require('youtube-dl')
const path = require('path');
var exec = require('child_process').exec;


async function getCaptions(){
  const video = youtubedl('https://www.youtube.com/watch?v=HgS_kSkZC1A',
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname })

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Download started')
    console.log('filename: ' + info._filename)
    console.log('size: ' + info.size)
  })
  video.pipe(fs.createWriteStream('caption_video.mp4'));
  video.on('end', function end() {
    if (!fs.existsSync('frames')){
        fs.mkdirSync('frames');
    }
    exec(`ffmpeg -i caption_video.mp4 -r 1/1 frames/%03d.bmp`,
    function (error, stdout, stderr) {
         console.log('stdout: ' + stdout);
         console.log('stderr: ' + stderr);
         if (error !== null) {
              console.log('exec error: ' + error);
         }
     });
  })
}
//getCaptions();
async function perform_ocr(){
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  for (var i = 1; i <= 291; i++){
    var i_padded = i.toString();
    while (i_padded.length < 3){
      i_padded = "0" + i_padded;
    }
    await worker.recognize(`frames/${i_padded}.bmp`)
    .then(({data:{text}}) => {
      console.log(text);
    })
  }
  console.log(captions);
}
getCaptions();
perform_ocr();
