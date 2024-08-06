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

    & > input {
        width: 30vw;
        margin-top: 5vh;
        font-size: 1.4rem;
        outline: none;
        border: none;
        background: black;
        color: white;
        font-weight: bold;
    }
`

const InputPostTitle = styled.input`
`

const Horizon = styled.hr`
    width: 30vw;
    border: none;
    height: 2px;
    background-image: linear-gradient(90deg, #ff97ee, #4bbdff);
    margin-bottom: 5vh;
`

const SubmitButton = styled.button`
    font-size: 1rem;
    border: 2px solid white;
    background-color: black;
    color: white;
    width: 4vw;
    height: 3vh;
    margin-top: 5vh;
    margin-left: 45vw;

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

const NewPost = () => {
    return(
        <NewPostDiv>
            <PostDiv>
                <InputPostTitle placeholder={'TITLE'}></InputPostTitle>
                <Horizon></Horizon>
                <Editor
                    classname='post_editor'
                    theme='dark'
                    initialEditType="wysiwyg"
                    height="60vh"
                    plugins={[colorSyntax]}
                />
                <SubmitButton>Submit</SubmitButton>
            </PostDiv>

        </NewPostDiv>
    )
}

export default NewPost