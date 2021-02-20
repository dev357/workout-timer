<script>
  import { timer, derivedTimer } from "./timer";

  let seconds = 0;
  let color = "white";
  let viewBox = "0 0 9 12";

  $: if ($derivedTimer.state === "work") {
    seconds = $derivedTimer.workTime;
    color = "white";
  } else if ($derivedTimer.state == "rest") {
    seconds = $derivedTimer.restTime;
    color = "green";
  }

  $: secondsLength = seconds.toString().length;
  $: viewBox = `0 0 ${9 * secondsLength} 12`;
</script>
<main>
  <div>
    <svg
      viewBox = {viewBox}
      width = "100%"
      height = "100%"
      fill = "#111"
    >
      <text
        x="50%"
        y="60%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill = {color}
      >{seconds}</text>
    </svg>
  </div>
</main>

<style>
  div {
    height: 100%;
    width: 100%;
  }
  main {
    overflow: auto;
  }
</style>



