export const copy = (element: HTMLElement, text: string) => {
	const click = () => 
		text && navigator.clipboard.writeText(text);
	
	// TODO need to add optional dispatched event on:copy
	
 	element.addEventListener('click', click, true);
	
	return {
		update: t => (text = t),
		destroy: () => element.removeEventListener('click', click, true)
	}
}