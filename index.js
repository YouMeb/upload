var Emitter = require('emitter');
var bind = require('bind');

module.exports = function (url, files) {
  return new Upload(url, files);
};

Emitter(Upload.prototype);

function Upload(url) {
  this._url = url;
  this._form = new FormData();
  var xhr = this._xhr = XMLHttpRequest();

  xhr.onload = bind(this.emit, this, 'load');
  xhr.onerror = bind(this.emit, this, 'error');
  xhr.onprogress = bind(this.emit, this, 'progress');

  xhr.open('POST', url, true);
}

Upload.prototype.set = function (key, val) {
  this._xhr.setRequestHeader(key, val);
  return this;
};

Upload.prototype.file = function (file) {
  return this.files([file]);
};

Upload.prototype.files = function (files) {
  var formData = this._formData;
  var i;
  for (i = 0, file; file = files[i]; ++i) {
    formData.append(file.name, file);
  }
  return this;
};

Upload.prototype.end = function () {
  xhr.send(formData);
  return this;
};
