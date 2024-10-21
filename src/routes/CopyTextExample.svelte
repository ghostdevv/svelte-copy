<script lang="ts">
	import { copyText } from '$lib';
	import { Debounced } from 'runed';

	let text = $state('');
	const debounced = new Debounced(() => text);

	$effect(() => {
		if (debounced.current) {
			copyText(debounced.current)
				.then(() => alert('Copied!'))
				.catch((error) => alert(error?.message));
		}
	});
</script>

<input type="text" placeholder="Text to copy..." bind:value={text} />
