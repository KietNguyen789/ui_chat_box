import Product from './product_component/product'
import type { ProductProps } from './product_component/productModel'
import { Header } from './header/header'
import styles from './dashboard.module.less'
import type { ProductModelWithLike } from './product_component/productModel';
import { useEffect, useRef, useState } from 'react';
import { useStores } from '../../store/store_context';
import { observer } from 'mobx-react-lite';

function Dashboard() {
    //const [count, setCount] = useState(0)

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
                {
                    id: 1,
                    productId: 1,
                    author: 'Nguyen Van A',
                    date_comment: new Date('2023-10-01'),
                    content: 'Khóa học rất bổ ích và thú vị!',
                    createdAt: '2023-10-01T12:00:00Z',
                    updatedAt: '2023-10-01T12:00:00Z',
                    rating: 5, // Assuming rating is a number from 1 to 5
                },
                {
                    id: 2,
                    productId: 1,
                    author: 'Nguyen Van B',
                    date_comment: new Date('2023-10-01'),
                    content: 'Khóa học rất hay',
                    createdAt: '2023-10-01T12:00:00Z',
                    updatedAt: '2023-10-01T12:00:00Z',
                    rating: 4, // Assuming rating is a number from 1 to 5
                },

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
            comments:
                [
                    {
                        id: 1,
                        productId: 1,
                        author: 'Nguyen Van A',
                        date_comment: new Date('2023-10-01'),
                        content: 'Khóa học rất bổ ích và thú vị!',
                        createdAt: '2023-10-01T12:00:00Z',
                        updatedAt: '2023-10-01T12:00:00Z',
                        rating: 5, // Assuming rating is a number from 1 to 5
                    },
                    {
                        id: 1,
                        productId: 1,
                        author: 'Nguyen Van B',
                        date_comment: new Date('2023-10-01'),
                        content: 'Khóa học bình thường',
                        createdAt: '2023-10-01T12:00:00Z',
                        updatedAt: '2023-10-01T12:00:00Z',
                        rating: 3, // Assuming rating is a number from 1 to 5
                    },

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
            comments:
                [
                    {
                        id: 1,
                        productId: 1,
                        author: 'Nguyen Van A',
                        date_comment: new Date('2023-10-01'),
                        content: 'Khóa học rất bổ ích và thú vị!',
                        createdAt: '2023-10-01T12:00:00Z',
                        updatedAt: '2023-10-01T12:00:00Z',
                        rating: 5, // Assuming rating is a number from 1 to 5
                    },
                    {
                        id: 1,
                        productId: 1,
                        author: 'Nguyen Van B',
                        date_comment: new Date('2023-10-01'),
                        content: 'Khóa học chưa tốt lắm',
                        createdAt: '2023-10-01T12:00:00Z',
                        updatedAt: '2023-10-01T12:00:00Z',
                        rating: 1, // Assuming rating is a number from 1 to 5
                    },

                ],
        },
    ]

    // const productsWithLikeRef: ProductModelWithLike[] =
    //     listProducts.map(product => ({
    //         ...product,
    //         isLiked: false, // Initialize isLiked for each product
    //     }));
    // = useRef<ProductModelWithLike[]>([]);
    // useEffect(() => {
    //     productsWithLikeRef.current = listProducts.map(p => ({
    //         ...p,
    //         isLiked: false,
    //     }));
    // }, []);

    //const length = listProducts.length;
    //let productsWithLike: boolean[] = Array(length).fill(false);
    const [listProducts, setListProducts] = useState<ProductProps[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/Event/all');
                if (!response.ok) {
                    throw new Error("Lỗi khi gọi API");
                }

                const data = await response.json();

                console.log("Dữ liệu từ API:", data);

                // Optionally map/transform data to match ProductProps if needed
                // Example below assumes API returns correct structure
                const parsed = data.map((product: any) => ({
                    ...product,
                    comments: product.comments.map((c: any) => ({
                        ...c,
                        date_comment: new Date(c.date_comment),
                        createAt: new Date(c.createdAt),
                        updateAt: new Date(c.updatedAt)
                    }))
                }));
                console.log("Dữ liệu :", parsed);
                setListProducts(parsed);
            } catch (error) {
                console.error("Lỗi:", error);
            }
        };

        fetchData();
    }, [])

    const { productStore } = useStores();

    useEffect(() => {
        console.log(productStore.products.length);

        if (productStore.products.length > 0) return; // Prevent re-initialization if products are already set
        productStore.setProducts(listProducts);


    }, [listProducts.length]);

    return (
        <div>

            <div className={`${styles.dashboardContainer} w-screen h-screen flex flex-col lg:flex-row }`}>
                {productStore.filteredProducts.map((product: ProductModelWithLike, index) => (
                    <Product key={product.id} id={product.id} />
                ))}
            </div>
        </div>
    )
}

export default observer(Dashboard)
