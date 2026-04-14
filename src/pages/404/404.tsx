import { Button, Layout, Typography } from 'antd';
import { t } from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './404.module.less';
const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Layout className={styles.container}>
            <div className={styles.wrapper}>
                <Typography.Title level={1} className={styles.title}>
                    404
                </Typography.Title>
                <Typography.Title level={4} className={styles.description}>
                    {'Not Found'}
                </Typography.Title>
                <Typography className={styles.description}>{'Oops. The page you were looking for does not exist.'}</Typography>
                <Button type="primary" onClick={() => navigate(-1)} className={styles.button}>
                    {'Back'}
                </Button>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
