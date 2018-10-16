import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      // Stop old timer and start new one.
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set new BPM and reset beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // Or just update BPM
      this.setState({bpm});
    }
  }

  startStop = () => {
    if (this.state.playing) {
      // If metronome is playing, stop it by clearing the timer and set playing state to false. App will re render and button will say start again.
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // If metronome is not playing, start timer that plays a click every few milliseconds depending on bpm.
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
          // Play click after setState finishes
        },
        this.playClick
      );
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }))
  }

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default Metronome;
