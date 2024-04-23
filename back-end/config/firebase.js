const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'storgeimage',
  keyFilename: '../../back-end/storgeimage-firebase-adminsdk-jngs2-83ded0a853.json',
});

const uploadImageToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${Date.now()}-${file.originalname}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploadImageToFirebase };