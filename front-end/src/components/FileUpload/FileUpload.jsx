import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { PropTypes } from 'prop-types';

const FileUpload = ({ storagePath, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `${storagePath}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        }, 
        (error) => {
          console.error('Upload failed:', error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            if (onUploadSuccess) {
              onUploadSuccess(downloadURL);
            }
            console.log('File available at', downloadURL);
          });
        }
      );
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>Progress: {progress}%</div>
      {url && <div>File URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></div>}
    </div>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  storagePath: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func,
};