<script>
    import 'ghostsui';
    import { copy } from '$lib';

    let text = 'Hello World';
</script>

<main class="col">
    <label for="text">Text To Copy:</label>

    <input
        id="text"
        type="text"
        placeholder="Text to copy..."
        bind:value={text} />

    <button use:copy={'Hello'}> Click to Copy </button>
</main>

<style>
    main {
        padding: 32px 12px;
    }
</style>
