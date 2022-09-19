import { authGet } from "./api";

export function saveToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
};

export function getToken() {
    const token = localStorage.getItem("token");
    if (token && token !== 'undefined') {
        return JSON.parse(token).access_token;
    }
    return;
};

export function removeToken() {
    localStorage.removeItem("token");
};

export function verifyAuth() {
    let response = authGet('users/me/')
    .then( (data) => {
        if (data.id)
            return true
        else {
            removeToken()
            return false
        }
    })
    .catch(err => {console.log(err)})

    return response
}

export function authHeader() {
    if (!getToken()) {
        return;
    }
    return { Authorization: 'Bearer ' + getToken() };
}
