import { useState } from 'react';
import { Drawer, Badge, Button, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store/store_context';
import styles from './cart_drawer.module.less';

const BANK_ID = 'VCB';
const ACCOUNT_NO = '1234567890';
const ACCOUNT_NAME = 'ANTOREE EDU';

function CartDrawer() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<'cart' | 'qr'>('cart');
    const { cartStore, productStore } = useStores();

    const total = cartStore.items.reduce((sum, item) => {
        const p = productStore.getProduct(item.productId);
        return sum + (p?.price ?? 0) * item.quantity;
    }, 0);

    const orderCode = `ANT${Date.now().toString().slice(-6)}`;
    const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${total}&addInfo=${encodeURIComponent(orderCode)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

    const handleOpen = () => { setOpen(true); setStep('cart'); };
    const handleClose = () => { setOpen(false); setStep('cart'); };

    const handleConfirmPayment = () => {
        cartStore.clearCart();
        message.success('Thanh toán thành công! Cảm ơn bạn đã đăng ký.', 3);
        handleClose();
    };

    return (
        <>
            {/* Floating bag button */}
            <div className={styles.floatBtn} onClick={handleOpen}>
                <Badge count={cartStore.totalItems} color="#f5568f" size="small">
                    <i className="bi bi-bag-fill" />
                </Badge>
            </div>

            <Drawer
                open={open}
                onClose={handleClose}
                width={420}
                title={
                    <div className={styles.drawerTitle}>
                        {step === 'cart' ? (
                            <>
                                <i className="bi bi-cart3" />
                                <span>Giỏ hàng</span>
                                <Badge count={cartStore.totalItems} color="#f5568f" style={{ marginLeft: 6 }} />
                            </>
                        ) : (
                            <button className={styles.backBtn} onClick={() => setStep('cart')}>
                                <i className="bi bi-arrow-left" /> Quay lại giỏ hàng
                            </button>
                        )}
                    </div>
                }
                styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column' } }}
            >
                {/* ── STEP 1: CART ── */}
                {step === 'cart' && (
                    <div className={styles.cartPanel}>
                        {cartStore.items.length === 0 ? (
                            <div className={styles.empty}>
                                <i className="bi bi-cart-x" />
                                <p>Giỏ hàng trống</p>
                                <span>Hãy thêm khóa học bạn muốn vào giỏ</span>
                            </div>
                        ) : (
                            <>
                                <div className={styles.itemList}>
                                    {cartStore.items.map(item => {
                                        const product = productStore.getProduct(item.productId);
                                        if (!product) return null;
                                        return (
                                            <div key={item.productId} className={styles.cartItem}>
                                                <img src={product.img} alt={product.name} className={styles.itemImg} />
                                                <div className={styles.itemInfo}>
                                                    <div className={styles.itemName}>{product.name}</div>
                                                    <div className={styles.itemPrice}>
                                                        {product.price.toLocaleString()} VNĐ
                                                    </div>
                                                    <div className={styles.qtyRow}>
                                                        <button onClick={() => cartStore.updateQuantity(item.productId, item.quantity - 1)}>
                                                            <i className="bi bi-dash" />
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => cartStore.updateQuantity(item.productId, item.quantity + 1)}>
                                                            <i className="bi bi-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className={styles.itemRight}>
                                                    <div className={styles.itemSubtotal}>
                                                        {(product.price * item.quantity).toLocaleString()}
                                                    </div>
                                                    <button
                                                        className={styles.removeBtn}
                                                        onClick={() => cartStore.removeFromCart(item.productId)}
                                                    >
                                                        <i className="bi bi-x-lg" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={styles.cartFooter}>
                                    <div className={styles.totalRow}>
                                        <span>Tổng cộng</span>
                                        <span className={styles.total}>{total.toLocaleString()} VNĐ</span>
                                    </div>
                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        className={styles.checkoutBtn}
                                        onClick={() => setStep('qr')}
                                        icon={<i className="bi bi-qr-code" style={{ marginRight: 6 }} />}
                                    >
                                        Thanh toán bằng QR
                                    </Button>
                                    <button className={styles.clearBtn} onClick={() => cartStore.clearCart()}>
                                        <i className="bi bi-trash3" /> Xóa tất cả
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* ── STEP 2: QR ── */}
                {step === 'qr' && (
                    <div className={styles.qrPanel}>
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
                                <span className={styles.orderCode}>{orderCode}</span>
                            </div>
                        </div>

                        <div className={styles.note}>
                            <i className="bi bi-info-circle" />
                            Nhập đúng nội dung chuyển khoản để hệ thống xác nhận tự động
                        </div>

                        <div className={styles.qrFooter}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                className={styles.confirmBtn}
                                onClick={handleConfirmPayment}
                                icon={<i className="bi bi-check2-circle" style={{ marginRight: 6 }} />}
                            >
                                Tôi đã chuyển khoản
                            </Button>
                        </div>
                    </div>
                )}
            </Drawer>
        </>
    );
}

export default observer(CartDrawer);
