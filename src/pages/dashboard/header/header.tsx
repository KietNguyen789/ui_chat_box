import styles from './header.module.less';
import { Input, Select } from "antd";
import { useStores } from '../../../store/store_context';
import { priceFilter, type SortOption } from '../../../store/product_store/product_store';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../constants/route';

export function Header() {
    const { productStore } = useStores();
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.inner}>

                {/* Logo */}
                <div className={styles.logo} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                    <img
                        src="https://commercial.static.antoree.com/assets/images/logo_withtagline.svg"
                        alt="Logo"
                    />
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

                {/* Nav actions */}
                <nav className={styles.nav}>
                    <button
                        className={styles.navBtn}
                        onClick={() => navigate(PAGE_ROUTES.LOVEPRODUCT)}
                    >
                        <i className="bi bi-heart" />
                        <span>Yêu thích</span>
                    </button>
                    <button
                        className={styles.navBtn}
                        onClick={() => navigate(PAGE_ROUTES.HISTORY)}
                    >
                        <i className="bi bi-clock-history" />
                        <span>Lịch sử</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}
