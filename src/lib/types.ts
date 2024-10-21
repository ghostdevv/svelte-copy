export interface CopyEventParams {
	/**
	 * The text that was copied to clipboard
	 */
	text: string;
}

export type CopyCallback = (params: CopyEventParams) => void;

export type ErrorCallback = (params: Error) => void;

export interface Options {
	/**
	 * The text to copy to clipboard
	 */
	text: string;

	/**
	 * The events that will cause the copy to occur.
	 * @default 'click'
	 */
	events?: string[];

	/**
	 * This callback fires when text is successfully copied
	 */
	onCopy?: CopyCallback;

	/**
	 * This callback fires when an error occurs when copying
	 */
	onError?: ErrorCallback;
}
