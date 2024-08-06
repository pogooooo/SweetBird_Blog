import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {styled} from "styled-components";

// ./post/id
function Post() {
    const { id } = useParams(); //post id
    const [post, setPost] = useState(null); //post data
    const [loading, setLoading] = useState(true); //isloading?
    const [error, setError] = useState(null); //iserror?

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`\`/posts/all/${id}`);
                if (response.data.length === 0) {
                    throw new Error('No data found');
                }
                setPost(response.data[0]);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]); //get post data

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    const Post = styled.div`
        display: flex;
        align-items: center;
        flex-direction: column;
    `

    const Header = styled.div`
        display: flex;
        justify-content: flex-start;
        width: 30vw;
        margin-top: 10vh;
    `

    const PostTitle = styled.div`
        font-size: 1.4rem;
    `

    const PostType = styled.div`
        font-size: 0.8rem;
        margin-left: 1vw;
        background: linear-gradient(90deg, #ff97ee, #4bbdff);
        -webkit-background-clip: text;
        color: #0000;
    `

    const PostInfo = styled.div`
        width: 30vw;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 0.8rem;
        margin-top: 2.5vh;
        
        & > div {
            margin-left: 2vw;
        }
    `

    const PostContent = styled.div`
        margin-top: 5vh;
        margin-bottom: 5vh;
        display: flex;
        justify-content: flex-start;
        width: 30vw;
    `

    const Horizon = styled.hr`
        width: 30vw;
        border: none;
        height: 2px;
        background-image: linear-gradient(90deg, #ff97ee, #4bbdff);
    `

    const PostDisplay = styled.div`
        //display: flex;
    `

    const Comment = styled.div`
        font-size: 0.8rem;
        margin-top: 2vh;
        width: 30vw;
        
        & > div {
            margin-top: 2vh;
        }
        
        & > div > textarea {
            background: black;
            outline: none;
            color: white;
            border: none;
            border-bottom: 2px solid white;
            overflow: auto;
            text-align: left;
            vertical-align: top;
            resize: none;
            
            padding: 0;
            width: 26vw;
            height: 5vh;
        }
        
        & > div > textarea::-webkit-scrollbar {
            width: 3px;
        }

        & > div > textarea::-webkit-scrollbar-thumb {
            background: linear-gradient(0deg, #ff97ee, #4bbdff);
        }
        
        & > div > button {
            border: 2px solid white;
            margin-top: 2px;
            background: black;
            width: 4vw;
            height: 5vh;

            background: linear-gradient(90deg, #ff97ee, #4bbdff);
            -webkit-background-clip: text;
            color: #0000;
        }
    `

    return (
        <PostDisplay>
            <Post>
                <Header>
                    <PostTitle>{post.title}</PostTitle>
                    <PostType>{post.type}</PostType>
                </Header>
                <PostInfo>
                    <div>writer. {post.name}</div>
                    <div>Date. {post.date}</div>
                </PostInfo>
                <Horizon/>
                <PostContent>{post.PostContent}</PostContent>
                <Horizon/>
                <Comment>
                    COMMENT
                    <div>
                        <textarea/>
                        <button>SUBMIT</button>
                    </div>
                </Comment>
            </Post>
        </PostDisplay>
    );
}

export default Post;