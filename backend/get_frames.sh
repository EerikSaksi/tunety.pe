#/bin/sh
fps=2
#get the duration of the video
duration=$(ffprobe -i caption_video.mp4 -show_format | grep duration)
#convert the duration to an integer
duration=$((${duration%.*}))

#calculate the number of frames to process
frames=$((duration * fps))
for i in $(seq 0 $frames); 
do
  ffmpeg -accurate_seek -ss `echo $((i/fps)) | bc` -i caption_video.mp4  -frames:v 1 ./frames/frame$i.jpg
done;
