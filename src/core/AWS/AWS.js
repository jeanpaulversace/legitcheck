export const getSignedRequest = (formattedFileName, file) => new Promise((res, rej) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${formattedFileName}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log('this is response.url:', response.url);
        res({
          signedRequest: response.signedRequest,
          url: response.url,
        });
      } else {
        rej('Error getting signed request!');
      }
    }
  };
  xhr.send();
});

export const uploadFile = (file, signedRequest, onProgress) => new Promise((res, rej) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.readyState === 4) {
        return xhr.status === 200 ? res() : rej('Error uploading file!');
      }
    }
  };
  if (xhr.upload && onProgress) {
    xhr.upload.onprogress = onProgress;
  }
  xhr.send(file);
});
