import { describe, it, expect, beforeEach, vi } from 'vitest';
import { copy as copyAction, copyText } from '$lib/index';
import type { Options } from '$lib/types';

type ActionReturn = import('svelte/action').ActionReturn<string | Options>;

async function tick() {
	await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('copyText', () => {
	beforeEach(async () => {
		await navigator.clipboard.writeText('');
	});

	it('copies text', async () => {
		const text = crypto.randomUUID();

		await copyText(text);

		expect(await navigator.clipboard.readText()).toBe(text);
	});
});

describe('copy action', () => {
	beforeEach(async () => {
		await navigator.clipboard.writeText('');
	});

	it('fires on click', async () => {
		const element = document.createElement('button');
		const text = crypto.randomUUID();

		copyAction(element, text);
		element.click();

		expect(await navigator.clipboard.readText()).toBe(text);
	});

	it('only triggers on an event', async () => {
		const element = document.createElement('button');
		const text = crypto.randomUUID();

		copyAction(element, text);

		expect(await navigator.clipboard.readText()).toEqual('');
	});

	it('works with an options object', async () => {
		const element = document.createElement('button');
		const text = crypto.randomUUID();

		copyAction(element, { text });
		element.click();

		expect(await navigator.clipboard.readText()).toBe(text);
	});

	it('works with custom events', async () => {
		const element = document.createElement('button');
		const text = crypto.randomUUID();

		copyAction(element, { text, events: ['pointerover'] });
		element.dispatchEvent(new PointerEvent('pointerover'));

		expect(await navigator.clipboard.readText()).toBe(text);
	});

	it('calls the onCopy callback with the correct text', async () => {
		const element = document.createElement('button');
		const text = crypto.randomUUID();
		const onCopy = vi.fn();

		copyAction(element, { text, onCopy });

		element.click();
		expect(await navigator.clipboard.readText()).toBe(text);
		expect(onCopy).toHaveBeenCalledOnce();
		expect(onCopy).toHaveBeenCalledWith(expect.objectContaining({ text }));
	});

	it('sets updated text correctly with string option', async () => {
		const element = document.createElement('button');
		const originalText = crypto.randomUUID();

		const { update } = copyAction(element, {
			text: originalText,
		}) as ActionReturn;

		element.click();
		expect(await navigator.clipboard.readText()).toBe(originalText);

		const newText = crypto.randomUUID();
		update(newText);
		element.click();

		expect(await navigator.clipboard.readText()).toBe(newText);
	});

	it('sets updated text correctly with options object', async () => {
		const element = document.createElement('button');
		const originalText = crypto.randomUUID();

		const { update } = copyAction(element, {
			text: originalText,
		}) as ActionReturn;

		element.click();
		expect(await navigator.clipboard.readText()).toBe(originalText);

		const newText = crypto.randomUUID();
		update({ text: newText });

		element.click();
		expect(await navigator.clipboard.readText()).toBe(newText);
	});

	it('sets updated event listeners', async () => {
		const element = document.createElement('button');
		const originalText = crypto.randomUUID();

		const { update } = copyAction(element, {
			text: originalText,
		}) as ActionReturn;

		element.click();
		expect(await navigator.clipboard.readText()).toBe(originalText);

		const newText = crypto.randomUUID();
		update({ text: newText, events: ['pointerover'] });

		element.click();
		expect(await navigator.clipboard.readText()).toBe(originalText);

		element.dispatchEvent(new PointerEvent('pointerover'));
		expect(await navigator.clipboard.readText()).toBe(newText);
	});

	it('sets updated event listeners', async () => {
		const element = document.createElement('button');
		const text = crypto.randomUUID();
		const onCopy = vi.fn();

		const { update } = copyAction(element, {
			text,
			onCopy,
		}) as ActionReturn;

		element.click();
		expect(await navigator.clipboard.readText()).toBe(text);
		expect(onCopy).toHaveBeenCalledOnce();
		expect(onCopy).toHaveBeenCalledWith(expect.objectContaining({ text }));

		const newOnCopy = vi.fn();
		update({ text, onCopy: newOnCopy });

		element.click();
		await tick();
		expect(onCopy).toHaveBeenCalledOnce();
		expect(newOnCopy).toHaveBeenCalledOnce();
		expect(newOnCopy).toHaveBeenCalledWith(
			expect.objectContaining({ text }),
		);
	});
});
