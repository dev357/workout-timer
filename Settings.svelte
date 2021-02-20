<script>
	import { settings } from "./store";
	import { timer, derivedTimer } from "./timer";

	$: timeToGo = $derivedTimer.timeToGo;
	$: minutes = Math.floor(timeToGo / 60)
	  .toString()
	  .padStart(2, "0");
	$: seconds = (timeToGo % 60).toString().padStart(2, "0");
	$: timeString = `${minutes}:${seconds}`;
</script>


	<div>
	{#if !$timer.running}
		<label>
			Work:
			<input bind:value={$settings.workTime} type="number" placeholder="seconds" min=0 />
		</label>
		<label>
			Rest:
			<input bind:value={$settings.restTime} type="number" placeholder="seconds" min=0/>
		</label>
		<label>
			Rounds:
			<input bind:value={$settings.rounds} type="number" placeholder="seconds" min=1/>
		</label>
		<label>
			dec:
			<input  bind:checked={$settings.decreasing} type="checkbox" />
		</label>
	{:else}
		<span>{timeString}</span>
		<span>{$derivedTimer.state}</span>
		<span>{$derivedTimer.roundsLeft}</span>
	{/if}
	</div>


<style>
	div {
	  height: 100%;
	  font-size: 1.5rem;
	  line-height: 1.5rem;
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  align-items: center;
	  background: orangered;
	  padding: 0.5rem;
	}

	label {
	  overflow: hidden;
	  white-space: nowrap;
	}

	span {
	  padding: 0 1rem;
	}

	input {
	  vertical-align: middle;
	  background: orangered;
	  color: white;
	  padding-left: 0.3rem;
	  font-size: 1.5rem;
	  margin-right: 1rem;
	  margin-left: -0.5rem;
	  width: 4rem;
	  height: 2rem;
	  border: none;
	  border-bottom: 1px solid white;
	}

	input[type="checkbox"] {
	  margin-left: -1.5rem;
	}

	input:focus {
	  outline: 0;
	}
</style>
