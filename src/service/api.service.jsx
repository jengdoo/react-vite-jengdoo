// import axios from "axios";
import axios from "./axios.customize";
const createdUserApi = (fullName, email, passWord, phoneNumber) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: passWord,
    phone: phoneNumber,
  };
  return axios.post(URL_BACKEND, data);
};
const fetchAllUserApi = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};
const updateUserApi = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL_BACKEND, data);
};
const deleteUserApi = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};
const handleUpdateLoadFile = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BACKEND, bodyFormData, config);
};
const updateUserAvatarApi = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    avatar: avatar,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL_BACKEND, data);
};
const registerUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const loginUserApi = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: 2000,
  };
  return axios.post(URL_BACKEND, data);
};
const getAccountUserApi = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};
const logoutApi = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};
const pageDataBook = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};
const createDataBook = (
  mainText,
  author,
  price,
  quantity,
  category,
  thumbnail
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
    thumbnail: thumbnail,
  };
  return axios.post(URL_BACKEND, data);
};
export {
  createdUserApi,
  updateUserApi,
  fetchAllUserApi,
  deleteUserApi,
  handleUpdateLoadFile,
  updateUserAvatarApi,
  registerUserApi,
  loginUserApi,
  getAccountUserApi,
  logoutApi,
  pageDataBook,
  createDataBook,
};
