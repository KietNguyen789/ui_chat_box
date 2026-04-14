import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './bare.layout.module.less';
import { Header } from '../../pages/dashboard/header/header';
import ChatBox from '../../components/chatbot/chatbox';
const BareLayout: React.FC = () => {
    return (
        <Layout className={styles.container}>
            <Header></Header>
            <Outlet />
            <div className='flex flex-col'>
                <i className={`bi bi-bag-fill mb-[10px] ${styles.bag}`} style={{
                    fontSize: '50px', color: 'orange', position: 'fixed',
                    bottom: '80px',
                    right: '23px',

                }} />
                <ChatBox />
            </div>

        </Layout>
    );
};

export default observer(BareLayout);
