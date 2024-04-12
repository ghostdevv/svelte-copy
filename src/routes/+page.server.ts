import { codeToHtml } from 'shikiji';
import dedent from 'dedent';

async function highlight(code: string) {
	return await codeToHtml(code, {
		lang: 'svelte',
		theme: 'nord',
	});
}

export async function load() {
	return {
		examples: {
			simple: await highlight(dedent`
                <button use:copy={text}> Copy </button>
            `),
			copyEvents: await highlight(dedent`
                <button
                    use:copy={text}
                    on:svelte-copy={(e) => alert(e.detail)}
                    on:svelte-copy:error={(e) => alert(e.detail.message)}
                >
                    Alert on copy & error
                </button>
            `),
			customTriggers: await highlight(dedent`
                <button use:copy={{ text, events: ['pointerover'] }}>
                    Copy on hover
                </button>
            `),
		},
	};
}
