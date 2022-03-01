import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess(),

    kit: {
        adapter: vercel(),

        package: {
            exports: (file) => {
                return file === 'index.ts';
            },
        },
    },
};

export default config;
