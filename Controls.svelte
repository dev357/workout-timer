<script>
  import { timer } from "./timer";
</script>

<nav>
  {#if $timer.running}
    <button on:click={timer.stop}>Stop</button>
  {#if $timer.paused}
    <button on:click={timer.pause}>Resume</button>
  {:else}
    <button on:click={timer.pause}>Pause</button>
  {/if}
  {:else}
    <button on:click={timer.start}>Start</button>
  {/if}
</nav>

<style>
  nav {
    flex-grow: 0;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  button {
    font-family: "Source Code Pro", monospace;
    font-size: 1.5rem;
    line-height: 1rem;
    border: none;
    background: orangered;
    height: 100%;
    width: 100%;
    color: white;
    margin-right: 5px;
    padding: 1rem;
  }

  button:last-child {
    margin-right: 0;
  }

  button:focus {
    outline: 0;
  }

  button:hover {
    background: orange;
  }
</style>