import axios from "axios";

const API_URL = "http://localhost:8080/seguridad";

export const login = (username, password) => {
	return axios.post(API_URL + "/login", { username, password })
		.then((response) => {
			if (response.data.accessToken) {
				console.log(response.data);
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		});
}

export const logout = () => {
	localStorage.removeItem("user");
}

export const register = (username, email, password) => {
	return axios.post(API_URL + "/registro", {
		username,
		email,
		password,
	});
}

export const getUsers = () => {
	return axios.get(API_URL + '/users', { headers: authHeader() });
}

export const makeAdmin = () => {
	return axios.post(API_URL + '/makeAdmin', { headers: authHeader() }); // FIXME: necesita un /id para identificar el usuario
}

export const updateUser = () => {
	return axios.post(API_URL + '/user', { headers: authHeader() }); // FIXME: necesita un /id para identificar el usuario
}

export const getUser = () => {
	return axios.get(API_URL + '/user', { headers: authHeader() }); // FIXME: necesita un /id para identificar el usuario
}

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}