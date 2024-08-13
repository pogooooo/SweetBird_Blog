import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import {styled} from "styled-components";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

const gradient_text = 'linear-gradient(0deg, #ff97ee, #4bbdff)';
const gradient_border = 'linear-gradient(90deg, #ff97ee, #4bbdff)';

const NewPostDiv = styled.div`
    display: flex;
    justify-content: center;
    
`

const PostDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > div {
        width: 50vw;
    }
`

const InputPostTitle = styled.input`
    width: 30vw;
    margin-top: 5vh;
    font-size: 1.4rem;
    outline: none;
    border: none;
    background: black;
    color: white;
    font-weight: bold;
`

const Horizon = styled.hr`
    width: 30vw;
    border: none;
    height: 2px;
    background-image: linear-gradient(90deg, #ff97ee, #4bbdff);
    margin-bottom: 5px;
`

const SubmitDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`

const SubmitButton = styled.button`
    font-size: 1rem;
    border: 2px solid white;
    background-color: black;
    color: white;
    width: 80px;
    height: 25px;
    margin-top: 3vh;
    margin-left: 1vw;

    &:hover {
        background: -webkit-${gradient_text};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    &:active {
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: ${gradient_border};
    }
`

const WriterInput = styled.input`
    margin-top: 4vh;
    margin-left: 2px;
    border: none;
    border-bottom: 2px solid white;
    background-color: black;
    color: white;
    outline: none;
    font-size: 1rem;
`

const InformationInput = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`

const Writer = styled.div`
    margin-top: 5%;
    font-size: 1rem;
    font-weight: bold;
`

const DropdownContainer = styled.div`
    position: relative; /* 부모 요소에 대해 위치를 상대적으로 설정 */
    display: inline-block; /* 드롭다운이 원하는 요소와 함께 배치되도록 함 */
    margin-right: 15px;
    margin-top: 4%;
`;

// 드롭다운 버튼
const DropdownButton = styled.button`
    background: black;
    border: 2px solid white;
    color: white;
    padding: 5px 10px 5px 10px;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
`;

// 드롭다운 메뉴
const DropdownMenu = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; /* 드롭다운 열림 상태 */
    position: absolute; /* 다른 요소에 영향을 주지 않도록 절대 위치 */
    top: 100%; /* 버튼 바로 아래에 위치하도록 설정 */
    left: 0; /* 버튼의 왼쪽에 맞춤 */
    width: 100%;
    font-size: 0.8rem;
    background: black;
    z-index: 1; /* 메뉴가 다른 요소들 위에 표시되도록 함 */
`;

// 드롭다운 메뉴 항목
const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid white;
    text-align: center;
    &:hover {
        background: -webkit-${gradient_text};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;


const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // 배경을 어둡게 처리
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; // 모달이 다른 요소 위에 표시되도록 설정
`;

const ModalContent = styled.div`
    background-color: black;
    padding: 30px;
    width: 300px;
    border-radius: 2px;
    text-align: center;
    border: 2px solid;
    border-image-slice: 1;
    border-image-source: ${gradient_border};

    & > div {
        margin-bottom: 20px;
        font-size: 1.2rem;
        color: white;
    }

    & > button {
        padding: 7px 15px;
        background-color: black;
        border: 1px solid white;
        border-radius: 2px;
        color: white;
        font-size: 1rem;
        cursor: pointer;

        &:hover {
            background: -webkit-${gradient_text};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        &:active {
            border: 1px solid;
            border-image-slice: 1;
            border-image-source: ${gradient_border};
        }
    }
`;

const PasswordInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 2px solid white;
    background-color: black;
    color: white;
    width: 160px;
    height: 3vh;
    margin-top: 3.5vh;
    outline: none;
`

const PasswordTitle = styled.div`
    font-size: 1rem;
    color: white;
    height: 3vh;
    margin-top: 4vh;
    font-weight: bold;
`

const NewPost = () => {
    const editorRef = useRef(null)
    const [selectedType, setSelectedType] = useState('front')
    const [writer, setWriter] = useState('')
    const [title, setTitle] = useState("")
    const [password, setPassword] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false)
    const [frontMaxId, setFrontMaxId] = useState(0)
    const [backMaxId, setBackMaxId] = useState(0)
    const newPost = {
        background: true, // 예시 값, 실제 값으로 대체
        userImg: "https://example.com/image.jpg", // 예시 이미지 URL
        name: "", // 예시 유저 이름
        date: new Date().toISOString().split('T')[0], // 현재 날짜, 형식 yyyy-MM-dd
        title: "", // 예시 게시물 제목
        type: "front", // 설정한 타입 값
        PostContent: "", // 예시 게시물 내용
        Password: "" // 예시 비밀번호
    };

    function capitalizeFirstLetter(string) {
        if (!string) return ''; // 빈 문자열이나 undefined/null 처리
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const toggleDropdown = () => {
        setIsTypeSelectOpen(!isTypeSelectOpen);
    };

    const handleSelect = (value) => {
        setSelectedType(value); // 선택된 값을 상태에 저장
        setIsTypeSelectOpen(false); // 드롭다운 메뉴 닫기
    };

    const getMaxFrontId = () => {
        axios.get('/posts/listmax/front')
            .then(response => {
                const data = response.data;
                setFrontMaxId(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const getMaxBackId = () => {
        axios.get('/posts/listmax/back')
            .then(response => {
                const data = response.data;
                setBackMaxId(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const closeModal = () => {
        setIsModalOpen(false); // 모달 창 닫기
    };

    const SubmitPost = () => {
        const markDownContent = editorRef.current.getInstance().getMarkdown()

        if( writer !== "" &&
            title !== "" &&
            markDownContent !== ""
        ){
            newPost.name = writer
            newPost.title = title
            newPost.type = selectedType
            newPost.PostContent = markDownContent
            newPost.Password = password
        }

        if (selectedType === "front") {
            getMaxFrontId()
        }
        else {
            getMaxBackId()
        }

        console.log(newPost)
        axios.post('/posts/create', newPost, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log('Success:', response.data); // 성공적으로 전송된 데이터 처리
            })
            .catch(error => {
                if (error.response) {
                    // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
                    console.error(`HTTP error! status: ${error.response.status}, body: ${error.response.data}`);
                } else if (error.request) {
                    // 요청이 이루어졌으나 응답을 받지 못한 경우
                    console.error('No response received:', error.request);
                } else {
                    // 요청을 설정하는 중에 오류가 발생한 경우
                    console.error('Error:', error.message);
                }
            });

        setIsModalOpen(true)
    }

    const afterSubmit = () => {
        setIsModalOpen(false);
        if(selectedType === 'front'){
            window.location.href = `http://localhost:3000/${selectedType}/${frontMaxId+1}`
        }
        else{
            window.location.href = `http://localhost:3000/${selectedType}/${backMaxId+1}`
        }

    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value); // 제목이 변경될 때마다 상태 업데이트
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleWriterChange = (event) => {
        setWriter(event.target.value); // 작성자가 변경될 때마다 상태 업데이트
    };

    return(
        <NewPostDiv>
            <PostDiv>
                <InputPostTitle placeholder={'TITLE'} value={title} onChange={handleTitleChange}></InputPostTitle>
                <Horizon></Horizon>
                <InformationInput>
                    <DropdownContainer>
                        <DropdownButton onClick={toggleDropdown}>
                            {capitalizeFirstLetter(selectedType)} ▼
                        </DropdownButton>
                        <DropdownMenu isOpen={isTypeSelectOpen}>
                            <DropdownItem onClick={() => handleSelect('Front')}>Front</DropdownItem>
                            <DropdownItem onClick={() => handleSelect('Back')}>Back</DropdownItem>
                        </DropdownMenu>
                    </DropdownContainer>
                    <Writer>Writer.</Writer>
                    <WriterInput value={writer} onChange={handleWriterChange}></WriterInput>
                </InformationInput>
                <Editor
                    classname='post_editor'
                    theme='dark'
                    ref={editorRef}
                    initialValue={' '}
                    initialEditType="wysiwyg"
                    height="60vh"
                    plugins={[colorSyntax]}
                />
                <SubmitDiv>
                    <PasswordTitle>Password.</PasswordTitle>
                    <PasswordInput value={password} onChange={handlePasswordChange}></PasswordInput>
                    <SubmitButton onClick={SubmitPost}>Submit</SubmitButton>
                </SubmitDiv>
            </PostDiv>

            {isModalOpen && (
                <ModalOverlay>
                    {writer === "" ? (
                        <ModalContent>
                            <div>Writer field cannot be empty</div>
                            <button onClick={closeModal}>Close</button>
                        </ModalContent>
                    ) : title === "" ? (
                        <ModalContent>
                            <div>Title field cannot be empty</div>
                            <button onClick={closeModal}>Close</button>
                        </ModalContent>
                    ) : editorRef.current.getInstance().getMarkdown() === "" ? ( //content is empty
                        <ModalContent>
                            <div>Post Content field cannot be empty</div>
                            <button onClick={closeModal}>Close</button>
                        </ModalContent>
                    ) : password === "" ? (
                        <ModalContent>
                            <div>Password field cannot be empty</div>
                            <button onClick={closeModal}>Close</button>
                        </ModalContent>
                    ) : (
                        <ModalContent>
                            <div>Post successfully saved</div>
                            <button onClick={afterSubmit}>Close</button>
                        </ModalContent>
                    )}
                </ModalOverlay>
            )}
        </NewPostDiv>
    )
}

export default NewPost