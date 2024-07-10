
import { useState, useEffect } from "react";
import api from "../api";
import Post from "./Post";

function PostParent(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api
            .get("/api/posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const jobApply = (postId) => {
        api
        .post(`/api/apply/${postId}/`)
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            {posts.map(post => (
                <Post key={post.id} post={post} onApply= {jobApply} />
            ))};
        </div>
    )
};
export default PostParent;



