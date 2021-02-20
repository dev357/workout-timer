<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@600&display=swap" rel="stylesheet">
</svelte:head>

<script>
  import Time from "./Time.svelte";
  import Settings from "./Settings.svelte";
  import Controls from "./Controls.svelte";
</script>

<div class="container">
  <Settings />
  <Time />
  <Controls />
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    color: white;
    background: #111;
    font-family: "Source Code Pro", monospace;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    overflow: hidden;
  }

  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  :global(html) {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :global(*),
  :global(*):before,
  :global(*):after {
    box-sizing: inherit;
  }
</style>
