import { writable, readable, derived } from "svelte/store";
import { settings } from "./store";
import { beep, beeps } from "./sound";

let pauseStart = 0;
let startTime;
let tickerUnsubscribe;
const options = { running: false, time: 0, paused: false };
const _timer = writable(options);

const ticker = readable(0, (set) => {
  let currentSeconds;
  const update = () => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    if (elapsedSeconds !== currentSeconds) {
      currentSeconds = elapsedSeconds;
      // console.log("ticker", currentSeconds);
      set(currentSeconds);
    }
  };
  update();
  const interval = setInterval(update, 100);

  return () => {
    clearInterval(interval);
  };
});

const start = () => {
  startTime = Date.now();
  tickerUnsubscribe = ticker.subscribe((time) => {
    _timer.update((self) => {
      self.time = time;
      return { ...self };
    });
  });
  _timer.update((self) => {
    self.running = true;
    return { ...self };
  });
};

const stop = () => {
  _timer.update((self) => {
    if (!self.paused) {
      tickerUnsubscribe();
    }
    self.running = false;
    self.paused = false;
    self.time = 0;
    return { ...self };
  });
};

const pause = () => {
  _timer.update((self) => {
    self.paused = !self.paused;
    if (self.paused) {
      pauseStart = Date.now();
      tickerUnsubscribe();
    } else {
      startTime += Date.now() - pauseStart;
      tickerUnsubscribe = ticker.subscribe((time) => {
        _timer.update((self) => {
          self.time = time;
          return { ...self };
        });
      });
    }
    return { ...self };
  });
};

export const timer = {
  subscribe: _timer.subscribe,
  pause,
  start,
  stop
};

export const derivedTimer = derived(
  [timer, settings],
  ([$timer, $settings]) => {
    const roundLength = $settings.workTime + $settings.restTime;
    const round = Math.ceil(($timer.time + 1) / roundLength);
    const roundsLeft = $settings.rounds - round + 1;
    let roundTime = $timer.time % roundLength;
    let workTime = 0;
    let restTime = 0;
    let state;
    let timeToGo = $settings.rounds * roundLength - $timer.time;

    if ($timer.running && roundTime === 0) {
      beep(beeps.single);
    }

    if ($timer.running && roundTime === $settings.workTime) {
      beep(beeps.double);
    }

    if (roundTime >= $settings.workTime) {
      restTime = roundTime - $settings.workTime;
      state = "rest";
    } else {
      workTime = roundTime;
      state = "work";
    }

    if ($timer.running && round > $settings.rounds) {
      timer.stop();
    }

    if ($settings.decreasing) {
      roundTime = roundLength - roundTime;
      workTime = $settings.workTime - workTime;
      restTime = $settings.restTime - restTime;
    }

    return {
      round,
      roundsLeft,
      roundTime,
      workTime,
      restTime,
      state,
      timeToGo
    };
  }
);
