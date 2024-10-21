import { codeToHtml } from 'shiki';
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
                <button use:copy={'__text__'}>
                    Copy
                </button>
            `),
			simpleObject: await highlight(dedent`
                <button use:copy={{ text: '__text__' }}>
                    Copy
                </button>
            `),
			simpleCopyAlert: await highlight(dedent`
                <button
                    use:copy={{
                        text: '__text__',
                        onCopy() {
                            alert('Copied text!');
                        },
                    }}
                >
                    Copy
                </button>
            `),
			copyAlert: await highlight(dedent`
                <button
                    use:copy={{
                        text: '__text__',
                        onCopy({ text }) {
                            alert(\`Copied Text: "\${text}"\`);
                        },
                    }}
                >
                    Copy
                </button>
            `),
			errorAlert: await highlight(dedent`
                <button
                    use:copy={{
                        text: '__text__',
                        onError(error) {
                            alert(error.message);
                        },
                    }}
                >
                    Copy
                </button>
            `),
			customEvents: await highlight(dedent`
                <button
                    use:copy={{
                        text: '__text__',
                        events: ['pointerover'],
                        onCopy({ text, event }) {
                            alert(\`The text "\${text}" was copied because of the "\${event.type}" event\`);
                        },
                        onError(error) {
                            alert(error.message);
                        },
                    }}
                >
                    Copy
                </button>
            `),
			copyText: await highlight(dedent`
                <script lang="ts">
                    import { copyText } from 'svelte-copy';
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

                <input
                    type="text"
                    placeholder="Text to copy..."
                    bind:value={text} />
            `),
		},
	};
}
