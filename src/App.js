import React, { useState, useEffect, useCallback } from 'react';
import { searchYouTube } from './services/youtubeDataService';
import VideoList from './components/YoutubeSearch/VideoList';
import VideoDetail from './components/YoutubeSearch/VideoDetail';
import './App.css';
import SearchBar from './components/YoutubeSearch/Searchbar';
import Footer from './Footer';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBottomReached, setIsBottomReached] = useState(false);
  const [currentSearchAPICount, setCurrentSearchAPICount] = useState(0);
  const apiRateLimit = 3;

  // Function to handle the initial search and reset state
  const handleSearch = async (term) => {
    setSearchTerm(term);
    setLoading(true);

    try {
      setVideos([]);
      const data = await searchYouTube(term);
      setVideos(data.items);
      setSelectedVideo(data.items[0]);
      setNextPageToken(data.nextPageToken);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Function to load more videos for infinite scroll bar
  const loadMoreVideos = useCallback(async () => {
    if(currentSearchAPICount >= apiRateLimit) {
      return;
    }
    
    setCurrentSearchAPICount(curr => curr+1);
    if (!nextPageToken || loading) return;

    setLoading(true);

    try {
      const data = await searchYouTube(searchTerm, nextPageToken);
      setVideos((prevVideos) => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [nextPageToken, searchTerm, loading]);

  // Throttle the scroll event handler to improve performance
  const handleScroll = useCallback(() => {
    if (loading || isBottomReached) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 100;

    if (isBottom) {
      setIsBottomReached(true);
      loadMoreVideos().finally(() => setIsBottomReached(false));
    }
  }, [loadMoreVideos, loading, isBottomReached]);

  // Effect to add and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Function to set the selected video for detailed view
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>YouTube Video Search</h1>
        <p>Find and explore amazing videos from YouTube</p>
      </header>
      <SearchBar onSearch={handleSearch} />
      <div className="content">
        <VideoDetail video={selectedVideo} />
        <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
      </div>
      {loading && <div className="loading">Loading...</div>}
      <Footer />
    </div>
  );
};

export default App;

