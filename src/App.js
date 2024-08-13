import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./routes/Main.js"; // 확장자를 추가합니다.
import Post from './routes/Post.js'
import NewPost from "./routes/NewPost.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/post/:type/:id" element={<Post />} />
                <Route path="/newpost/post" element={<NewPost />}/>
            </Routes>
        </Router>
    );
}

export default App;
