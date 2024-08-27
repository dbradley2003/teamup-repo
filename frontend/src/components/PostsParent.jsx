import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { useNavigate } from 'react-router-dom';
import "../styles/Post.css"
import Pagination from "./Pagination"

import {fetchPosts, deletePost, applyToPost} from "./services"



//Handles getting, deleting, and editing posts + applying to a post

function PostParent(){
    const [posts,setPosts] = useState([]);
    const [pages,setPages] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [count,setCount] = useState(0)
    const navigate = useNavigate();

  
    useEffect(() => {
        getPosts();
    }, [currentPage]);

    async function getPosts (){
      try{
      const data = await fetchPosts(currentPage)
      console.log(data)
      setPosts(data.results);
      setPages(data.total_pages)
      setCount(data.count)
      } catch (error){
        console.error("Error fetching posts", error)
      }
    }
  
    async function handleAction(post, method) {
          if (method == 'delete'){
            await deletePost(post);
            getPosts();
          }
          else if (method == 'edit'){
            navigate(`/edit-post/${post.id}`);      
          }
        }
        
      const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
      }

      const handleCreatePost = () => {
        navigate('/apply')
      }
        
    return (
      <div className="post-page-container container">

        <div className ="d-flex justify-content-start mb-4">
          <button className="create-post-button" onClick={handleCreatePost}>
          Create Post
          </button>
        </div>
        <div className="posts-content">
        <div className="row">
            {posts.map(post => (
              <div className="col-md-4 mb-4" key={post.id}>
            <div className="card h-100">
                <Post key={post.id} post={post} onAction={handleAction} />
                </div>
                </div>
            ))}
        </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
        <Pagination 
                pages={pages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange}
                count = {count}
            />
            </div>
        </div>
    )
};
export default PostParent;



