import Compress from 'compress.js';

function compressFile(file, opts = { quality: 0.8 }) {
  const compress = new Compress();
  return compress.compress([file], opts)
    .then(imgs => {
      if (imgs.length > 0) {
        const img = imgs[0];
        const base64str = img.data;
        const imgExt = img.ext;
        const fileBlob = Compress.convertBase64ToFile(base64str, imgExt);
        return {
          fileBlob,
          base64str
        };
      } else {
        return null;
      }
    });
}

export {
  compressFile
};
