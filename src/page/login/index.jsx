import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd';
import { useNavigate, useLocation, Link } from "react-router-dom";

import './index.less'



const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // 在这里处理登录逻辑
        console.log('用户名:', username);
        console.log('密码:', password);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>登录kuke的小站</h2>
            <br />
            <Input
                placeholder="请输入账号"
                value={username}
                onChange={handleUsernameChange}
                style={{ marginBottom: '16px' }}
            />
            <Input.Password
                placeholder="请输入密码"
                value={password}
                onChange={handlePasswordChange}
                style={{ marginBottom: '16px' }}
            />
            <br />
            <div className='go-login'>还没有账号？<span 
            onClick={()=>{
                navigate('/register', {replace: true})
            }}
            className='go-login-link'>去注册</span></div>
            <Button
                type="primary"
                onClick={handleLogin}
                style={{ width: '100%' }}
            >
                登录
            </Button>
        </div>
    );
};




function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
    }, [])

    return <div className='login-page'>
        <div className='login-header'>
            <div className='logo'></div>
            <div style={{'cursor': 'pointer'}} onClick={()=>{
                navigate('/index')
            }}>返回首页</div>
        </div>
        <div className='all-page-content'>
            <LoginForm />
        </div>

    </div>
}

export default LoginPage