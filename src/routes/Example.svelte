<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		code: string;
		children?: Snippet<[text: string]>;
	}

	const { code, children }: Props = $props();

	let codeElement = $state<HTMLDivElement>();
	let text = $state('Hello World');

	onMount(() => {
		const spans = Array.from(codeElement.querySelectorAll('span'));
		const span = spans.find((s) => s.innerText == '__text__');

		span.innerText = text;
		span.contentEditable = 'plaintext-only';
		span.classList.add('text-editable');

		span.addEventListener('input', () => {
			text = span.innerText;
		});
	});
</script>

<div class="example-wrapper">
	<div class="code" bind:this={codeElement}>
		{@html code}
	</div>

	<div class="example">
		{@render children?.(text)}
	</div>
</div>

<style lang="scss">
	.code {
		display: contents;
	}

	.example-wrapper {
		display: grid;
		grid-template-columns: 1fr 0.5fr;
		grid-template-rows: 1fr;
		align-items: start;

		width: 100%;
		margin-bottom: 8px;

		@media screen and (max-width: 768px) {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}
	}

	.example {
		padding: 8px;

		:global(:first-child) {
			margin-top: 0px;
		}
	}

	:global(.text-editable) {
		text-decoration: underline;

		&:focus-visible {
			border-radius: 2px;
			outline: 2px dashed var(--primary);
			outline-offset: 6px;
			text-decoration: none;
		}
	}
</style>
