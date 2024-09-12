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
      <div className="post-page container-fluid">

         
            {/* <div className="button-container text-center">
          <button className="create-post-button" onClick={handleCreatePost}>
          Create a Post!
          </button>
          
          </div> */}
        
        
        
          
        
       
        <div className="all-posts-container container-fluid">
            {posts.map(post => (
              <div className="" key={post.id}>
                 <div className="post-container">
                <Post key={post.id} post={post} onAction={handleAction} />
                </div>
                </div>
              
                
            ))}
            </div>
           
        
        <div className="pag-container">
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



