import React, { useState } from "react";
import {
    Button,
    TextField,
    Link,
    Grid,
    Container,
    Typography,
} from "@mui/material";
import { signup } from "./service/ApiService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");

        try {
            const response = await signup({ email, username, password });
            setErrors({}); // 오류 상태 초기화
            console.log("회원가입 성공:", response);
            navigate("/login"); // 성공 시 /login으로 리다이렉트
        } catch (errorResponse) {
            console.error("회원가입 실패:", errorResponse);
            const errorMessages = {};
            if (errorResponse && Array.isArray(errorResponse.errors)) {
                errorResponse.errors.forEach((error) => {
                    errorMessages[error.field] = error.reason;
                });
            } else {
                errorMessages.general = "알 수 없는 오류가 발생했습니다.";
            }
            setErrors(errorMessages); // 오류 메시지를 상태에 저장
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="username"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="사용자 이름"
                            autoFocus
                            error={Boolean(errors.username)}
                            helperText={errors.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="current-password"
                            name="password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="비밀번호"
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            계정생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default SignUp;
