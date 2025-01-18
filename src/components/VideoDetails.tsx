import React, { useState } from 'react';
import { Video } from '../utils/types';
import ReactPlayer from 'react-player';

interface VideoDetailsProps {
  video: Video;
  onClose: () => void;
  onLike: (id: number) => void;
  likedVideos: number[];
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  video,
  onClose,
  onLike,
  likedVideos,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      role="dialog"
      aria-labelledby="video-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/2 max-h-screen overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-red-500" aria-label="Close video details">
            Close
          </button>
        </div>

        <h2 id="video-title" className="text-xl font-bold">{video.title}</h2>

        {loading && (
          <div className="flex items-center justify-center h-48">
            <div className="loader">Loading...</div>
          </div>
        )}

        <ReactPlayer
          url={video.videoUrl}
          controls
          width="100%"
          className="mt-2"
          onReady={() => setLoading(false)} 
          style={{ display: loading ? "none" : "block" }}
        />

        <p className="mt-2 max-h-32 overflow-y-auto text-gray-700" aria-label="Video description">
          {video.description}
        </p>

        <button
          onClick={() => onLike(video.id)}
          className={`mt-2 ${
            likedVideos.includes(video.id) ? "bg-red-500" : "bg-gray-300"
          } text-white px-4 py-2 rounded`}
          aria-label={likedVideos.includes(video.id) ? "Unlike this video" : "Like this video"}
        >
          {likedVideos.includes(video.id) ? "Unlike" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default VideoDetails;
