<script>
    import { copy } from '$lib';

    let text = 'Hello World';
    let text2 = 'Hello World';
    let text3 = 'Hello World';

    const error = (event) => {
        alert(event.detail.message);
    };
</script>

<section>
    <h1>Copy Text</h1>

    <label>
        Text to Copy
        <input type="text" placeholder="Text to copy..." bind:value={text} />
    </label>

    <button use:copy={{ text: text, events: ['click'] }} on:svelte-copy:error={error}>
        Click to Copy
    </button>
</section>

<section>
    <h1>Use Fallback</h1>

    <label>
        Text to Copy
        <input type="text" placeholder="Text to copy..." bind:value={text2} />
    </label>

    <button
        use:copy={{ text: text2, events: ['click'], fallback: true }}
        on:svelte-copy:error={error}>
        Click to Copy
    </button>
</section>

<section>
    <h1>Custom Events</h1>

    <label>
        Text to Copy (on hover!)
        <input type="text" placeholder="Text to copy..." bind:value={text3} />
    </label>

    <button use:copy={{ text: text3, events: ['mouseover'] }} on:svelte-copy:error={error}>
        Hover to Copy
    </button>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    label {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>
