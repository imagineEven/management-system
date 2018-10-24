import * as login from './login';
import * as upload from './upload';

console.log('upload', upload);

export default {
  login,
  upload: upload.uploadImage
}
