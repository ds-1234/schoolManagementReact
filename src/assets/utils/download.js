import axios from 'axios';

export const downloadFile = (attachmentPath) => {
  const url = `http://localhost:8080/homework/download/${attachmentPath}`; // Adjust this path based on your backend

  axios({
    url,
    method: 'GET',
    responseType: 'blob', // Important for handling binary data
  })
  .then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', attachmentPath.split('/').pop()); // Get filename from path
    document.body.appendChild(link);
    link.click();
    link.remove(); // Clean up after downloading
  })
  .catch(error => {
    console.error('Error downloading file:', error);
  });
};
