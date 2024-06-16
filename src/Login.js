import React from "react";
import { signin} from "./service/ApiService";
import { Button, TextField, Grid, Link, Container, Typography } from "@mui/material";


const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY; 
const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleKakaoLogin = this.handleKakaoLogin.bind(this); // 함수 바인딩
  }
  // componentDidMount() {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get('code');
  //   if (code) {
  //     this.fetchAccessToken(code);
  //   }
  // }

  // fetchAccessToken(code) {
  //   // 서버로 코드를 보내 토큰 요청
  //   call('/api/auth/oauth2/kakao/token', 'POST', { code })
  //     .then(response => {
  //       localStorage.setItem('ACCESS_TOKEN', response.accessToken);
  //       window.location.href = '/';  // 로그인 성공 후 메인 페이지로 리다이렉트
  //     })
  //     .catch(error => {
  //       console.error('Failed to login with Kakao', error);
  //     });
  // }


  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");

    // ApiService의 signin 메소드를 사용해 로그인
    signin({ email: email, password: password });
  }

  // handleKakaoLogin() {
  //   window.location.href = KAKAO_AUTH_URL; // 카카오 인증 URL로 리다이렉션
  // }

  render() {
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <Grid container spacing={2}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
        <form noValidate onSubmit={this.handleSubmit}>
          {" "}
          {/* submit 버튼을 클릭하면 handleSubmit 이 실행됨 */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="패스워드"
                name="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary" style={{ height: '56px', fontSize: '20px' }}>로그인</Button>
            </Grid>
            <Grid item xs={12}>
              <a href={KAKAO_AUTH_URL} className="kakaobtn">
                <img src={process.env.PUBLIC_URL + `assets/kakao_login_large_wide.png`} alt="" style={{ height: '56px', width: '100%' }} />
              </a>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                계정이 없습니까? 여기서 가입하세요.
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default Login;
      