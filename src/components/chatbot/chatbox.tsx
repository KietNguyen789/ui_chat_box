import React, { useEffect, useState, useRef } from 'react';
import { Image, Input } from 'antd';
import styles from './chatbox.module.less';
import { Spin } from 'antd';
import OpenAI from 'openai';
import { type ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { productStore } from '../../store/product_store/product_store';
import love_product from '../../pages/love_product/love_product';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
    organization: import.meta.env.VITE_ORG_ID as string,
    project: import.meta.env.VITE_PROJECT_ID as string,
    dangerouslyAllowBrowser: true,
});


function ChatBox() {

    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const prevLoveListRef = useRef<string>(''); // lưu giá trị cũ


    const handleClick = () => {
        // Logic to open the chatbox or perform an action
        console.log('Chatbox clicked');
        setIsOpen((prev) => !prev);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        const loveList = productStore.loveProducts
            .map((pro) => pro.name)
            .join(', '); // clean join — no duplicate comma

        if (prevLoveListRef.current === loveList) return;
        prevLoveListRef.current = loveList;

        const newSystemMsg: ChatCompletionMessageParam = {
            role: 'system',
            content: `Sản phẩm yêu thích: ${loveList || 'Không có sản phẩm nào'}`
        };

        setMessages((prev) => {
            const others = prev.filter(m => m.role !== 'system');
            return [newSystemMsg, ...others];
        });
    }, [productStore.loveProducts]);


    const sendMessage = async () => {

        if (!input.trim()) return;

        // Add user message to history
        const newUserMessage: ChatCompletionMessageParam = { role: 'user', content: input };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);

        setInput(''); // Clear input field
        setLoading(true); // Show loading indicator

        try {
            // Call OpenAI API
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini', // Using gpt-4o-mini as per your original request
                messages: updatedMessages,
            });

            // Extract assistant's reply
            const assistantReply = completion.choices[0].message;

            if (assistantReply && assistantReply.content) {
                // Add assistant's reply to history
                setMessages((prev) => [...prev, assistantReply]);
            } else {
                console.log("No content received from OpenAI.");
                setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I could not get a response.' }]);
            }
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Error: Could not connect to the AI. Please try again.' }]);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div className={`fixed bottom-4 right-4 z-50`}>
            {isOpen && (
                <div
                    className={`
                ${styles.chatBox} 
                w-[90vw] max-w-[400px] h-[70vh] 
                sm:w-[300px] sm:h-[500px]
                flex flex-col justify-between 
                shadow-lg rounded-xl bg-white p-2
              `}
                >
                    <i
                        className={`bi bi-x-octagon ${styles.closeIcon} text-xl text-gray-600 self-end cursor-pointer`}
                        onClick={handleClick}
                    ></i>

                    {/* Message area */}
                    <div className={`${styles.messageArea} flex-1 overflow-y-auto px-2`}>
                        {messages.map((msg, i) => {
                            const isUser = msg.role === 'user';
                            const isSystem = msg.role === 'system';

                            return (
                                <div
                                    key={i}
                                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}
                                >
                                    <div
                                        className={`max-w-[80%] p-2 rounded-lg text-sm ${isUser
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : isSystem
                                                ? 'hidden'
                                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        {typeof msg.content === 'string'
                                            ? msg.content
                                            : Array.isArray(msg.content)
                                                ? msg.content.map((part, idx) => {
                                                    if (part.type === 'text') {
                                                        return <React.Fragment key={idx}>{part.text}</React.Fragment>;
                                                    }
                                                    return null;
                                                })
                                                : ''}
                                    </div>
                                </div>
                            );
                        })}
                        {loading && (
                            <div className="flex justify-center py-2">
                                <Spin size="small" />
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="border-t mt-2 pt-2">
                        <Input
                            className={`${styles.InputChat} w-full`}
                            onChange={handleChange}
                            suffix={
                                <i
                                    className={`bi bi-send-fill ${styles.sendBtn} text-blue-500 cursor-pointer`}
                                    onClick={sendMessage}
                                ></i>
                            }
                            placeholder="Type your message..."
                            style={{ outline: 'none', border: 'none' }}
                            value={input}
                        />
                    </div>
                </div>
            )}

            {/* Closed state (button to open chat) */}
            {!isOpen && (
                <img
                    src="https://media3.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cG50bHhzazI2a3cxcmM5cnVrZzl2c2l5N3lybmYzM2szczluM2J0eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5x0JOVtC3uGINmYkAP/giphy.gif"
                    className={`w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full cursor-pointer ${styles.chatBoxImage}`}
                    onClick={handleClick}
                />
            )}
        </div>
    );
}

export default ChatBox;