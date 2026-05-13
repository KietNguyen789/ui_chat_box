import { useState } from 'react';
import { Input, Button, message } from 'antd';
import type { CommentProps } from './commentModel';
import { useStores } from '../../../../store/store_context';
import styles from './comment.module.less';

export type CommentProductComponentProps = {
    commentList: CommentProps[];
    productId: number;
};

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hover, setHover] = useState(0);
    return (
        <div className={styles.starPicker}>
            {[1, 2, 3, 4, 5].map(star => (
                <i
                    key={star}
                    className={`bi ${star <= (hover || value) ? 'bi-star-fill' : 'bi-star'} ${styles.star}`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange(star)}
                />
            ))}
        </div>
    );
}

export function CommentProductComponent({ commentList, productId }: CommentProductComponentProps) {
    const { productStore } = useStores();
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!author.trim() || !content.trim()) {
            message.warning('Vui lòng điền đầy đủ tên và nội dung bình luận');
            return;
        }
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 500));
        productStore.addComment(productId, {
            author: author.trim(),
            content: content.trim(),
            rating,
            date_comment: new Date(),
        });
        setAuthor('');
        setContent('');
        setRating(5);
        setSubmitting(false);
        message.success('Đã gửi bình luận!');
    };

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>
                <i className="bi bi-chat-dots" /> Bình luận ({commentList.length})
            </h4>

            {/* Form */}
            <div className={styles.form}>
                <div className={styles.formRow}>
                    <Input
                        placeholder="Tên của bạn"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        prefix={<i className="bi bi-person" style={{ color: '#9ca3af' }} />}
                    />
                    <StarPicker value={rating} onChange={setRating} />
                </div>
                <Input.TextArea
                    placeholder="Chia sẻ cảm nhận về khóa học..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={3}
                    className={styles.textarea}
                />
                <Button
                    type="primary"
                    loading={submitting}
                    onClick={handleSubmit}
                    className={styles.submitBtn}
                    icon={<i className="bi bi-send" style={{ marginRight: 6 }} />}
                >
                    Gửi bình luận
                </Button>
            </div>

            {/* List */}
            <div className={styles.list}>
                {commentList.length === 0 ? (
                    <div className={styles.empty}>
                        <i className="bi bi-chat" />
                        <p>Chưa có bình luận. Hãy là người đầu tiên!</p>
                    </div>
                ) : (
                    commentList.map((comment, idx) => (
                        <div key={`${comment.id}-${idx}`} className={styles.commentItem}>
                            <div className={styles.commentHeader}>
                                <div className={styles.avatar}>
                                    {comment.author.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className={styles.commentAuthor}>{comment.author}</div>
                                    <div className={styles.commentMeta}>
                                        {comment.date_comment.toLocaleDateString('vi-VN')}
                                        <span className={styles.stars}>
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <i key={i} className={`bi ${i < comment.rating ? 'bi-star-fill' : 'bi-star'} ${styles.starSmall}`} />
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.commentContent}>{comment.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
