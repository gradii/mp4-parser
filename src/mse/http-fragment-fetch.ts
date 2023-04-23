
export class HttpFragmentFetch {
  static queue = [];

  start;
  xhr;

  constructor(url, start, end, callback) {
    this.start = start;
    HttpFragmentFetch.queue.push(this);

    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader('Range', `bytes=${start}-${end}`);
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 206) {
        callback(xhr.response);
      }
      this.remove();
    };
    xhr.send();

    xhr.onerror = () => {
      this.remove();
    };
    xhr.onabort = () => {
      this.remove();
    };
  }

  static clear() {
    while (HttpFragmentFetch.queue.length) {
      const item = HttpFragmentFetch.queue.shift();
      item.xhr.abort();
    }
  }

  remove = () => {
    HttpFragmentFetch.queue = HttpFragmentFetch.queue.filter(
      item => item.start !== this.start
    );
  };
}
