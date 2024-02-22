import { useState, useEffect, useRef } from "react";

function Music() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const savedCurrentTrackIndex = localStorage.getItem("currentTrackIndex");
    if (savedCurrentTrackIndex !== null) {
      setCurrentTrackIndex(parseInt(savedCurrentTrackIndex));
    }
  }, []);

  useEffect(() => {
    if (currentTrackIndex !== null && playlist[currentTrackIndex]) {
      const track = playlist[currentTrackIndex];
      audioRef.current.src = URL.createObjectURL(track);
      audioRef.current.play();
    }
  }, [currentTrackIndex, playlist]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setPlaylist([...playlist, ...files]);
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const getCurrentTrackName = () => {
    if (currentTrackIndex !== null && playlist[currentTrackIndex]) {
      return playlist[currentTrackIndex].name || "Unknown Track";
    }
    return "";
  };

  return (
    <div className="flex min-h-[100vh] flex-col lg:flex-row  bg-gray-600 text-white">
      <div className="lg:w-1/2 p-8 border-2 border-gray-300 w-[400px] gap-8 flex  flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Music Player</h1>

        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="text-lg font-semibold mb-2">
            Now Playing: {getCurrentTrackName()}
          </h2>
          <audio
            ref={audioRef}
            controls // This adds the default controls for play/pause, volume, etc.
            className="mb-4"
          />
        </div>
        <input
          type="file"
          accept="audio/mp3"
          multiple
          onChange={handleFileUpload}
          className="mb-4"
        />
      </div>
      <div className="lg:w-1/2 p-8 items-center justify-center flex flex-col">
        <h2 className="text-xl font-bold mb-4">Playlist</h2>
        <ul
          role="list"
          className="border-4 divide-gray-400 w-[550px] min-h-[300px]"
        >
          {playlist.map((track, index) => (
            <li key={index} className="flex justify-between gap-x-6">
              <div className="flex min-w-0  ">
                <div className="min-w-0 flex-auto">
                  <button
                    onClick={() => playTrack(index)}
                    className="text-sm font-semibold leading-6 border border-gray-300 m-2 p-2 text-gray-300 hover:opacity-50"
                  >
                    {track.name || "Unknown Track"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Music;
