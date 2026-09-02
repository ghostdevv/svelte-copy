# Svelte Copy

A svelte attachment/action to copy text to clipboard. It uses the `navigator.clipboard` api, with a fallback to the legacy method.

# Installing

```sh
npm install svelte-copy -D
```

This library only works with Svelte 5, checkout [svelte-copy@1](https://www.npmjs.com/package/svelte-copy/v/1.4.2) for Svelte 3/4 support.

[Actions (use:)](https://svelte.dev/docs/svelte/use) and [attachments (@attach)](https://svelte.dev/docs/svelte/@attach) are both supported.

# Usage

The simplest use is to just pass the text you want to copy:

```svelte
<script>
    import { copy } from 'svelte-copy';
</script>

<button {@attach copy('Hello World')}>
    Click me!
</button>
```

```svelte
<script>
    import { copyAction } from 'svelte-copy';
</script>

<button use:copyAction={'Hello World'}>
    Click me!
</button>
```

You can expand that with an options object:

```svelte
<script>
    import { copy } from 'svelte-copy';
</script>

<button
    {@attach copy({
        text,
        events: ['click'],
        onCopy({ text, event }) {
            alert(`Text copied: "${text}". Triggered by "${event}"`);
        },
        onError({ error, event }) {
            alert(error.message)
        }
    })}
>
    Copy
</button>
```

```svelte
<script>
    import { copyAction } from 'svelte-copy';
</script>

<button
    use:copyAction={{
        text,
        events: ['click'],
        onCopy({ text, event }) {
            alert(`Text copied: "${text}". Triggered by "${event}"`);
        },
        onError({ error, event }) {
            alert(error.message)
        }
    }}
>
    Copy
</button>
```

[Read the full docs here](https://svelte-copy.willow.codes).

# Migrating from v2 to v3

- `copy` now refers to the attachment.
- To use the action, use `copyAction`.

# Migrating from v1 to v2

- The `on:svelte-copy` event is now a `onCopy` param to the action options.
- The `on:svelte-copy:error` event is now a `onError` param to the action options.
- The `events` option now only accepts `string[]`, rather than `string | string[]`
- Svelte 5 is now required

# Support

-   Join the [discord](https://discord.gg/2Vd4wAjJnm)<br>
-   Create a issue on the [github](https://github.com/ghostdevv/svelte-copy)
