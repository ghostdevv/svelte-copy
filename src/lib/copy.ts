export const copy = (element: HTMLElement, text: string) => {
    const click = async () => {
        if (text)
            try {
                await navigator.clipboard.writeText(text);

                element.dispatchEvent(
                    new CustomEvent('svelte-copy', { detail: text }),
                );
            } catch (e) {
                element.dispatchEvent(
                    new CustomEvent('svelte-copy:error', { detail: e }),
                );
            }
    };

    element.addEventListener('click', click, true);

    return {
        update: (t) => (text = t),
        destroy: () => element.removeEventListener('click', click, true),
    };
};
