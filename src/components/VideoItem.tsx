import React from "react";
import { Video } from "../utils/types";

interface VideoItemProps {
  video: Video;
  onSelect: (video: Video) => void;
  onLike: (id: number) => void;
  liked: boolean;
}

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  onSelect,
  onLike,
  liked,
}) => {
  return (
    <div
      className="border border-[#1CA894] rounded-lg overflow-hidden shadow-lg flex flex-col"
      role="button"
      tabIndex={0} 
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold truncate">{video.title}</h3>
        <p className="text-gray-600">{video.duration}</p>
        <div className="mt-auto flex justify-between gap-4">
          <button
            onClick={() => onSelect(video)}
            className="mt-2 bg-[#1CA894] text-white px-4 py-2 rounded"
            aria-label={`Watch ${video.title}`}
          >
            Watch
          </button>
          <button
            onClick={() => onLike(video.id)}
            className={`mt-2 ${
              liked ? "bg-red-500" : "bg-gray-300"
            } text-white px-4 py-2 rounded`}
            aria-label={liked ? "Unlike this video" : "Like this video"}
          >
            {liked ? "Unlike" : "Like"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
