function legacyCopyText(text: string) {
    const element = document.createElement('input');

    element.type = 'text';

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

export const copyText = async (text: string, fallback: boolean): Promise<void> => {
    if ('clipboard' in navigator) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            if (fallback) {
                legacyCopyText(text);
            } else {
                throw error;
            }
        }
    } else {
        legacyCopyText(text);
    }
};

interface Parameters {
    text: string;
    /**
     * @default false
     */
    fallback?: boolean;

    /**
     * @default click
     */
    events?: string | string[];
}

export const copy = (element: HTMLElement, params: Parameters | string) => {
    async function handle() {
        if (text)
            try {
                await copyText(text, fallback);

                element.dispatchEvent(new CustomEvent('svelte-copy', { detail: text }));
            } catch (e) {
                element.dispatchEvent(new CustomEvent('svelte-copy:error', { detail: e }));
            }
    }

    let events = typeof params == 'string' ? ['click'] : [params.events].flat(1);
    let fallback = typeof params == 'string' ? false : params.fallback;
    let text = typeof params == 'string' ? params : params.text;

    events.forEach((event) => {
        element.addEventListener(event, handle, true);
    });

    return {
        update: (newParams: Parameters | string) => {
            const newEvents = typeof newParams == 'string' ? ['click'] : [newParams.events].flat(1);
            const newFallback = typeof newParams == 'string' ? false : newParams.fallback;
            const newText = typeof newParams == 'string' ? newParams : newParams.text;

            const addedEvents = newEvents.filter((x) => !events.includes(x));
            const removedEvents = events.filter((x) => !newEvents.includes(x));

            addedEvents.forEach((event) => {
                element.addEventListener(event, handle, true);
            });

            removedEvents.forEach((event) => {
                element.removeEventListener(event, handle, true);
            });

            fallback = newFallback;
            events = newEvents;
            text = newText;
        },
        destroy: () => {
            events.forEach((event) => {
                element.removeEventListener(event, handle, true);
            });
        },
    };
};
