import samples from "./samples.json"

export const initBeats = n => new Array(n).fill(false)

export const initTracks = () => [
  { id: 1, name: "hihat-reso", vol: 0.4, muted: false, beats: initBeats(16) },
  {
    id: 2,
    name: "hihat-plain",
    vol: 0.4,
    muted: false,
    beats: initBeats(16)
  },
  {
    id: 3,
    name: "snare-vinyl01",
    vol: 0.9,
    muted: false,
    beats: initBeats(16)
  },
  {
    id: 4,
    name: "kick-electro01",
    vol: 0.8,
    muted: false,
    beats: initBeats(16)
  }
]

export const addTrack = tracks => {
  const id = Math.max.apply(null, tracks.map(t => t.id)) + 1

  return [
    ...tracks,
    {
      id,
      name: "kick-electro01",
      vol: 0.8,
      muted: false,
      beats: initBeats(16)
    }
  ]
}

export const clearTrack = (tracks, id) =>
  tracks.map(
    track => (track.id !== id ? track : { ...track, beats: initBeats(16) })
  )

export const deleteTracks = (tracks, id) =>
  tracks.filter(track => track.id !== id)

export const toggleTrackBeat = (tracks, id, beat) =>
  tracks.map(
    track =>
      track.id !== id
        ? track
        : {
            ...track,
            beats: track.beats.map((v, i) => (i !== beat ? v : !v))
          }
  )

export const setTrackVolume = (tracks, id, vol) =>
  tracks.map(track => (track.id !== id ? track : { ...track, vol }))

export const muteTrack = (tracks, id) =>
  tracks.map(
    track => (track.id !== id ? track : { ...track, muted: !track.muted })
  )

export const updateTrackSample = (tracks, id, sample) =>
  tracks.map(track => (track.id === id ? track : { ...track, name: sample }))

const encodeBeats = beats => beats.map(beat => (beat ? "1" : "0")).join("")

const decodeBeats = encodedBeats =>
  encodedBeats.split("").map(beat => beat === "1")

export const encodeTracks = tracks =>
  tracks.map(({ beats, ...track }) => ({
    ...track,
    beats: encodeBeats(beats)
  }))

export const decodeTracks = encodedTracks =>
  encodedTracks.map(({ beats, ...encodedTrack }) => ({
    ...encodedTrack,
    beats: decodeBeats(beats)
  }))

export const randomTracks = () => {
  const nT = Math.floor(3 + Math.random() * 10)

  return new Array(nT).fill().map((_, i) => ({
    id: i + 1,
    name: samples[Math.floor(Math.random() * samples.length)],
    vol: Math.random(),
    muted: false,
    beats: initBeats(16).map(() => Math.random() > 0.75)
  }))
}

export const randomSong = () => ({
  bpm: Math.floor(Math.random() * 75) + 75,
  tracks: randomTracks()
})
