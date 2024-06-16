import { API_BASE_URL } from "../app-config";

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
            response.text().then((text) => {
                let json;
                try {
                    json = text ? JSON.parse(text) : {}; // 빈 응답일 경우 빈 객체 반환
                } catch (error) {
                    return Promise.reject(new Error("Invalid JSON response")); // JSON 파싱 오류 처리
                }

                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch((error) => {
            console.error("Error during fetch:", JSON.stringify(error));
            if (error.status === 403 || error.status === 401) {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        });
}




    // return fetch(options.url, options)
    //   .then((response) =>
        
    //     response.json().then((json) => {
    //       if (!response.ok) {
    //        // return response.json().catch(() => ({})); // JSON 파싱 오류 처리 및 빈 객체 반환
    //         return Promise.reject(json);
    //       }
    //       return json;

    //     }
    //   )
     
    //   )
    //   .catch((error) => {
    //     console.error("Error during fetch:", JSON.stringify(error));
    //     if (error.status === 403 || error.status === 401) {
    //       window.location.href = "/login";
    //     }
    //     return Promise.reject(error);
    //   });
    
  // }

// // 로그인을 위한 API 서비스 메소드 signin
// export async function signin(userDTO) {
//     try {
//       const response = await call("/api/auth/login", "POST", userDTO);
//       console.log(response);
//       // if (response.code === 400) {
//       //   throw new Error("아이디 혹은 비밀번호가 틀립니다. 다시 입력해주세요.");
//       // }
//       if (response.status === 200) {
//         return response; // 성공 시 응답 반환
//       }
//       // if (response.accessToken) {
//       //   // local 스토리지에 토큰 저장
//       //   localStorage.setItem("ACCESS_TOKEN", response.accessToken);
//       //   // accessToken이 존재하는 경우 todo 화면으로 리다이렉트
//       //   window.location.href = "/";
//       // }
//     } catch (error) {
//       console.error("Signin failed:", JSON.stringify(error));
//       throw error;
//       //return Promise.reject(error);
//     }
// }


export async function signin(userDTO) {
  try {
    const response = await call("/api/auth/login", "POST", userDTO);
    return response; // 로그인 성공 시 응답 객체 반환
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message); // 400 오류 시 에러 메시지 반환
    }
    throw error; // 기타 오류는 throw
  }
}


// // 회원 가입 요청
// export async function signup(userDTO) {
//     try {
//       const response = await call("/api/auth/signup", "POST", userDTO);
//       console.log(response);
//       // if(response.status === 400) {
//       //   throw new Error("이미 존재하는 이메일입니다.");
//       // }

//       if(response.status === 201) {
//         window.location.href = "/";
//       }

//     }
//     catch (error) {
//       console.error("Signup failed:", JSON.stringify(error));
//       if (error.status === 403) {
//           window.location.href = "/signup";
//       }
//       // else if (error.status === 400) {
//       //   throw new Error("이미 존재하는 이메일입니다.");
//       // } else {
//       //   console.error(`추가 오류 정보: ${error.message}`);
//       // }
//       console.error(error);
//     }
// }
// 회원 가입 요청


// export async function signup(userDTO) {
//   try {
//     const response = await call("/api/auth/signup", "POST", userDTO);
//     console.log(response);

//     if (response.status === 201) {
//       window.location.href = "/";
//     }

//   } catch (error) {
//     console.error("Signup failed:", JSON.stringify(error));
//     if (error.status === 400) {
//       return Promise.reject(error.errors); // 400 오류 시 필드별 오류 메시지를 반환
//     }
//     return Promise.reject(error);
//   }
// }


// 회원 가입 요청
export async function signup(userDTO) {
  try {
      const response = await call("/api/auth/signup", "POST", userDTO);
      console.log(response);

      if (response.status === 201) {
          return response; // 성공 시 응답 반환
      }

  } catch (error) {
      console.error("Signup failed:", JSON.stringify(error));
      if (error.status === 400) {
          return Promise.reject(error.errors); // 400 오류 시 필드별 오류 메시지를 반환
      }
      return Promise.reject(error);
  }
}


// 로그아웃
export function signout() {
    // local 스토리지에 토큰 삭제
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/";
}
