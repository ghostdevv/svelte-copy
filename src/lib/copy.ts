interface Options {
    text: string;
    events?: string | string[];
}

export const copyText = async (text: string): Promise<void> => {
    if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(text);
    } else {
        /**
         * This is the fallback deprecated way of copying text to the clipboard. Only runs if it can't find the clipboard API.
         */
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
};

export const copy = (element: HTMLElement, options: Options) => {
    async function click() {
        if (options.text)
            try {
                await copyText(options.text);

                element.dispatchEvent(
                    new CustomEvent('svelte-copy', { detail: options.text }),
                );
            } catch (e) {
                element.dispatchEvent(
                    new CustomEvent('svelte-copy:error', { detail: e }),
                );
            }
    }

    if (!options.events) {
        options.events = 'click';
    }

    if (Array.isArray(options.events)) {
        options.events.forEach((event) => {
            element.addEventListener(event, click, true);
        });
    } else {
        element.addEventListener(options.events, click, true);
    }

    return {
        update: (o: Options) => {
            options.text = o.text;

            const oldEvents =
                Array.isArray(options.events)
                    ? options.events
                    : [options.events];
            const newEvents =
                Array.isArray(o.events)
                    ? o.events
                    : o.events
                    ? [o.events]
                    : ['click'];
            const addedEvents = newEvents.filter((x) => !oldEvents.includes(x));
            const removedEvents = oldEvents.filter(
                (x) => !newEvents.includes(x),
            );
            addedEvents.forEach((event) => {
                element.addEventListener(event, click, true);
            });
            removedEvents.forEach((event) => {
                element.removeEventListener(event, click, true);
            });
            options.events = newEvents;
        },
        destroy: () => {
            if (Array.isArray(options.events)) {
                options.events.forEach((event) => {
                    element.removeEventListener(event, click, true);
                });
            } else {
                element.removeEventListener(options.events, click, true);
            }
        },
    };
};
