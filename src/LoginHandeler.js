import React, { useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isCodeProcessed = useRef(false); // useRef를 사용하여 코드가 처리되었는지 여부를 저장

    const handleOAuthKakao = useCallback(async (code) => {
        try {
            const response = await axios.get(`http://localhost:8080/login/oauth2/callback/kakao?code=${code}`);
            const data = response.data.accessToken;
            localStorage.setItem ("ACCESS_TOKEN", data);
            navigate("/");

        } catch (error) {
            console.error("로그인 실패:", JSON.stringify(error.response.data));
            alert(`로그인 실패: ${JSON.stringify(error.response.data)}`);
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (isCodeProcessed.current) return; // 코드가 이미 처리되었으면 더 이상 실행하지 않음

        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code'); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 줌
        if (code) {
            handleOAuthKakao(code);
            isCodeProcessed.current = true; // 코드가 처리되었음을 표시
        }
    }, [location, handleOAuthKakao]);

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default LoginHandler;
