import Tone from "tone"

const velocities = [
  1,
  0.5,
  0.75,
  0.5,
  1,
  0.5,
  0.75,
  0.5,
  1,
  0.5,
  0.75,
  0.5,
  1,
  0.5,
  0.75,
  0.5
]

const loopProcessor = (tracks, beatNotifier) => {
  const urls = tracks.reduce(
    (acc, { name }) => ({ ...acc, [name]: `audio/${name}.wav` }),
    {}
  )

  const keys = new Tone.MultiPlayer({ urls }).toMaster()

  return (time, index) => {
    beatNotifier(index)
    tracks.forEach(({ name, vol, muted, beats }) => {
      if (beats[index]) {
        try {
          // "1n" should be set via some "resolution" track prop
          keys.start(
            name,
            time,
            0,
            "1n",
            0,
            muted ? 0 : velocities[index] * vol
          )
        } catch (e) {
          // We're most likely in a race condition where the new sample hasn't been loaded
          // just yet; silently ignore, it will resiliently catch up later.
        }
      }
    })
  }
}

export const create = (tracks, beatNotifier) => {
  const loop = new Tone.Sequence(
    loopProcessor(tracks, beatNotifier),
    new Array(16).fill(0).map((_, i) => i),
    "16n"
  )

  Tone.Transport.bpm.value = 120
  Tone.Transport.start()

  return loop
}

export const update = (loop, tracks, beatNotifier) => {
  loop.callback = loopProcessor(tracks, beatNotifier)
  return loop
}

export const updateBPM = bpm => (Tone.Transport.bpm.value = bpm)
