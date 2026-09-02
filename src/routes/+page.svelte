<script lang="ts">
	import CopyTextExample from './CopyTextExample.svelte';
	import Example from './Example.svelte';
	import GitHub from './GitHub.svelte';
	import { copy, copyAction } from '$lib';

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

	<Example code={data.examples.attachment.simple}>
		{#snippet children(text)}
			<button class="secondary" {@attach copy(text)}> Copy </button>
		{/snippet}
	</Example>

	<p>We could pass this as an object</p>

	<Example code={data.examples.attachment.simpleObject}>
		{#snippet children(text)}
			<button class="secondary" {@attach copy({text})}> Copy </button>
		{/snippet}
	</Example>

	<p>Let's alert the user if the text was copied</p>

	<Example code={data.examples.attachment.simpleCopyAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				{@attach copy({
					text,
					onCopy() {
						alert('Copied text!');
					},
				})}>
				Copy
			</button>
		{/snippet}
	</Example>

	<p>We could tell the user what was copied</p>

	<Example code={data.examples.attachment.copyAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				{@attach copy({
					text,
					onCopy() {
						alert(`Copied Text: "${text}"`);
					},
				})}>
				Copy
			</button>
		{/snippet}
	</Example>

	<p>If there was an error, we can check for that too</p>

	<Example code={data.examples.attachment.errorAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				{@attach copy({
					text,
					onCopy() {
						throw new Error("let's pretend it broke");
					},
					onError({ error }) {
						alert(error.message);
					},
				})}>
				Copy
			</button>
		{/snippet}
	</Example>

	<p>We can trigger the copy on custom events</p>

	<Example code={data.examples.attachment.customEvents}>
		{#snippet children(text)}
			<button
				class="secondary"
				{@attach copy({
					text,
					events: ['pointerover'],
					onCopy({ text, event }) {
						alert(
							`The text "${text}" was copied because of the "${event.type}" event`,
						);
					},
					onError({ error }) {
						alert(error.message);
					},
				})}>
				Copy
			</button>
		{/snippet}
	</Example>
</section>

<section class="col">
	<h2>Usage (with actions)</h2>

	<a href="https://svelte.dev/docs/svelte/use" class="warning">
		In Svelte 5.29 and newer, consider using attachments instead, as they are more flexible and composable.
	</a>

	<p>The simplest use is to just pass the text you want to copy</p>

	<Example code={data.examples.action.simple}>
		{#snippet children(text)}
			<button class="secondary" use:copyAction={text}> Copy </button>
		{/snippet}
	</Example>

	<p>We could pass this as an object</p>

	<Example code={data.examples.action.simpleObject}>
		{#snippet children(text)}
			<button class="secondary" use:copyAction={{ text }}> Copy </button>
		{/snippet}
	</Example>

	<p>Let's alert the user if the text was copied</p>

	<Example code={data.examples.action.simpleCopyAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				use:copyAction={{
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

	<Example code={data.examples.action.copyAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				use:copyAction={{
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

	<Example code={data.examples.action.errorAlert}>
		{#snippet children(text)}
			<button
				class="secondary"
				use:copyAction={{
					text,
					onCopy() {
						throw new Error("let's pretend it broke");
					},
					onError({ error }) {
						alert(error.message);
					},
				}}>
				Copy
			</button>
		{/snippet}
	</Example>

	<p>We can trigger the copy on custom events</p>

	<Example code={data.examples.action.customEvents}>
		{#snippet children(text)}
			<button
				class="secondary"
				use:copyAction={{
					text,
					events: ['pointerover'],
					onCopy({ text, event }) {
						alert(
							`The text "${text}" was copied because of the "${event.type}" event`,
						);
					},
					onError({ error }) {
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

	.warning {
		color: #b71c1c;
		font-weight: bold;
		text-decoration: underline;
	}
</style>
