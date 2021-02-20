const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function _beep(options) {
  // default options
  let vol = options?.vol || 1;
  let freq = options?.freq || 1500;
  let type = options?.type || "square";
  let beepLength = options?.beepLength || 200;

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = vol; // 0 ... 1
  oscillator.frequency.value = freq; // 40 ... 6000
  oscillator.type = type; // sine, square, sawtooth, triangle

  oscillator.start();

  setTimeout(function () {
    oscillator.stop();
  }, beepLength);
}

export const beeps = {
  single: [
    {
      vol: 1,
      freq: 1500,
      type: "square",
      beepLength: 200
    }
  ],
  double: [
    {
      vol: 1,
      freq: 1500,
      type: "square",
      beepLength: 200
    },
    {
      vol: 1,
      freq: 1500,
      type: "square",
      beepLength: 200,
      pauseLength: 200
    }
  ]
};

// input: [{vol: 1, freq: 1500, type= "square", beepLength=200, pauseLength="200"}]
export async function beep(beeps) {
  let prevBeepLength = 0;
  for (let i = 0; i < beeps.length; i++) {
    const beep = beeps[i];
    const timeoutTime = prevBeepLength + (beep.pauseLength || 0);
    await waitAndRun(() => _beep(beep), timeoutTime);
    prevBeepLength = beep.beepLength;
  }
}

let waitAndRun = (cb, ms = 0) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(cb()), ms);
  });
