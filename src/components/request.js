export const request = (url = "", method = "get", data = {}) => {
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  return new Promise((resolve, reject) => {
    const fetchConfig = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    switch (method.toLowerCase()) {
      case "get":
        url += `?${new URLSearchParams(data).toString()}`;
        break;
      case "post":
      case "put":
      case "delete":
        fetchConfig.body = JSON.stringify(data);
        break;
      default:
        break;
    }
    fetch(`${apiUrl}/${url}`, fetchConfig)
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
