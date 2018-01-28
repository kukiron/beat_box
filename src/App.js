import React, { Component } from "react"
import { Button } from "react-mdl"

import TrackListView from "./components/TrackListView"
import ShareDialog from "./components/ShareDialog"
import Controls from "./components/Controls"

import * as sequencer from "./lib/sequencer"
import * as model from "./lib/model"

import "./App.css"
import "react-mdl/extra/css/material.light_blue-pink.min.css"
import "react-mdl/extra/material.js"

class App extends Component {
  constructor(props) {
    super(props)
    const hash = location.hash.substr(1)

    if (hash.length > 0) {
      try {
        const { bpm, tracks } = JSON.parse(atob(hash))
        this.initializeState({
          bpm,
          tracks: model.decodeTracks(tracks)
        })
      } catch (e) {
        console.warn("Unable to parse hash", hash, e)
        this.initializeState({ tracks: model.initTracks() })
      } finally {
        location.hash = ""
      }
    } else {
      this.initializeState({ tracks: model.initTracks() })
    }
  }

  initializeState(state = {}) {
    this.state = {
      bpm: 120,
      playing: false,
      currentBeat: -1,
      shareHash: null,
      ...state
    }
    this.loop = sequencer.create(this.state.tracks, this.updateCurrentBeat)
    sequencer.updateBPM(this.state.bpm)
  }

  start = () => {
    this.setState({ playing: true })
    this.loop.start()
  }

  stop = () => {
    this.loop.stop()
    this.setState({ currentBeat: -1, playing: false })
  }

  updateCurrentBeat = beat => {
    this.setState({ currentBeat: beat })
  }

  updateTracks = newTracks => {
    this.loop = sequencer.update(this.loop, newTracks, this.updateCurrentBeat)
    this.setState({ tracks: newTracks })
  }

  addTrack = () => {
    const { tracks } = this.state
    this.updateTracks(model.addTrack(tracks))
  }

  clearTrack = id => {
    const { tracks } = this.state
    this.updateTracks(model.clearTrack(tracks, id))
  }

  deleteTrack = id => {
    const { tracks } = this.state
    this.updateTracks(model.deleteTracks(tracks, id))
  }

  toggleTrackBeat = (id, beat) => {
    const { tracks } = this.state
    this.updateTracks(model.toggleTrackBeat(tracks, id, beat))
  }

  setTrackVolume = (id, vol) => {
    const { tracks } = this.state
    this.updateTracks(model.setTrackVolume(tracks, id, vol))
  }

  muteTrack = id => {
    const { tracks } = this.state
    this.updateTracks(model.muteTrack(tracks, id))
  }

  updateBPM = newBpm => {
    sequencer.updateBPM(newBpm)
    this.setState({ bpm: newBpm })
  }

  updateTrackSample = (id, sample) => {
    const { tracks } = this.state
    this.updateTracks(model.updateTrackSample(tracks, id, sample))
  }

  closeDialog = () => {
    this.setState({ shareHash: null })
  }

  randomSong = () => {
    const { bpm, tracks } = model.randomSong()
    this.updateTracks(tracks)
    this.updateBPM(bpm)
  }

  share = () => {
    const { bpm, tracks } = this.state
    const shareHash = btoa(
      JSON.stringify({
        bpm,
        tracks: model.encodeTracks(tracks)
      })
    )
    this.setState({ shareHash })
  }

  render() {
    const { bpm, currentBeat, playing, shareHash, tracks } = this.state
    const {
      updateBPM,
      start,
      stop,
      addTrack,
      share,
      randomSong,
      closeDialog
    } = this

    return (
      <div className="app">
        <h3>Beat_Box</h3>
        {shareHash ? (
          <ShareDialog hash={shareHash} closeDialog={closeDialog} />
        ) : null}
        <table>
          <tbody>
            <tr>
              <td colSpan="19">
                <p style={{ textAlign: "right" }}>
                  <Button type="button" colored onClick={randomSong}>
                    I am uninspired, get me some random tracks
                  </Button>
                </p>
              </td>
            </tr>
          </tbody>
          <TrackListView
            tracks={tracks}
            currentBeat={currentBeat}
            toggleTrackBeat={this.toggleTrackBeat}
            setTrackVolume={this.setTrackVolume}
            updateTrackSample={this.updateTrackSample}
            muteTrack={this.muteTrack}
            randomSong={this.randomSong}
            clearTrack={this.clearTrack}
            deleteTrack={this.deleteTrack}
          />
          <Controls
            {...{ bpm, updateBPM, playing, start, stop, addTrack, share }}
          />
        </table>
      </div>
    )
  }
}

export default App
