import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "accessToken";

export function call(api, method, request) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("ACCESS_TOKEN") ? `Bearer ${localStorage.getItem("ACCESS_TOKEN")}` : ""
    });
    let options = {
      headers: headers,
      url: API_BASE_URL + api,
      method: method, 
    };
  
    if (request) {
      options.body = JSON.stringify(request);
    }
  
    return fetch(options.url, options)
      .then((response) =>
        response.json().then((json) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
      )
      .catch((error) => {
        console.log("Oops!");
        console.log(error.status);
        console.log("Oops!");
        if (error.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      });
  }

// 로그인을 위한 API 서비스 메소드 signin
export async function signin(userDTO) {
    try {
      const response = await call("/api/auth/login", "POST", userDTO);
      console.log(response);
      if (response.accessToken) {
        // local 스토리지에 토큰 저장
        localStorage.setItem("ACCESS_TOKEN", response.accessToken);
        // accessToken이 존재하는 경우 todo 화면으로 리다이렉트
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }
  
// 회원 가입 요청
export async function signup(userDTO) {
    try {
        const response = await call("/api/auth/signup", "POST", userDTO);
        console.log(response);
        if (response.status === 200) {
            window.location.href = "/";
        }
    } catch (error) {
        console.log("Oops!");
        console.log(error.status);
        console.log("Oops!");
        if (error.status === 403) {
            window.location.href = "/auth/signup";
        }
        console.error(error);
    }
}
  
// 로그아웃
export function signout() {
    // local 스토리지에 토큰 삭제
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/";
}
