export const copy = (element: HTMLElement, text: string) => {
    const click = async () => {
        if (text)
            try {
                await copyText(text);

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
        update: (t: string) => (text = t),
        destroy: () => element.removeEventListener('click', click, true),
    };
};
