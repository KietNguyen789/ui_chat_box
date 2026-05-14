export const courseTranslations: Record<string, { en: string }> = {
    // Names
    'Khóa học cambridge': { en: 'Cambridge English Course' },
    'Khóa học giao tiếp': { en: 'English Communication Course' },
    'Khóa học tăng điểm số': { en: 'Score Improvement Course' },
    'Khóa học IELTS': { en: 'IELTS Preparation Course' },
    'Khóa học TOEIC': { en: 'TOEIC Preparation Course' },
    'Khóa học phát âm': { en: 'Pronunciation Mastery Course' },
};

export function translateCourseName(name: string, lang: 'vi' | 'en'): string {
    if (lang === 'vi') return name;
    return courseTranslations[name]?.en ?? name;
}

export const uiText = {
    vi: {
        featuredCourses: 'Khóa học nổi bật',
        featuredDesc: 'Khám phá các chương trình học phù hợp với mọi lứa tuổi',
        viewDetail: 'Xem chi tiết',
        addToCart: 'Thêm vào giỏ hàng',
        price: 'Giá',
    },
    en: {
        featuredCourses: 'Featured Courses',
        featuredDesc: 'Explore programs suitable for all ages',
        viewDetail: 'View detail',
        addToCart: 'Add to cart',
        price: 'Price',
    },
};
