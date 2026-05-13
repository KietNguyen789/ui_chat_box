import Product from "../dashboard/product_component/product";
import { useStores } from "../../store/store_context";
import styles from './history.module.less';
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../constants/route";

function HistoryPage() {
    const { userStore } = useStores();
    const navigate = useNavigate();
    const history = userStore.getListClick;

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <div className={styles.pageHeader}>
                    <button className={styles.backBtn} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                        <i className="bi bi-arrow-left" /> Quay lại
                    </button>
                    <div className={styles.titleRow}>
                        <h2>
                            <i className="bi bi-clock-history" style={{ color: '#6366f1', marginRight: 10 }} />
                            Lịch sử xem
                        </h2>
                        <span className={styles.badge}>{history.length}</span>
                    </div>
                    <p className={styles.subtitle}>Các khóa học bạn đã xem gần đây</p>
                </div>

                {history.length === 0 ? (
                    <div className={styles.empty}>
                        <i className="bi bi-clock" />
                        <h3>Chưa có lịch sử xem</h3>
                        <p>Hãy khám phá và xem các khóa học bạn quan tâm</p>
                        <button className={styles.emptyBtn} onClick={() => navigate(PAGE_ROUTES.DASHBOARD)}>
                            Khám phá khóa học
                        </button>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {history.map((id: number) => (
                            <Product key={id} id={id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default observer(HistoryPage);
