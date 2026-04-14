import React from 'react';
import { Input, Button } from 'antd';
import { PAGE_ROUTES } from '../../constants/route';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const navigator = useNavigate();

    const handleSignin = () => {

        navigator(PAGE_ROUTES.DASHBOARD);

    }
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1>Login Page</h1>
            {/* Add your login form and logic here */}
            <Input placeholder="Username" className="mb-4" />
            <Input.Password placeholder="Password" className="mb-4" />
            <Button onClick={handleSignin}>Đăng Nhập</Button>
        </div>
    );
}

export default LoginPage;