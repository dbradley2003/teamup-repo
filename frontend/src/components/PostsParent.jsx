import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { useNavigate } from 'react-router-dom';
import "../styles/Post.css"
import "../styles/header.css/"
import Pagination from "./Pagination"

import {fetchPosts, deletePost} from "./services"



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

     
        
    return (
      
      <div className="post-page-container">
               
        <div className="all-posts-container ">
          
            {posts.map(post => (
              <div className="post-item" key={post.id}>
                 
                <Post key={post.id} post={post} onAction={handleAction} />
             
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



