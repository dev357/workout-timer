import { writable } from "svelte/store";

const storedSettings = JSON.parse(localStorage.getItem("settings")) || {
  workTime: 11,
  restTime: 5,
  rounds: 20,
  decreasing: true
};

export const settings = writable(storedSettings);

// Keep localstorage up to date with settings
settings.subscribe((value) => {
  localStorage.setItem("settings", JSON.stringify(value));
});
