import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/store_context';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '../../constants/route';
import { Button, message } from 'antd';
import styles from './checkout.module.less';

const BANK_ID = 'VCB';
const ACCOUNT_NO = '1234567890';
const ACCOUNT_NAME = 'ANTOREE EDU';

function CheckoutPage() {
    const { cartStore, productStore } = useStores();
    const navigate = useNavigate();

    const total = cartStore.items.reduce((sum, item) => {
        const product = productStore.getProduct(item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
    }, 0);

    const orderCode = `ANTOREE${Date.now().toString().slice(-6)}`;

    const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${total}&addInfo=${encodeURIComponent(orderCode)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

    const handleConfirm = () => {
        cartStore.clearCart();
        message.success({ content: 'Xác nhận thanh toán thành công! Cảm ơn bạn.', duration: 3 });
        setTimeout(() => navigate(PAGE_ROUTES.DASHBOARD), 1500);
    };

    if (cartStore.items.length === 0) {
        return (
            <div className={styles.page}>
                <div className={styles.empty}>
                    <i className="bi bi-check-circle" />
                    <h3>Đơn hàng đã hoàn thành</h3>
                    <button className={styles.emptyBtn} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                        Về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <div className={styles.pageHeader}>
                    <button className={styles.backBtn} onClick={() => navigate(PAGE_ROUTES.CART)}>
                        <i className="bi bi-arrow-left" /> Quay lại giỏ hàng
                    </button>
                    <h2><i className="bi bi-credit-card" style={{ marginRight: 10, color: '#f5568f' }} />Thanh toán</h2>
                </div>

                <div className={styles.layout}>
                    {/* Order summary */}
                    <div className={styles.orderSummary}>
                        <h3>Chi tiết đơn hàng</h3>
                        {cartStore.items.map(item => {
                            const product = productStore.getProduct(item.productId);
                            if (!product) return null;
                            return (
                                <div key={item.productId} className={styles.orderItem}>
                                    <img src={product.img} alt={product.name} className={styles.orderImg} />
                                    <div className={styles.orderInfo}>
                                        <div className={styles.orderName}>{product.name}</div>
                                        <div className={styles.orderQty}>Số lượng: {item.quantity}</div>
                                    </div>
                                    <div className={styles.orderPrice}>
                                        {(product.price * item.quantity).toLocaleString()} VNĐ
                                    </div>
                                </div>
                            );
                        })}
                        <div className={styles.orderTotal}>
                            <span>Tổng thanh toán</span>
                            <span className={styles.totalAmt}>{total.toLocaleString()} VNĐ</span>
                        </div>
                    </div>

                    {/* QR Payment */}
                    <div className={styles.qrPanel}>
                        <div className={styles.qrHeader}>
                            <i className="bi bi-qr-code" />
                            <h3>Quét mã QR để thanh toán</h3>
                        </div>

                        <div className={styles.qrBox}>
                            <img src={qrUrl} alt="QR thanh toán" className={styles.qrImg} />
                        </div>

                        <div className={styles.bankInfo}>
                            <div className={styles.bankRow}>
                                <span>Ngân hàng</span>
                                <strong>Vietcombank (VCB)</strong>
                            </div>
                            <div className={styles.bankRow}>
                                <span>Số tài khoản</span>
                                <strong>{ACCOUNT_NO}</strong>
                            </div>
                            <div className={styles.bankRow}>
                                <span>Chủ tài khoản</span>
                                <strong>{ACCOUNT_NAME}</strong>
                            </div>
                            <div className={styles.bankRow}>
                                <span>Số tiền</span>
                                <strong className={styles.amountHighlight}>{total.toLocaleString()} VNĐ</strong>
                            </div>
                            <div className={styles.bankRow}>
                                <span>Nội dung CK</span>
                                <strong className={styles.orderCode}>{orderCode}</strong>
                            </div>
                        </div>

                        <div className={styles.note}>
                            <i className="bi bi-info-circle" />
                            Vui lòng nhập đúng nội dung chuyển khoản để hệ thống xác nhận tự động
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            block
                            className={styles.confirmBtn}
                            onClick={handleConfirm}
                            icon={<i className="bi bi-check2-circle" style={{ marginRight: 6 }} />}
                        >
                            Tôi đã chuyển khoản
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(CheckoutPage);
