import React, { useState } from 'react';
import Comments from './Comments';
import Modal from '../Util/Modal';
import '../../style/common.css';

const VideoDetail = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!video) {
    return <div>Please search a video to watch</div>;
  }

  const onClose = () => {setIsOpen(false)};
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  const displayComments = () => {
    setIsOpen(true);
  };

  return (
    <div className="video-detail">
      <div className="video-detail-player">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="video-detail-info">
        <h2>{video.snippet.title}</h2>
        <p>{video.snippet.description}</p>
      </div>
      <button className="animated-button" onClick={displayComments}>
      {'Show Comments'}
    </button>
    <Modal isOpen={isOpen} onClose={onClose} children={<Comments videoId={video.id.videoId} /> }/> 
    </div>
  );
};

export default VideoDetail;
