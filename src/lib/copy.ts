interface Parameters {
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

export const copy = (element: HTMLElement, params: Parameters | string) => {
    async function handle() {
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
    }

    let text: string = '';
    let events: string[] = [];

    if (typeof params === 'string') {
        text = params;
        events = ['click'];
    } else if (params !== null && typeof params === 'object') {
        text = params.text;
        if (!params.events) {
            events = ['click'];
        } else if (typeof params.events === 'string') {
            events = [params.events];
        } else if (Array.isArray(params.events)) {
            events = params.events;
        }
    }

    events.forEach((event) => {
        element.addEventListener(event, handle, true);
    });

    return {
        update: (newParams: Parameters | string) => {
            let newEvents = [];
            if (typeof newParams === 'string') {
                text = newParams;
                newEvents = ['click'];
            } else if (newParams !== null && typeof newParams === 'object') {
                text = newParams.text;
                if (!newParams.events) {
                    newEvents = ['click'];
                } else if (typeof newParams.events === 'string') {
                    newEvents = [newParams.events];
                } else if (Array.isArray(newParams.events)) {
                    newEvents = newParams.events;
                }
            }

            const addedEvents = newEvents.filter((x) => !events.includes(x));
            const removedEvents = events.filter((x) => !newEvents.includes(x));
            addedEvents.forEach((event) => {
                element.addEventListener(event, handle, true);
            });
            removedEvents.forEach((event) => {
                element.removeEventListener(event, handle, true);
            });
            events = newEvents;
        },
        destroy: () => {
            events.forEach((event) => {
                element.removeEventListener(event, handle, true);
            });
        },
    };
};
