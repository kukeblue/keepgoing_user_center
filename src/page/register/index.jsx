import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd';
import './index.less'
import {useSearchParams, useNavigate} from "react-router-dom";




const RegistrationForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRegister = () => {
        // 在这里处理注册逻辑
        console.log('用户名:', username);
        console.log('密码:', password);
        console.log('确认密码:', confirmPassword);
        console.log('邮箱:', email);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>注册</h2>
            <br />
            <Input
                placeholder="请输入用户名"
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
            <Input.Password
                placeholder="请确认密码"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                style={{ marginBottom: '16px' }}
            />
            <Input
                placeholder="请输入邮箱"
                value={email}
                onChange={handleEmailChange}
                style={{ marginBottom: '16px' }}
            />
            <div className='go-login'>已有账号<span 
            onClick={()=>{
                navigate('/login', {replace: true})
            }}
            className='go-login-link'>去登录</span></div>
            <Button
                type="primary"
                onClick={handleRegister}
                style={{ width: '100%' }}
            >
                注册
            </Button>
        </div>
    );
};

function RegisterPage() {
    const navigate = useNavigate();

    useEffect(() => {
    }, [])

    return <div className='register-page'>
        <div className='all-page-content'>
        <div className='login-header'>
            <div>LOGO</div>
            <div style={{'cursor': 'pointer'}} onClick={()=>{
                navigate('/index')
            }}>返回首页</div>
        </div>
            <RegistrationForm />
        </div>

    </div>
}

export default RegisterPage