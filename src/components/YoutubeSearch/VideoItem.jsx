import React from 'react';

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <div className="video-item" onClick={() => onVideoSelect(video)}>
      <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
      <div className="video-item-details">
        <h4>{video.snippet.title}</h4>
        <p>{video.snippet.channelTitle}</p>
      </div>
    </div>
  );
};

export default VideoItem;
