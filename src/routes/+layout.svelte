<script lang="ts">
	import 'ghostsui';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		padding: 12px 32px;
		max-width: 1400px;
		margin: 0 auto;
	}

	:global(pre) {
		background-color: transparent !important;
		width: 100%;
	}
</style>
