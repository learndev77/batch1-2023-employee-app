import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api",
});

http.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    // console.log('unexpected error')
    alert("An unexpected error occurred");
  }

  return Promise.reject(error);
});

http.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    request.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return request;
});

export default http;

// axios.get("http://localhost:3001/api/employees").then((response) => {
//       // console.log(response.data);
//       setEmployees(response.data);
//     });
