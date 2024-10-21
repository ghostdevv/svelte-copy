import type { Action } from 'svelte/action';
import type { Options } from './types';

export async function copyText(text: string) {
	if ('clipboard' in navigator) {
		await navigator.clipboard.writeText(text);
	} else {
		//? This is the fallback deprecated way of copying text to the clipboard.
		//? Only runs if it can't find the clipboard API.

		const element = document.createElement('input');

		element.type = 'text';
		element.disabled = true;

		element.style.setProperty('position', 'fixed');
		element.style.setProperty('z-index', '-100');
		element.style.setProperty('pointer-events', 'none');
		element.style.setProperty('opacity', '0');

		element.value = text;

		document.body.appendChild(element);

		element.click();
		element.select();
		document.execCommand('copy');

		document.body.removeChild(element);
	}
}

function parseOptions(options: string | Options): Options {
	return typeof options == 'string' ? { text: options } : options;
}

function addListeners(
	element: Element,
	cb: (event: Event) => void,
	events = ['click'],
) {
	for (const event of events) {
		element.addEventListener(event, cb, true);
	}
}

function removeListeners(
	element: Element,
	cb: (event: Event) => void,
	events = ['click'],
) {
	for (const event of events) {
		element.removeEventListener(event, cb, true);
	}
}

/**
 * A svelte action to copy text to clipboard.
 *
 * @see https://svelte-copy.willow.codes
 *
 * @example
 *
 * <script>
 *     import { copy } from 'svelte-copy';
 * </script>
 *
 * <button use:copy={'Hello World'}>
 *     Click me!
 * </button>
 */
export const copy: Action<Element, string | Options> = (
	element: Element,
	initialOptions: string | Options,
) => {
	let options = parseOptions(initialOptions);

	const handle = async (event: Event) => {
		const text = options.text;

		try {
			await copyText(text);
			options.onCopy?.({ text, event });
		} catch (e) {
			const error = new Error(
				`svelte-copy error: ${e instanceof Error ? e.message : e}`,
				{ cause: e },
			);

			options.onError?.(error);
		}
	};

	addListeners(element, handle, options.events);

	return {
		update(newOptions: string | Options) {
			removeListeners(element, handle, options.events);

			options = parseOptions(newOptions);

			addListeners(element, handle, options.events);
		},
		destroy() {
			removeListeners(element, handle, options.events);
		},
	};
};
