import axios from "axios";
import jwt from 'jwt-decode'

const API_URL = "http://localhost:8080";

export const login = (username, password) => {
	return axios.post(API_URL + "/authenticate", { username, password })
		.then((response) => {
			if (response.data.token) {
				console.log(JSON.stringify(jwt(response.data.token)));
				localStorage.setItem("user", JSON.stringify(jwt(response.data.token)));
				localStorage.setItem("token", JSON.stringify(response.data.token));
			}
			return JSON.parse(localStorage.getItem('user'));
		});
}

export const logout = () => {
	localStorage.removeItem("user");
}

export const register = (username, password, nombre, apellido, email) => {
	return axios.post(API_URL + "/register", {
		username,
		mail: email,
		password,
		name: nombre,
		apellido,
	});
}

export const getUsers = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return axios.get(API_URL + `/users/${user.sub}`, { headers: authHeader() });
}

export const makeAdmin = (username) => {
	console.log("asdasd");
	console.log(authHeader());
	return axios.get(API_URL + `/make_admin/${username}`, { headers: authHeader() }); 
}

export const updateUser = (nombre, apellido, email) => {
	const user = JSON.parse(localStorage.getItem('user'));
	return axios.post(API_URL + `/user/${user.sub}`, {
		mail: email,
		name: nombre,
		apellido, 
	},{
		headers: authHeader() 
	}); 
}

export const updateUserPassword = (oldPassword, newPassword) => {
	const user = JSON.parse(localStorage.getItem('user'));
	return axios.post(API_URL + `/changePass`, {
		username: user.sub,
		oldPassword,
		newPassword,
	},
	{ headers: authHeader() }).then((response) => {
		if (response.data.token) {
			localStorage.setItem("token", JSON.stringify(response.data.token));
		}
		return response;
	}); 
}

export const getUser = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return axios.get(API_URL + `/user/${user.sub}`, { headers: authHeader() }); 
}

export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    return { Authorization: token };
  } else {
    return {};
  }
}

export const beAuthHeader = () => {
	const token = JSON.parse(localStorage.getItem('token'));
	if (token) {
	  return { Authorization: 'Bearer ' + token };
	} else {
	  return {};
	}
  }