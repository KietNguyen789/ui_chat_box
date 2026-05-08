import styles from './product.module.less';
import type { ProductModelWithLike } from './productModel';
import { Modal } from 'antd';
import { useState } from 'react';
import { CommentProductComponent } from './comment/comment';
import { useStores } from '../../../store/store_context';
import { observer } from 'mobx-react-lite';

function Product({ id }: { id: number }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const { productStore, userStore } = useStores();
    const product: ProductModelWithLike = productStore.getProduct(id) as ProductModelWithLike;

    const handleClick = () => {
        userStore.addNewId(product.id);
        setIsModalVisible(true);
    };

    const handleClose = () => setIsModalVisible(false);

    const toggleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        productStore.toggleLike(product.id);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 400);
    };

    return (
        <div className={styles.wrapper}>
            {/* Like button */}
            <i
                className={`${styles.loveBtn} bi ${product.isLiked ? 'bi-heart-fill' : 'bi-heart'} ${animate ? styles.animate : ''}`}
                onClick={toggleLike}
            />

            {/* Card body */}
            <div className={styles.productWrapper} onClick={handleClick}>
                <div className={styles.imageWrap}>
                    <img src={product.img} alt={product.name} />
                </div>

                <div className={styles.body}>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.des}>{product.des}</div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.price}>
                        <i className="bi bi-bag-fill" />
                        {product.price.toLocaleString()} VNĐ
                    </div>
                    <div className={styles.viewDetail}>
                        Xem chi tiết
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                            viewBox="0 0 24 24" height="14" width="14">
                            <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <Modal
                title={product.name}
                open={isModalVisible}
                onCancel={handleClose}
                footer={null}
            >
                <img src={product.img} alt={product.name} className="w-full mb-4 rounded-lg" />
                <p><strong>Mô tả:</strong> {product.des}</p>
                <p><strong>Giá:</strong> {product.price.toLocaleString()} VNĐ</p>
                <CommentProductComponent commentList={product.comments} />
            </Modal>
        </div>
    );
}

export default observer(Product);
