//  tên, giá, ảnh, mô tả ngắn, nút "Xem chi tiết".
import type { CommentProps } from "./comment/commentModel";



export interface ProductProps {
    id: number;
    name: string;
    price: number;
    des: string;
    img: string;
    link?: string;
    detail: string;
    comments: CommentProps[]; // Optional property for comments

}

export interface ProductModelWithLike extends ProductProps {

    isLiked: boolean;
}