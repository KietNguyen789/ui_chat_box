import Product from "../dashboard/product_component/product";
import type { ProductModelWithLike } from "../dashboard/product_component/productModel";
import { useStores } from "../../store/store_context";
import styles from './love_product.module.less';
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../constants/route";

function LoveProductPage() {
    const { productStore } = useStores();
    const navigate = useNavigate();
    const likedProducts = productStore.loveProducts;

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <div className={styles.pageHeader}>
                    <button className={styles.backBtn} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                        <i className="bi bi-arrow-left" /> Quay lại
                    </button>
                    <div className={styles.titleRow}>
                        <h2>
                            <i className="bi bi-heart-fill" style={{ color: '#f5568f', marginRight: 10 }} />
                            Sản phẩm yêu thích
                        </h2>
                        <span className={styles.badge}>{likedProducts.length}</span>
                    </div>
                    <p className={styles.subtitle}>Các khóa học bạn đã lưu lại</p>
                </div>

                {likedProducts.length === 0 ? (
                    <div className={styles.empty}>
                        <i className="bi bi-heart" />
                        <h3>Chưa có sản phẩm yêu thích</h3>
                        <p>Hãy khám phá và lưu lại những khóa học bạn quan tâm</p>
                        <button className={styles.emptyBtn} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                            Khám phá khóa học
                        </button>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {likedProducts.map((product: ProductModelWithLike) => (
                            <Product key={product.id} id={product.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default observer(LoveProductPage);
