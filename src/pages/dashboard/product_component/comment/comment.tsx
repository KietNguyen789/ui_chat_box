import type { CommentProps } from "./commentModel";


// decalre type for props of CommentProductComponent
export type CommentProductComponentProps = {
    commentList: CommentProps[]; // Replace CommentType with your actual type
};

export function CommentProductComponent({ commentList }: CommentProductComponentProps) {


    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
            {commentList.length > 0 ? (
                commentList.map((comment) => (
                    <div key={comment.id} className="w-full p-4 border-b border-gray-200">
                        <p className="text-sm text-gray-600">{comment.content}</p>

                        <div className='flex justify-start items-center'>
                            <p className="text-xs text-gray-400 mr-[10px]">By {comment.author} on {comment.date_comment.toLocaleDateString()}</p>

                            {Array.from({ length: comment.rating }, (_, i) => (
                                <i key={i} className="bi bi-star-fill text-yellow-400"></i>
                            ))}
                        </div>

                    </div>
                ))) : 'No comments available'
            }
        </div>
    )

}