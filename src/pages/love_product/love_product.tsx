import Product from "../dashboard/product_component/product";
import type { ProductModelWithLike } from "../dashboard/product_component/productModel";
import { useStores } from "../../store/store_context";
import styles from './love_product.module.less';
import { observer } from "mobx-react-lite";

function LoveProductPage() {
    const { productStore } = useStores();
    const { filteredProducts } = productStore;

    // Filter products that are liked
    const likedProducts = filteredProducts.filter(product => product.isLiked);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {/* <h1 className="text-2xl font-bold mb-4 uppercase"
                style={{
                    color: 'var(--pink-color)',
                    marginTop: '50px'
            }}
            >Sản Phẩm Yêu Thích</h1> */}
            <div className={`${styles.dashboardContainer} w-screen h-screen flex flex-col lg:flex-row }`}>
                {productStore.loveProducts.map((product: ProductModelWithLike, index) => (
                    <Product key={product.id} id={product.id} />
                ))}
            </div>
        </div>
    );
}

export default observer(LoveProductPage);