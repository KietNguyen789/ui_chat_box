export interface CommentProps {
    id: number;
    productId: number;
    //userId: number;
    author: string;
    date_comment: Date;
    content: string;
    createdAt: string;
    updatedAt: string;
    rating: number;
}