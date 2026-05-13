import { Carousel } from 'antd';
import styles from './banner_carousel.module.less';

const banners = [
    {
        id: 1,
        title: 'Học tiếng Anh theo chuẩn Cambridge',
        subtitle: 'Dành cho trẻ em 6–18 tuổi · Giáo viên bản ngữ',
        cta: 'Khám phá ngay',
        bg: 'linear-gradient(120deg, #f5568f 0%, #ff8c69 100%)',
        img: 'https://kynaenglish.vn/assets/images/pages/homepage/program-img-1.png',
        tag: 'Nổi bật',
    },
    {
        id: 2,
        title: 'Luyện IELTS · TOEIC cùng chuyên gia',
        subtitle: 'Lộ trình cá nhân hóa · Cam kết đầu ra',
        cta: 'Xem khóa học',
        bg: 'linear-gradient(120deg, #6366f1 0%, #8b5cf6 100%)',
        img: 'https://kynaenglish.vn/assets/images/pages/homepage/program-img-2.png',
        tag: 'Hot',
    },
    {
        id: 3,
        title: 'Giao tiếp tự nhiên từ 0 đến nâng cao',
        subtitle: 'Học mọi lúc · Học mọi nơi · Giảm 30% học phí',
        cta: 'Đăng ký học thử',
        bg: 'linear-gradient(120deg, #0ea5e9 0%, #06b6d4 100%)',
        img: 'https://kynaenglish.vn/assets/images/pages/homepage/program-img-3.png',
        tag: 'Ưu đãi',
    },
];

export function BannerCarousel() {
    return (
        <div className={styles.wrapper}>
            <Carousel
                autoplay
                autoplaySpeed={3500}
                infinite
                pauseOnHover={false}
                dots={{ className: styles.dots }}
                speed={600}
            >
                {banners.map((banner) => (
                    <div key={banner.id}>
                        <div className={styles.slide} style={{ background: banner.bg }}>
                            <div className={styles.slideContent}>
                                <span className={styles.tag}>{banner.tag}</span>
                                <h2>{banner.title}</h2>
                                <p>{banner.subtitle}</p>
                                <button className={styles.cta}>{banner.cta} →</button>
                            </div>
                            <div className={styles.slideImage}>
                                <img src={banner.img} alt={banner.title} />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
