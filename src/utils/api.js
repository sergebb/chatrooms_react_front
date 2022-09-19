import { authHeader } from "./auth";

const API_URL = "http://localhost:8000/api/v1.0/";
const API_URL_AUTH = "http://localhost:8000/auth/";
// const API_URL_AUTH = `${process.env.REACT_APP_API_URL}/`;


export function sendGet(customUrl) { 
  return fetch(API_URL + customUrl, {  
    method: 'GET',    
    headers: generateHeader()
  })
    .then(response => response.json())
    .then(
      (result) => {
        return result;
      })
    .catch(
      (error) => {
        console.log(error)
      }
    );
}

export function sendDelete(customUrl, params = {}) { 
  return fetch(API_URL + customUrl, {  
    method: 'DELETE',    
    headers: generateHeader(),
    body: JSON.stringify(params)
  })
    .then(
      (result) => {
        return result;
      })
    .catch(
      (error) => console.log(error)
    );
}


export function sendPost(customUrl, params, skipContent = false ) { 
  return fetch(API_URL + customUrl, {  
    method: 'POST',    
    headers: generateHeader(skipContent),
    body: skipContent ? params : JSON.stringify(params),
  })
    .then(response => response.json())
    .then(
      (result) => {
        return result;
      })
    .catch(
      (error) => console.log(error)
    );
}

export function authForm(customUrl, params) {
  let url_params = new URLSearchParams(params)
  return fetch(API_URL_AUTH + customUrl, {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: url_params
  })
    .then(response => response.json())
    .then(
      (result) => {
        return result;
      })
    .catch(
      (error) => console.log(error)
    );
}

export function authPost(customUrl, params) {
  return fetch(API_URL_AUTH + customUrl, {
    method: 'POST',    
    headers: generateHeader(),
    body: JSON.stringify(params) 
  })
    .then(response => response.json())
    .then(
      (result) => {
        return result;
      })
    .catch(
      (error) => console.log(error)
    );
}

export function authGet(customUrl) {
    return fetch(API_URL_AUTH + customUrl, {
      method: 'GET',    
      headers: generateHeader()
    })
      .then(response => response.json())
      .then(
        (result) => {
          return result;
        })
      .catch(
        (error) => console.log(error)
      );
  }


function generateHeader(skipContent = false) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    if (skipContent) {
      headers = {};
    }
    const auth_header = authHeader();
    if (auth_header) {
      headers = {...headers, ...auth_header};
    }
    return headers;
  }
