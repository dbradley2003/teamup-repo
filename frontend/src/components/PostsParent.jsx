import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Post from "./Post";
import { ACCESS_TOKEN} from "../constants";
import { useNavigate } from 'react-router-dom';
import "../styles/Post.css"
import Pagination from "./Pagination"

import {fetchPosts} from "./services"




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
   
    const handleAction = async (post, method) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);


          if (method == 'apply'){
            try{
              const response = await api.post(`/api/posts/${post.id}/apply/`, {});
              console.log('Application created successfully:', response.data);
              alert('Application submitted successfully!');
              getPosts();
            } catch(error){
              console.error('Error during application:', error);
            }
          }
          if (method == 'delete'){
            try{
            await api.delete(`/api/posts/${post.id}/`);
            console.log('Post successfully deleted');
            getPosts();
          } catch(error){
            console.error('Error deleting post:', error);
          }
        }
          if (method == 'edit'){
            console.log('edited')
            navigate(`/edit-post/${post.id}`);
            
          }
        }
        
      const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
      }
      
    
    return (
      <div className="post-page-container">
        <div className="post-container">
            {posts.map(post => (
                <Post key={post.id} post={post} onAction={handleAction} />
            ))}
        </div>
        <Pagination 
                pages={pages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange}
                count = {count}
            />
        </div>
    )
};
export default PostParent;



