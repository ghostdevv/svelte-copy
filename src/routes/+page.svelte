<script lang="ts">
	import GitHub from './GitHub.svelte';
	import { copy } from '$lib';

	export let data;

	let text = 'Hello World';

	function error(event: CustomEvent<Error>) {
		alert(event.detail.message);
	}
</script>

<section class="title">
	<h1>Svelte Copy Demo</h1>

	<a href="https://github.com/ghostdevv/svelte-copy">
		<GitHub size={28} />
	</a>
</section>

<section>
	<label>
		Text to copy:
		<input
			id="text"
			type="text"
			placeholder="Lorem ipsum..."
			bind:value={text}
		/>
	</label>
</section>

<hr />

<section class="example">
	<h2>Simple Example</h2>

	{@html data.examples.simple}

	<button class="secondary" use:copy={text} on:svelte-copy:error={error}>
		Copy
	</button>
</section>

<section class="example">
	<h2>Copy events</h2>

	{@html data.examples.copyEvents}

	<button
		class="secondary"
		use:copy={text}
		on:svelte-copy={(e) => alert(e.detail)}
		on:svelte-copy:error={error}
	>
		Alert on copy & error
	</button>
</section>

<section class="example">
	<h2>Custom Triggers</h2>

	{@html data.examples.customTriggers}

	<p>By default svelte-copy only listens to the <code>click</code> event.</p>

	<button
		use:copy={{ text, events: ['pointerover'] }}
		on:svelte-copy:error={error}
	>
		Copy on hover
	</button>
</section>

<style lang="scss">
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	label input {
		margin-top: 8px;
	}

	.example {
		display: flex;
		flex-direction: column;
		align-items: start;
		width: 100%;
		gap: 22px 16px;
	}

	:global(pre) {
		width: 100%;
		padding: 22px;
		border-radius: 16px;
		display: block;

		font-family: 'Comic Mono', monospace;
		background-color: var(--background-secondary) !important;
	}

	:global(code:not(pre code)) {
		background-color: var(--background-secondary);
		color: var(--secondary);
		border-radius: 8px;
		font-weight: bold;
		padding: 4px 8px;
		white-space: pre;
	}
</style>
