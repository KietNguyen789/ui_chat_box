import styles from './product.module.less';
import type { ProductModelWithLike } from './productModel';
import { Modal, Button, message } from 'antd';
import { useState } from 'react';
import { CommentProductComponent } from './comment/comment';
import { useStores } from '../../../store/store_context';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../constants/route';
import { translateCourseName } from '../../../constants/translations';

function Product({ id }: { id: number }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const { productStore, userStore, cartStore, authStore } = useStores();
    const navigate = useNavigate();
    const product: ProductModelWithLike = productStore.getProduct(id) as ProductModelWithLike;
    const displayName = translateCourseName(product?.name ?? '', authStore.language);

    const handleClick = () => {
        userStore.addNewId(product.id);
        setIsModalVisible(true);
    };

    const handleClose = () => setIsModalVisible(false);

    const toggleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        const willLike = !product.isLiked;
        productStore.toggleLike(product.id);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 400);
        if (willLike) {
            message.success({ content: 'Đã thêm vào yêu thích', icon: <i className="bi bi-heart-fill" style={{ color: '#f5568f', marginRight: 8 }} /> });
        } else {
            message.info({ content: 'Đã bỏ khỏi yêu thích', icon: <i className="bi bi-heart" style={{ marginRight: 8 }} /> });
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        cartStore.addToCart(product.id);
        message.success({
            content: (
                <span>
                    Đã thêm vào giỏ hàng!{' '}
                    <a style={{ color: '#1677ff' }} onClick={() => navigate(PAGE_ROUTES.CART)}>Xem giỏ</a>
                </span>
            ),
            icon: <i className="bi bi-cart-check" style={{ color: '#22c55e', marginRight: 8 }} />,
        });
    };

    return (
        <div className={styles.wrapper}>
            <i
                className={`${styles.loveBtn} bi ${product.isLiked ? 'bi-heart-fill' : 'bi-heart'} ${animate ? styles.animate : ''}`}
                onClick={toggleLike}
            />

            <div className={styles.productWrapper} onClick={handleClick}>
                <div className={styles.imageWrap}>
                    <img src={product.img} alt={product.name} />
                </div>
                <div className={styles.body}>
                    <div className={styles.name}>{displayName}</div>
                    <div className={styles.des}>{product.des}</div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.price}>
                        <i className="bi bi-bag-fill" />
                        {product.price.toLocaleString()} VNĐ
                    </div>
                    <div className={styles.viewDetail}>
                        Xem chi tiết
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="14" width="14">
                            <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <Modal
                title={product.name}
                open={isModalVisible}
                onCancel={handleClose}
                footer={
                    <Button
                        type="primary"
                        size="large"
                        block
                        icon={<i className="bi bi-cart-plus" style={{ marginRight: 6 }} />}
                        onClick={handleAddToCart}
                        style={{ background: 'linear-gradient(135deg,#f5568f,#ff8c69)', border: 'none', borderRadius: 10, fontWeight: 600 }}
                    >
                        Thêm vào giỏ hàng — {product.price.toLocaleString()} VNĐ
                    </Button>
                }
                width={600}
            >
                <img src={product.img} alt={product.name} className="w-full mb-4 rounded-lg" style={{ maxHeight: 260, objectFit: 'cover' }} />
                <p style={{ marginBottom: 4 }}><strong>Mô tả:</strong> {product.des}</p>
                <p><strong>Giá:</strong> <span style={{ color: '#f97316', fontWeight: 600 }}>{product.price.toLocaleString()} VNĐ</span></p>
                <CommentProductComponent commentList={product.comments} productId={product.id} />
            </Modal>
        </div>
    );
}

export default observer(Product);
