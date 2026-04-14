import Product from "../dashboard/product_component/product";
import type { ProductModelWithLike } from "../dashboard/product_component/productModel";
import { useStores } from "../../store/store_context";
import styles from './history.module.less';
import { observer } from "mobx-react-lite";

function HistoryPage() {

    const { userStore } = useStores();





    return (
        <div className="w-full h-full flex flex-col items-start justify-center ">
            <h1
                style={{
                    color: '#ccc',
                    marginTop: '5px',
                    //fontSize: '20px'
                    fontWeight: '50px'
                }}
            >History</h1>

            <div className={`${styles.dashboardContainer} w-screen h-screen flex flex-col lg:flex-row`}>
                {userStore.getListClick.map((id: number, index) => {

                    console.log(id);

                    return (
                        <Product key={index} id={id} />

                    )
                })}
            </div>
        </div>
    );
}

export default HistoryPage;