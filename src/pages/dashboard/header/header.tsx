import React from 'react';
import styles from './header.module.less';
import { Input, Image, Dropdown, Button, Select, List } from "antd";
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { useStores } from '../../../store/store_context';
import { priceFilter } from '../../../store/product_store/product_store';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '../../../constants/route';
import { inherits } from 'util';

const items: MenuProps['items'] = [
    { label: 'Khóa học', key: '1' },
    { label: 'Giáo viên', key: '2' },
    { label: 'Học viên', key: '3' }
];

const { Option } = Select;

const courseData = [
    { id: 1, name: 'English for Kids', category: 'Kids' },
    { id: 2, name: 'Business English', category: 'Business' },
    { id: 3, name: 'IELTS Preparation', category: 'Exam' },
    { id: 4, name: 'English Conversation', category: 'General' },
    { id: 5, name: 'TOEIC', category: 'Exam' },
];

const categories =
    [{ key: '<500K', value: 500 },
    { key: '500K-1TR', value: 1000 },
    { key: '>1TR', value: 2000 },
    { key: '>2TR', value: 50000 }
    ];
export function Header() {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { productStore } = useStores();

    const filteredCourses = selectedCategories.length === 0
        ? courseData
        : courseData.filter(course => selectedCategories.includes(course.category));

    const handleClick = () => {
        console.log(productStore.getfilteredProducts()); // Reset search query );

    }
    const handleNavigateToLovedProducts = () => {
        navigate(PAGE_ROUTES.LOVEPRODUCT);
    }
    const handleNavigateToHistory = () => {
        console.log('history');

        navigate(PAGE_ROUTES.HISTORY);
    }
    const navigate = useNavigate();

    const handleToDashBoard = () => {
        navigate(PAGE_ROUTES.DASHBOARD)
    }
    return (
        <div className={`w-full h-[50px] sm:h-[100px] shadow-md text-black ${styles.headerWrapper}`}>
            <div
                onClick={handleToDashBoard}
                style={{
                    height: '100%', backgroundColor: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 10px', borderBottomLeftRadius: '8px',
                    marginRight: '5px'
                }}
                className={`w-[80px] sm:w-[150px]`}
            >
                <img
                    src={'https://commercial.static.antoree.com/assets/images/logo_withtagline.svg'}
                    style={{ color: 'green' }}
                    className={`${styles.logo} hover: cursor-pointer `}
                ></img>
            </div>

            <div className="w-[100px] h-[30px] sm:w-[400px] sm:h-[55px] ml-[15px]">
                <Input
                    className="text-xs text-black sm:text-lg"
                    placeholder="Tìm kiếm khóa học..."
                    prefix={
                        <i className={`text-xs sm:text-lg bi bi-search ${styles.iconSearchInput} hover:${styles.sparkleIcon}`}
                            onClick={handleClick}>
                            <i className={`bi bi-stars text-xs sm:text-lg ${styles.iconstars} animate-ping`}></i>
                        </i>
                    }
                    onChange={(e) => productStore.setSearchQuery(e.target.value)}
                    style={{ borderRadius: '8px', height: '100%' }}
                />
            </div>
            <div
                className='w-[100px] h-[30px] sm:w-[400px] sm:h-[55px]'
                style={{ position: 'relative' }}>
                <Select
                    mode="multiple"
                    allowClear
                    // placeholder={"Filter Courses"}
                    style={{ margin: '0 5px' }}
                    onChange={(value) => productStore.setPriceFilter(value)}
                    prefix={<i
                        className={`text-xs sm:text-lg bi bi-funnel ${styles.iconfilter}`}
                        onClick={handleClick}
                        style={{ animation: 'sparkleFilter 2s infinite ease-in -out' }}

                    >
                        <i className={`bi bi-stars text-xs sm:text-lg ${styles.iconstars} animate-ping`}></i>
                    </i>}
                    className='w-full h-full'
                    //dropdownStyle={{ marginTop: '20px' }}
                    //getPopupContainer={() => document.body}
                    options={priceFilter.map((price, index: number) => ({ label: price, value: price }))}
                    popupRender={(originNode) => (
                        <div style={{ zIndex: 10000 }}>
                            <div style={{ padding: 8, borderBottom: '1px solid #ccc', marginTop: '15px' }}>
                                <strong>Chọn một mục</strong>
                            </div>
                            {originNode}
                            <div style={{ padding: 8, borderTop: '1px solid #ccc', textAlign: 'center' }}>
                                <a onClick={() => console.log('Add new item')}>+ Thêm mục mới</a>
                            </div>
                        </div>
                    )}
                >

                    {/* {priceFilter.map((price, index: number) => (
                        <Option
                            key={index}
                            value={price}
                        >
                            {price}
                        </Option>
                    ))} */}

                </Select>
            </div>
            <div className='w-[200px] sm:w-[500px] h-full flex items-center'>
                <button
                    className={`${styles.BtnLove} w-[70px] h-[15px] sm:w-[300px] sm:h-[55px] flex justify-center text-xs sm:text-3xl`}
                    onClick={handleNavigateToLovedProducts}

                >
                    <p className='font-sans' style={{ fontFamily: 'sans-serif' }}> Mục Yêu Thích</p>
                </button>

                <button
                    className={`${styles.BtnLove} w-[70px] h-[15px] sm:w-[200px] sm:h-[55px] flex justify-center text-xs sm:text-3xl`}
                    onClick={handleNavigateToHistory}
                >
                    <p className='font-sans' style={{ fontFamily: 'sans-serif' }}>Lịch sử</p>
                </button>
            </div>

        </div>
    );
}