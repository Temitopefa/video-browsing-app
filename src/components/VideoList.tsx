import React from 'react';
import { Video } from '../utils/types';
import VideoItem from './VideoItem';

interface VideoListProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  onLike: (id: number) => void;
  likedVideos: number[];
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect, onLike, likedVideos }) => {
  return (
    <div role="list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {videos.map(video => (
        <VideoItem
          key={video.id}
          video={video}
          onSelect={onVideoSelect}
          onLike={onLike}
          liked={likedVideos.includes(video.id)}
        />
      ))}
    </div>
  );
};

export default VideoList;
