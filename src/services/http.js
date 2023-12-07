import axios from "axios";

const http = axios.create({
  baseURL: "http://dfsdsafsa:3001/api",
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
});

export default http;

// axios.get("http://localhost:3001/api/employees").then((response) => {
//       // console.log(response.data);
//       setEmployees(response.data);
//     });
