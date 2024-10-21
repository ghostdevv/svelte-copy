<script lang="ts">
	import Example from './Example.svelte';
	import GitHub from './GitHub.svelte';
	import { copy } from '$lib';
	import CopyTextExample from './CopyTextExample.svelte';

	const { data } = $props();
</script>

<section class="title">
	<h1>Svelte Copy</h1>

	<a href="https://github.com/ghostdevv/svelte-copy">
		<GitHub />
	</a>
</section>

<section class="col">
	<h2>Usage</h2>

	<p>The simplest use is to just pass the text you want to copy</p>

	<Example code={data.examples.simple}>
		{#snippet children(text)}
			<button class="secondary" use:copy={text}> Copy </button>
		{/snippet}
	</Example>

	<p>We could pass this as an object</p>

	<Example code={data.examples.simpleObject}>
		{#snippet children(text)}
			<button class="secondary" use:copy={{ text }}> Copy </button>
		{/snippet}
	</Example>

	<p>Let's alert the user if the text was copied</p>

	<Example code={data.examples.simpleCopyAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				use:copy={{
					text,
					onCopy() {
						alert('Copied text!');
					},
				}}>
				Copy
			</button>
		{/snippet}
	</Example>

	<p>We could tell the user what was copied</p>

	<Example code={data.examples.copyAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				use:copy={{
					text,
					onCopy() {
						alert(`Copied Text: "${text}"`);
					},
				}}>
				Copy
			</button>
		{/snippet}
	</Example>

	<p>If there was an error, we can check for that too</p>

	<Example code={data.examples.errorAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				use:copy={{
					text,
					onCopy() {
						throw new Error("let's pretend it broke");
					},
					onError(error) {
						alert(error.message);
					},
				}}>
				Copy
			</button>
		{/snippet}
	</Example>

	<p>We can trigger the copy on custom events</p>

	<Example code={data.examples.customEvents}>
		{#snippet children(text)}
			<button
				class="secondary"
				use:copy={{
					text,
					events: ['pointerover'],
					onCopy({ text, event }) {
						alert(
							`The text "${text}" was copied because of the "${event.type}" event`,
						);
					},
					onError(error) {
						alert(error.message);
					},
				}}>
				Copy
			</button>
		{/snippet}
	</Example>
</section>

<section class="col">
	<h2>Extra</h2>

	<h3>copyText()</h3>

	<p>
		We expose the underlying <code>copyText</code> function. It uses the
		<code>navigator.clipboard</code> API by default, with a fallback to the legacy
		method.
	</p>

	<Example code={data.examples.copyText}>
		{#snippet children(text)}
			<CopyTextExample />
		{/snippet}
	</Example>
</section>

<style lang="scss">
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	p {
		max-width: 70%;
	}
</style>
