import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { YOUTUBE_API_KEY } from '../../constants/secrets';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  const fetchComments = async (pageToken = '') => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
        params: {
          part: 'snippet',
          videoId,
          key: YOUTUBE_API_KEY,
          maxResults: 10, // Fetch 10 comments at a time
          pageToken,
        },
      });

      setComments((prevComments) => [...prevComments, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken);
    } catch (err) {
      setError('Failed to fetch comments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreComments = () => {
    if (nextPageToken) {
      fetchComments(nextPageToken);
    }
  };

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading comments...</p>}
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p className="comment-author">
            {comment.snippet.topLevelComment.snippet.authorDisplayName}
          </p>
          <p className="comment-text">
            {comment.snippet.topLevelComment.snippet.textDisplay}
          </p>
        </div>
      ))}
      {nextPageToken && (
        <button onClick={loadMoreComments} className="load-more-button">
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default Comments;
