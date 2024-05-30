import { staticURL } from '@/utils/api/apiURL';

export namespace ApiCalls {
  type callbackType = (audioContent: ArrayBuffer) => void;

  export function songContent(path: string, callBack: callbackType): void {

    const request = new XMLHttpRequest();

    request.open("GET", staticURL(path));
    request.responseType = "arraybuffer";

    request.onload = function () {
      const undecodedAudio: ArrayBuffer = request.response;
      console.log(undecodedAudio);
      callBack(undecodedAudio);
    };

    request.send();
  }
}
