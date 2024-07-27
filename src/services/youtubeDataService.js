import axios from 'axios';

const API_KEY = 'AIzaSyDqIqgabJLr9eWnNVNYldugjHMmd88CqPc';

export const searchYouTube = async (searchTerm, nextPageToken = null) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: searchTerm,
        pageToken: nextPageToken,
        key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};
