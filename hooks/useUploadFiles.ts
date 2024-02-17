import 'react-native-get-random-values';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import firebaseApp from './firebaseApp';

const storage = getStorage(firebaseApp);

export interface FileDescriptor {
  base64: string;
  uri: string;
  fileName: string;
}

// Why not fetch().blob()? See https://github.com/expo/expo/issues/2402#issuecomment-443726662
const fetchBlob = async (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

const uploadFile = async (file: FileDescriptor): Promise<string> => {
  const imageRef = ref(storage, `images-${uuidv4()}-${file.fileName}`);

  let blob;
  try {
    blob = await fetchBlob(file.uri);
  } catch (error) {
    console.debug('Error fetching file:', error);
    throw error;
  }

  try {
    await uploadBytesResumable(imageRef, blob);
  } catch (error) {
    console.debug('Error uploading file:', error);
    throw error;
  }

  // @ts-ignore
  blob.close();

  return await getDownloadURL(imageRef);
};

const uploadFiles = async (files: FileDescriptor[]): Promise<string[]> => {
  return Promise.all(files.map(uploadFile));
};

const useUploadFiles = () => {
  return uploadFiles;
};

export default useUploadFiles;
