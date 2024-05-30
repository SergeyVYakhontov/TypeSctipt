export type NumberOrUndefined = number | undefined;

export type StringOrUndefined = string | undefined;

export type DOMContainer = HTMLElement;

export type ElementOrNull = Element | null;

export type HTMLElementOrNull = HTMLElement | null;

export type HTMLCollectionOrNull = HTMLCollection | null;

export type DOMElementOrNull = HTMLElement | HTMLCollection | null;

export type renderToStringFunc<T> = (what: T) => Promise<string>;
