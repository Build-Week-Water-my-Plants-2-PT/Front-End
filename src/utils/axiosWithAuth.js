import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  axios.defaults.withCredentials = true;

  return axios.create({
    headers: {
      Authorization: token,
    },
    withCredentials: true,
  });
};
