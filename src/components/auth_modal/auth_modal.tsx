import { useState } from 'react';
import { Modal, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/store_context';
import styles from './auth_modal.module.less';

interface Props {
    open: boolean;
    onClose: () => void;
}

function AuthModal({ open, onClose }: Props) {
    const { authStore } = useStores();
    const [tab, setTab] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState<'google' | 'facebook' | null>(null);

    const handleGoogle = async () => {
        setLoading('google');
        await new Promise(r => setTimeout(r, 1000));
        authStore.loginWithGoogle();
        setLoading(null);
        message.success('Đăng nhập Google thành công!');
        onClose();
    };

    const handleFacebook = async () => {
        setLoading('facebook');
        await new Promise(r => setTimeout(r, 1000));
        authStore.loginWithFacebook();
        setLoading(null);
        message.success('Đăng nhập Facebook thành công!');
        onClose();
    };

    return (
        <Modal open={open} onCancel={onClose} footer={null} width={420} centered>
            <div className={styles.wrapper}>
                <div className={styles.logoWrap}>
                    <img
                        src="https://commercial.static.antoree.com/assets/images/logo_withtagline.svg"
                        alt="Logo"
                        className={styles.logo}
                    />
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${tab === 'login' ? styles.tabActive : ''}`}
                        onClick={() => setTab('login')}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className={`${styles.tab} ${tab === 'register' ? styles.tabActive : ''}`}
                        onClick={() => setTab('register')}
                    >
                        Đăng ký
                    </button>
                </div>

                <h3 className={styles.title}>
                    {tab === 'login' ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}
                </h3>
                <p className={styles.subtitle}>
                    {tab === 'login'
                        ? 'Đăng nhập để tiếp tục hành trình học tập'
                        : 'Đăng ký để bắt đầu học tiếng Anh cùng Antoree'}
                </p>

                <div className={styles.socialBtns}>
                    <button
                        className={styles.googleBtn}
                        onClick={handleGoogle}
                        disabled={!!loading}
                    >
                        {loading === 'google' ? (
                            <span className={styles.spinner} />
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            </svg>
                        )}
                        {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'} bằng Google
                    </button>

                    <button
                        className={styles.facebookBtn}
                        onClick={handleFacebook}
                        disabled={!!loading}
                    >
                        {loading === 'facebook' ? (
                            <span className={`${styles.spinner} ${styles.spinnerWhite}`} />
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        )}
                        {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'} bằng Facebook
                    </button>
                </div>

                <p className={styles.terms}>
                    Bằng cách tiếp tục, bạn đồng ý với{' '}
                    <a>Điều khoản dịch vụ</a> và <a>Chính sách bảo mật</a> của Antoree
                </p>
            </div>
        </Modal>
    );
}

export default observer(AuthModal);
