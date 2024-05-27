// src/components/Editor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Post = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    const handleSave = () => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = { title, content, date: new Date() };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        setTitle('');
        setContent('');
        alert('Post saved successfully!');
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <ReactQuill value={content} onChange={setContent}/>
            <button onClick={handleSave}>Save Post</button>

            <div>
                <h2>Posts</h2>
                {content.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    <div>
                        <h3>{title}</h3>
                        <p>{content}</p>
                        <p><small>{new Date().toLocaleString()}</small></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
