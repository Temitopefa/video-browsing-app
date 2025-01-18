import React, { useEffect, useState } from "react";
import { Video } from "./utils/types";
import SearchBar from "./components/searchbar/SearchBar";
import VideoDetails from "./components/VideoDetails";
import VideoList from "./components/VideoList";

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleLike = (id: number) => {
    setLikedVideos((prev) => {
      if (prev.includes(id)) {
        return prev.filter((videoId) => videoId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); 
  };

  return (
    <div className="container mx-auto p-4 bg-[#ffff] mt-4">
      <div className="w-[50%]">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {selectedVideo ? (
        <VideoDetails
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onLike={handleLike}
          likedVideos={likedVideos}
        />
      ) : (
        <>
          <VideoList
            videos={filteredVideos.slice(0, visibleCount)} 
            onVideoSelect={setSelectedVideo}
            onLike={handleLike}
            likedVideos={likedVideos}
          />
          {visibleCount < filteredVideos.length && ( 
            <button
              onClick={loadMore}
              className="mt-4 bg-[#1CA894] text-white px-4 py-2 rounded"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;
