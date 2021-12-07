# Svelte Copy

Ever wanted to copy something to clipboard? Say hello to Svelte Copy ✨

[**Demo**](https://svelte-copy.vercel.app/)

# Installing

```sh
npm install svelte-copy -D
```

# Using

Let's make a button that when you click it copies `Hello World` to the clipboard:

```html
<script>
    import { copy } from 'svelte-copy';
</script>

<button use:copy={"Hello World"}>
    Click me!
</button>
```

# Events

There are some custom events you can use on elements that have the copy action:

-   `on:svelte-copy`
    This will fire when text is copied, you have access to the copied text if needed with `event.detail`:

    ```html
    <button
        use:copy={'Hello from alert'}
        on:svelte-copy={(event) => alert(event.detail)}>
        Click to cause alert on copy
    </button>
    ```

-   `on:svelte-copy:error`
    This event will fire if there is an error in copying to clipboard, you have access to the error with `event.detail`:

    ```html
    <button
        use:copy={'Some text'}
        on:svelte-copy:error="{(event) =>
            alert(`There was an error: ${event.detail.message}`)}">
        Click to cause alert on copy
    </button>
    ```

# Support

-   Join the [discord](https://discord.gg/2Vd4wAjJnm)<br>
-   Create a issue on the [github](https://github.com/ghostdevv/svelte-copy)
