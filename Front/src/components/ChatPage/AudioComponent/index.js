import React, { useEffect, useRef, useState } from "react";
import {
  AudioPlayer,
  Layout,
  PlayButton,
  Player,
  Timeline,
  User,
} from "./style";
import PropTypes from "prop-types";

const AudioComponent = ({ url, isMe, profileImage, downloadAudio }) => {
  const audioPlayer = useRef(null);
  const sliderRef = useRef(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const audioInstance = new Audio(url);
    setAudio(audioInstance);

    audioInstance.onplay = () =>
      audioPlayer.current.classList.add("playing");
    audioInstance.onpause = () =>
      audioPlayer.current.classList.remove("playing");
    audioInstance.onloadeddata = () =>
      audioPlayer.current.classList.remove("loading");
    audioInstance.ondurationchange = showTimeDuration;
    audioInstance.onended = () => (audioInstance.currentTime = 0);
    audioInstance.ontimeupdate = updateCurrentPercent;

    return () => {
      audioInstance.pause();
      audioInstance.src = ""; // This is to release the audio file.
    };
  }, [url]);

  const onClickPlay = () => {
    if (audio) {
      audio.paused ? audio.play() : audio.pause();
    }
  };

  const formatTimeToDisplay = (seconds) => {
    const milliseconds = seconds * 1000;
    return new Date(milliseconds).toISOString().substr(14, 5);
  };

  const handleSlider = (e) => {
    if (audio) {
      const percent = e.target.value;
      audio.currentTime = (percent * audio.duration) / 100;
    }
  };

  const showTimeDuration = () => {
    if (audio) {
      const durationDisplay = formatTimeToDisplay(audio.duration);
      updateCurrentTimeDisplay(durationDisplay);
    }
  };

  const updateCurrentTimeDisplay = (time) => {
    audioPlayer.current.style.setProperty(
      "--player-current-time",
      `'${time}'`
    );
  };

  const updateCurrentPercent = () => {
    if (audio) {
      const percentPlayed = (audio.currentTime * 100) / audio.duration;
      sliderRef.current.value = percentPlayed;
      audioPlayer.current.style.setProperty(
        "--player-percent-played",
        `${percentPlayed}%`
      );
    }
  };

  return (
    <Layout>
      <AudioPlayer className="audio-player" ref={audioPlayer} isMe={isMe}>
        <Player className="player">
          <PlayButton
            type="button"
            className="btn-play"
            onClick={onClickPlay}
          >
            <span className="material-icons icon-play">play_arrow</span>
            <span className="material-icons icon-pause">pause</span>
            <span className="material-icons icon-loop">loop</span>
          </PlayButton>

          <Timeline className="timeline">
            <div className="line">
              <input
                dir="ltr"
                type="range"
                min="0"
                max="100"
                value="0"
                ref={sliderRef}
                onInput={handleSlider}
              />
            </div>

            <div className="data">
              <div className="current-time" />
              <div className="time"></div>
            </div>
          </Timeline>


          </Player>
            <User className="user">
              <img src={profileImage} alt={"ProfileImg"} />
              <span className="material-icons">mic</span> 
          </User> 
      </AudioPlayer>

    </Layout>
  );
};

export default AudioComponent;

AudioComponent.propTypes = {
  url: PropTypes.string,
  isMe: PropTypes.bool.isRequired,
  profileImage: PropTypes.string.isRequired,
  downloadAudio: PropTypes.func.isRequired,
};
