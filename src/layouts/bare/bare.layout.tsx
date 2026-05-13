import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './bare.layout.module.less';
import { Header } from '../../pages/dashboard/header/header';
import ChatBox from '../../components/chatbot/chatbox';
import CartDrawer from '../../components/cart_drawer/cart_drawer';

const BareLayout: React.FC = () => {
    return (
        <Layout className={styles.container}>
            <Header />
            <Outlet />

            <CartDrawer />


            <ChatBox />
        </Layout>
    );
};

export default observer(BareLayout);
