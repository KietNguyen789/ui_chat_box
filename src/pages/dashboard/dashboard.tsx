import Product from './product_component/product'
import type { ProductProps } from './product_component/productModel'
import styles from './dashboard.module.less'
import type { ProductModelWithLike } from './product_component/productModel';
import { useEffect, useState } from 'react';
import { useStores } from '../../store/store_context';
import { observer } from 'mobx-react-lite';
import { Skeleton } from 'antd';
import { BannerCarousel } from '../../components/banner/banner_carousel';

function SkeletonCard() {
    return (
        <div className={styles.skeletonCard}>
            <Skeleton.Image active className={styles.skeletonImage} />
            <div className={styles.skeletonBody}>
                <Skeleton active paragraph={{ rows: 2 }} title={{ width: '60%' }} />
            </div>
        </div>
    );
}

function Dashboard() {
    const listProducts2: ProductProps[] = [
        {
            id: 1,
            des: 'Tiếng anh toàn diện theo chuẩn cambridge (6-18) tuổi',
            img: 'https://kynaenglish.vn/assets/images/pages/homepage/program-img-1.png',
            name: 'Khóa học cambridge',
            link: '',
            price: 500000,
            detail: 'Khóa học tiếng Anh toàn diện theo chuẩn Cambridge dành cho trẻ em từ 6-18 tuổi, giúp nâng cao kỹ năng ngôn ngữ và chuẩn bị cho các kỳ thi quốc tế.',
            comments: [
                { id: 1, productId: 1, author: 'Nguyen Van A', date_comment: new Date('2023-10-01'), content: 'Khóa học rất bổ ích và thú vị!', createdAt: '2023-10-01T12:00:00Z', updatedAt: '2023-10-01T12:00:00Z', rating: 5 },
                { id: 2, productId: 1, author: 'Nguyen Van B', date_comment: new Date('2023-10-01'), content: 'Khóa học rất hay', createdAt: '2023-10-01T12:00:00Z', updatedAt: '2023-10-01T12:00:00Z', rating: 4 },
            ],
        },
        {
            id: 2,
            des: 'Tiếng anh tăng cường giao tiếp (6-18) tuổi',
            img: 'https://kynaenglish.vn/assets/images/pages/homepage/program-img-2.png',
            name: 'Khóa học giao tiếp',
            link: '',
            price: 1000000,
            detail: 'Khóa học tiếng Anh toàn diện theo chuẩn Cambridge dành cho trẻ em từ 6-18 tuổi, giúp nâng cao kỹ năng ngôn ngữ và chuẩn bị cho các kỳ thi quốc tế.',
            comments: [
                { id: 1, productId: 1, author: 'Nguyen Van A', date_comment: new Date('2023-10-01'), content: 'Khóa học rất bổ ích và thú vị!', createdAt: '2023-10-01T12:00:00Z', updatedAt: '2023-10-01T12:00:00Z', rating: 5 },
                { id: 1, productId: 1, author: 'Nguyen Van B', date_comment: new Date('2023-10-01'), content: 'Khóa học bình thường', createdAt: '2023-10-01T12:00:00Z', updatedAt: '2023-10-01T12:00:00Z', rating: 3 },
            ],
        },
        {
            id: 3,
            des: 'Tiếng anh tăng điểm số tại trường (6-18) tuổi',
            img: 'https://kynaenglish.vn/assets/images/pages/homepage/program-img-3.png',
            name: 'Khóa học tăng điểm số',
            link: '',
            price: 300000,
            detail: 'Khóa học tiếng Anh toàn diện theo chuẩn Cambridge dành cho trẻ em từ 6-18 tuổi, giúp nâng cao kỹ năng ngôn ngữ và chuẩn bị cho các kỳ thi quốc tế.',
            comments: [
                { id: 1, productId: 1, author: 'Nguyen Van A', date_comment: new Date('2023-10-01'), content: 'Khóa học rất bổ ích và thú vị!', createdAt: '2023-10-01T12:00:00Z', updatedAt: '2023-10-01T12:00:00Z', rating: 5 },
                { id: 1, productId: 1, author: 'Nguyen Van B', date_comment: new Date('2023-10-01'), content: 'Khóa học chưa tốt lắm', createdAt: '2023-10-01T12:00:00Z', updatedAt: '2023-10-01T12:00:00Z', rating: 1 },
            ],
        },
    ];

    const [listProducts, setListProducts] = useState<ProductProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { productStore } = useStores();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/Event/all');
                if (!response.ok) throw new Error('Lỗi khi gọi API');
                const data = await response.json();
                const parsed = data.map((product: any) => ({
                    ...product,
                    comments: product.comments.map((c: any) => ({
                        ...c,
                        date_comment: new Date(c.date_comment),
                        createAt: new Date(c.createdAt),
                        updateAt: new Date(c.updatedAt),
                    })),
                }));
                setListProducts(parsed);
            } catch {
                setListProducts(listProducts2);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (productStore.products.length > 0) return;
        productStore.setProducts(listProducts);
    }, [listProducts.length]);

    return (
        <div className={styles.page}>
            {/* Hero */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Nâng cao tiếng Anh cùng <span>Antoree</span></h1>
                    <p>Hơn 200 khóa học chất lượng cao, được giảng dạy bởi giáo viên bản ngữ hàng đầu</p>
                    <div className={styles.heroStats}>
                        <div className={styles.heroStat}>
                            <strong>50K+</strong><span>Học viên</span>
                        </div>
                        <div className={styles.heroStat}>
                            <strong>200+</strong><span>Khóa học</span>
                        </div>
                        <div className={styles.heroStat}>
                            <strong>98%</strong><span>Hài lòng</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className={styles.main}>
                <BannerCarousel />

                <div className={styles.sectionTitle}>
                    <h2>Khóa học nổi bật</h2>
                    <p>Khám phá các chương trình học phù hợp với mọi lứa tuổi</p>
                </div>

                <div className={styles.grid}>
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
                        : productStore.filteredProducts.map((product: ProductModelWithLike) => (
                            <Product key={product.id} id={product.id} />
                        ))
                    }
                </div>
            </main>
        </div>
    );
}

export default observer(Dashboard);
