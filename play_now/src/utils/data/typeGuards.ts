import { AxiosError } from 'axios';

import { IServerStatusResponse } from '@/types/Api/IServerResponse';
import { Time } from '@/types/Data/Time';

export function isNull<T>(toCheck: T | null): toCheck is null {
  return toCheck === null;
}

export function isUndefined<T>(toCheck: T | undefined): toCheck is undefined {
  return toCheck === undefined;
}

export function isObject<T>(toCheck: T | object): toCheck is object {
  return typeof toCheck === "object";
}

export function isInputEvent(
  toCheck: Event
): toCheck is InputEvent {
  return toCheck.type === "input";
}

export function isChangeEvent(
  toCheck: Event
): toCheck is InputEvent {
  return toCheck.type === "change";
}

export function isHTMLButtonElement<T extends Object>(
  toCheck: T | HTMLButtonElement
): toCheck is HTMLButtonElement {
  return "disabled" in toCheck;
}

export function isHTMLInputElement<T extends Object>(
  toCheck: T | HTMLInputElement
): toCheck is HTMLInputElement {
  return "accept" in toCheck;
}

export function isString<T>(toCheck: T | string): toCheck is string {
  return typeof toCheck === "string";
}

export function isTime<T extends Object>(toCheck: T | Time): toCheck is Time {
  return "seconds" in toCheck;
}

export function isHTMLElement(
  toCheck: Element | HTMLElement | HTMLCollection
): toCheck is HTMLElement {
  return "innerText" in toCheck;
}

export function isHTMLCollection(
  toCheck: Element | HTMLElement | HTMLCollection
): toCheck is HTMLCollection {
  return "length" in toCheck;
}

export function isAudioHTMLElement(
  toCheck: HTMLElement
): toCheck is HTMLAudioElement {
  return "autoplay" in toCheck;
}

export function isServerResponse<T extends Object>(
  toCheck: T | IServerStatusResponse
): toCheck is IServerStatusResponse {
  return "statusCode" in toCheck || "serverStatusCode" in toCheck;
}

export function isAxiosError<T extends Object>(
  toCheck: T | AxiosError
): toCheck is AxiosError {
  return "response" in toCheck;
}
