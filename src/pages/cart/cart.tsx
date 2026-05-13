import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/store_context';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '../../constants/route';
import { Button } from 'antd';
import styles from './cart.module.less';

function CartPage() {
    const { cartStore, productStore } = useStores();
    const navigate = useNavigate();

    const total = cartStore.items.reduce((sum, item) => {
        const product = productStore.getProduct(item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
    }, 0);

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <div className={styles.pageHeader}>
                    <button className={styles.backBtn} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                        <i className="bi bi-arrow-left" /> Tiếp tục mua
                    </button>
                    <div className={styles.titleRow}>
                        <h2><i className="bi bi-cart3" style={{ marginRight: 10, color: '#f5568f' }} />Giỏ hàng</h2>
                        <span className={styles.badge}>{cartStore.totalItems}</span>
                    </div>
                </div>

                {cartStore.items.length === 0 ? (
                    <div className={styles.empty}>
                        <i className="bi bi-cart-x" />
                        <h3>Giỏ hàng trống</h3>
                        <p>Hãy thêm khóa học bạn muốn học vào giỏ</p>
                        <button className={styles.emptyBtn} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                            Khám phá khóa học
                        </button>
                    </div>
                ) : (
                    <div className={styles.layout}>
                        {/* Item list */}
                        <div className={styles.itemList}>
                            {cartStore.items.map(item => {
                                const product = productStore.getProduct(item.productId);
                                if (!product) return null;
                                return (
                                    <div key={item.productId} className={styles.cartItem}>
                                        <img src={product.img} alt={product.name} className={styles.itemImg} />
                                        <div className={styles.itemInfo}>
                                            <div className={styles.itemName}>{product.name}</div>
                                            <div className={styles.itemDes}>{product.des}</div>
                                            <div className={styles.itemPrice}>{product.price.toLocaleString()} VNĐ</div>
                                        </div>
                                        <div className={styles.itemControls}>
                                            <div className={styles.qtyRow}>
                                                <button onClick={() => cartStore.updateQuantity(item.productId, item.quantity - 1)}>
                                                    <i className="bi bi-dash" />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => cartStore.updateQuantity(item.productId, item.quantity + 1)}>
                                                    <i className="bi bi-plus" />
                                                </button>
                                            </div>
                                            <div className={styles.itemSubtotal}>
                                                {(product.price * item.quantity).toLocaleString()} VNĐ
                                            </div>
                                            <button className={styles.removeBtn} onClick={() => cartStore.removeFromCart(item.productId)}>
                                                <i className="bi bi-trash3" /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary */}
                        <div className={styles.summary}>
                            <h3>Tóm tắt đơn hàng</h3>
                            <div className={styles.summaryRows}>
                                {cartStore.items.map(item => {
                                    const product = productStore.getProduct(item.productId);
                                    if (!product) return null;
                                    return (
                                        <div key={item.productId} className={styles.summaryRow}>
                                            <span>{product.name} × {item.quantity}</span>
                                            <span>{(product.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.divider} />
                            <div className={styles.totalRow}>
                                <span>Tổng cộng</span>
                                <span className={styles.totalAmount}>{total.toLocaleString()} VNĐ</span>
                            </div>
                            <Button
                                type="primary"
                                size="large"
                                block
                                className={styles.checkoutBtn}
                                onClick={() => navigate(PAGE_ROUTES.CHECKOUT)}
                                icon={<i className="bi bi-credit-card" style={{ marginRight: 6 }} />}
                            >
                                Thanh toán ngay
                            </Button>
                            <button className={styles.clearBtn} onClick={() => cartStore.clearCart()}>
                                <i className="bi bi-trash3" /> Xóa giỏ hàng
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default observer(CartPage);
