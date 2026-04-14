import { Button, Layout, Typography } from 'antd';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import styles from './500.module.less';
import React from 'react';

const InternalServerErrorPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Layout className={styles.container}>
            <div className={styles.wrapper}>
                <Typography.Title level={2} className={styles.title}>
                    500
                </Typography.Title>
                <Typography.Title level={4} className={styles.description}>
                    {'Internal Server Error'}
                </Typography.Title>
                <Typography className={styles.description}>
                    {'Something were wrong.'}
                </Typography>
                <Button type="primary" onClick={() => navigate(-1)} className={styles.button}>
                    {'Back'}
                </Button>
            </div>
        </Layout>
    );
};

export default InternalServerErrorPage;
