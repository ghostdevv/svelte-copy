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

# Support

-   Join the [discord](https://discord.gg/2Vd4wAjJnm)<br>
-   Create a issue on the [github](https://github.com/ghostdevv/svelte-copy)
