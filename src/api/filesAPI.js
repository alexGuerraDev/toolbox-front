export const fetchFiles = (fileName = null) => {
  let url = `${process.env.REACT_APP_API_URL}/files/data`;
  if (fileName) {
    url += `?fileName=${encodeURIComponent(fileName)}`;
  }
  return fetch(url).then(response => response.json());
};

export const fetchFileList = () => {
  const url = `${process.env.REACT_APP_API_URL}/files/list`;
  return fetch(url).then(response => response.json());
};


