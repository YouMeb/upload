upload
======

```javascript
var upload = require('upload');

upload('/upload')
  .file(file)
  .files([file, file, file])
  .set('X-CSRF-Token', csrfToken)
  .on('load', onload)
  .on('error', onerror)
  .on('progress', onprogress)
  .end()
```
