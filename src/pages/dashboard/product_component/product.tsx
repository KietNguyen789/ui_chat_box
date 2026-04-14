import styles from './product.module.less';
import type { ProductModelWithLike, ProductProps } from './productModel';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { CommentProductComponent } from './comment/comment';
import { useStores } from '../../../store/store_context';
import { observer } from 'mobx-react-lite';
function Product({ id }: { id: number }) {


    const [isModalVisible, setIsModalVisible] = useState(false);
    //const [isLiked, setIsLiked] = useState<boolean>(false);
    const [animate, setAnimate] = useState(false);
    const { productStore, userStore } = useStores();
    const product: ProductModelWithLike = productStore.getProduct(id) as ProductModelWithLike;

    //console.log(product.);

    const handleClick = (product: ProductModelWithLike) => {
        console.log('Clicked product:', product.name, product.id);
        userStore.addNewId(product.id)
        setIsModalVisible(true);


    }
    const handleClose = () => {
        setIsModalVisible(false);
    }

    const toggleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        //setIsLiked((prev) => !prev);
        productStore.toggleLike(product.id);
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 400);

        console.log(productStore.products);
        console.log('Toggled like for product:', product.isLiked);
    }

    return (
        <div className={styles.wrapper}>

            <i
                className={`${styles.loveBtn} bi ${product.isLiked ? 'bi-heart-fill' : 'bi-heart'} text-black ${animate ? 'animate-ping' : ''}`}
                onClick={toggleLike}
            ></i>

            <div
                className={styles.productWrapper}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 10px 0 10px', justifyContent: 'space-between' }}
                onClick={() => handleClick(product)}
            >
                <div className='w-full' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div className="text-black w-full h-[50px] uppercase font-(family-name:--font-family-display)" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                    </div>
                    <div className="text-black flex items-center" style={{ color: 'var(--pink-color)' }}>
                        <p>Xem chi tiết</p>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z">
                            </path>
                        </svg>
                    </div>
                    <div className='w-full h-[80px] text-black' >{product.des}</div>
                    <div className='w-full text-black' ><i className="bi bi-bag-fill mr-[15px]" style={{ color: 'orange' }} />{product.price} VNĐ</div>
                </div>
                <img src={product.img} alt={product.id + ''} style={{ borderRadius: '0 24px 0 0' }} className='w-4/5 h-3/5' />

            </div>

            <Modal
                title={product.name}
                open={isModalVisible}
                onCancel={handleClose}
                footer={null}
            // style={{ zIndex: 1000 }}
            >
                <img src={product.img} alt={product.name} className="w-full mb-4" />
                <p><strong>Mô tả:</strong> {product.des}</p>
                <p><strong>Giá:</strong> {product.price.toLocaleString()} VNĐ</p>
                <CommentProductComponent commentList={product.comments} />
            </Modal>
        </div>

    );
}

export default observer(Product);