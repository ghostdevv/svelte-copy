<script>
    import { copy } from '$lib';

    let text = 'Hello World';

    const error = (event) => {
        alert(event.detail.message);
    };
</script>

<main class="col">
    <label for="text">Text To Copy:</label>

    <input
        id="text"
        type="text"
        placeholder="Text to copy..."
        bind:value={text} />

    <button
        use:copy={{ text: text, events: ['click'] }}
        on:svelte-copy:error={error}>
        Click to Copy
    </button>

    <div class="col">
        <h1>Events</h1>

        <button
            use:copy={{ text: 'Hello from alert', events: 'click' }}
            on:svelte-copy={(e) => alert(e.detail)}
            on:svelte-copy:error={error}>
            Click to cause alert on copy
        </button>
    </div>
</main>

<style>
    main {
        padding: 32px 12px;
    }
</style>
