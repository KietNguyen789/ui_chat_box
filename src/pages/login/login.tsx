import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { PAGE_ROUTES } from '../../constants/route';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.less';

function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignin = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 900));
        setLoading(false);
        navigate(PAGE_ROUTES.DASHBOARD);
    };

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <div className={styles.brand}>
                    <img
                        src="https://commercial.static.antoree.com/assets/images/logo_withtagline.svg"
                        alt="Logo"
                        className={styles.brandLogo}
                    />
                    <p className={styles.brandTagline}>
                        Nền tảng học tiếng Anh hàng đầu Việt Nam
                    </p>
                </div>
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>50K+</span>
                        <span className={styles.statLabel}>Học viên</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>200+</span>
                        <span className={styles.statLabel}>Khóa học</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>98%</span>
                        <span className={styles.statLabel}>Hài lòng</span>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Chào mừng trở lại</h2>
                        <p>Đăng nhập để tiếp tục hành trình học tập</p>
                    </div>

                    <Form layout="vertical" onFinish={handleSignin} className={styles.form}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                        >
                            <Input
                                size="large"
                                placeholder="Tên đăng nhập"
                                prefix={<i className="bi bi-person" style={{ marginRight: 6, color: '#9ca3af' }} />}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Mật khẩu"
                                prefix={<i className="bi bi-lock" style={{ marginRight: 6, color: '#9ca3af' }} />}
                            />
                        </Form.Item>

                        <div className={styles.formOptions}>
                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                            <a className={styles.forgotLink}>Quên mật khẩu?</a>
                        </div>

                        <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={loading}
                                className={styles.submitBtn}
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>

                    <p className={styles.registerHint}>
                        Chưa có tài khoản?{' '}
                        <a onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>Đăng ký ngay</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
