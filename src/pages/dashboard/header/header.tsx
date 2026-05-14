import { useState } from 'react';
import styles from './header.module.less';
import { Input, Select, Badge, Avatar, Dropdown, message } from "antd";
import { useStores } from '../../../store/store_context';
import { priceFilter, type SortOption } from '../../../store/product_store/product_store';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../constants/route';
import { observer } from 'mobx-react-lite';
import AuthModal from '../../../components/auth_modal/auth_modal';
import type { MenuProps } from 'antd';

function HeaderComponent() {
    const { productStore, cartStore, authStore } = useStores();
    const navigate = useNavigate();
    const [authOpen, setAuthOpen] = useState(false);

    const handleLogout = () => {
        authStore.logout();
        message.success('Đã đăng xuất');
    };

    const profileMenu: MenuProps = {
        items: [
            {
                key: 'info',
                icon: <i className="bi bi-person-circle" style={{ fontSize: 15 }} />,
                label: (
                    <div>
                        <div style={{ fontWeight: 600, color: '#111827' }}>{authStore.user?.name}</div>
                        <div style={{ fontSize: 12, color: '#9ca3af' }}>{authStore.user?.email}</div>
                    </div>
                ),
            },
            { type: 'divider' },
            {
                key: 'language',
                icon: <i className="bi bi-translate" style={{ fontSize: 15 }} />,
                label: 'Đổi ngôn ngữ',
                children: [
                    {
                        key: 'vi',
                        label: (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                🇻🇳 Tiếng Việt
                                {authStore.language === 'vi' && <i className="bi bi-check2" style={{ color: '#f5568f' }} />}
                            </span>
                        ),
                    },
                    {
                        key: 'en',
                        label: (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                🇬🇧 English
                                {authStore.language === 'en' && <i className="bi bi-check2" style={{ color: '#f5568f' }} />}
                            </span>
                        ),
                    },
                ],
            },
            { type: 'divider' },
            {
                key: 'logout',
                icon: <i className="bi bi-box-arrow-right" style={{ fontSize: 15, color: '#ef4444' }} />,
                label: <span style={{ color: '#ef4444' }}>Đăng xuất</span>,
            },
        ],
        onClick: ({ key }) => {
            if (key === 'logout') handleLogout();
            if (key === 'vi') authStore.setLanguage('vi');
            if (key === 'en') authStore.setLanguage('en');
        },
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    {/* Logo */}
                    <div className={styles.logo} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                        <img src="https://commercial.static.antoree.com/assets/images/logo_withtagline.svg" alt="Logo" />
                    </div>

                    {/* Search */}
                    <div className={styles.searchWrap}>
                        <Input
                            placeholder="Tìm kiếm khóa học..."
                            prefix={<i className={`bi bi-search ${styles.searchIcon}`} />}
                            onChange={(e) => productStore.setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    {/* Filter */}
                    <div className={styles.filterWrap}>
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder={
                                <span className={styles.filterPlaceholder}>
                                    <i className="bi bi-funnel" /> Lọc giá
                                </span>
                            }
                            onChange={(value) => productStore.setPriceFilter(value)}
                            options={priceFilter.map((price) => ({ label: price, value: price }))}
                            className={styles.filterSelect}
                        />
                    </div>

                    {/* Sort */}
                    <div className={styles.sortWrap}>
                        <Select
                            defaultValue="default"
                            onChange={(value: SortOption) => productStore.setSortBy(value)}
                            className={styles.filterSelect}
                            options={[
                                { label: '⇅ Mặc định', value: 'default' },
                                { label: '↑ Giá thấp', value: 'price_asc' },
                                { label: '↓ Giá cao', value: 'price_desc' },
                                { label: 'A–Z Tên', value: 'name_asc' },
                            ]}
                        />
                    </div>

                    {/* Nav */}
                    <nav className={styles.nav}>
                        <button className={styles.navBtn} onClick={() => navigate(PAGE_ROUTES.LOVEPRODUCT)}>
                            <i className="bi bi-heart" /><span>Yêu thích</span>
                        </button>
                        <button className={styles.navBtn} onClick={() => navigate(PAGE_ROUTES.HISTORY)}>
                            <i className="bi bi-clock-history" /><span>Lịch sử</span>
                        </button>
                        <button className={`${styles.navBtn} ${styles.cartBtn}`} onClick={() => navigate(PAGE_ROUTES.CART)}>
                            <Badge count={cartStore.totalItems} size="small" color="#f5568f">
                                <i className="bi bi-cart3" style={{ fontSize: 18 }} />
                            </Badge>
                            <span>Giỏ hàng</span>
                        </button>

                        {/* Auth */}
                        {authStore.isLoggedIn ? (
                            <Dropdown menu={profileMenu} trigger={['hover']} placement="bottomRight">
                                <div className={styles.avatarWrap}>
                                    <Avatar
                                        src={authStore.user?.avatar}
                                        size={36}
                                        className={styles.avatar}
                                    />
                                    <span className={styles.avatarName}>{authStore.user?.name.split(' ').pop()}</span>
                                </div>
                            </Dropdown>
                        ) : (
                            <button className={styles.loginBtn} onClick={() => setAuthOpen(true)}>
                                <i className="bi bi-person-circle" />
                                <span>Đăng nhập</span>
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    );
}

export const Header = observer(HeaderComponent);
