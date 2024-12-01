import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { useNavigate } from 'react-router-dom';
import "../styles/Post.css"
import "../styles/header.css/"
// import Pagination from "../components/Pagination"
import {Grid} from '@mui/material'
import { Container, Pagination } from '@mui/material'
import {fetchPosts, deletePost} from "./services"
import SelectFilter from "../ui-components/Filter";
import Box from '@mui/material/Box';

//Handles getting, deleting, and editing posts + applying to a post

function PostParent(){
    const [posts,setPosts] = useState([]);
    const [totalPages,setTotalPages] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const navigate = useNavigate();
    const [filteredPosts, setFilteredPosts] = useState([]);
     
  
     useEffect( () => {
         getPosts();
    }, [currentPage]);

    async function getPosts (){
      try{
      const data = await fetchPosts(currentPage)
      console.log(data)
      setPosts(data.results);
      setFilteredPosts(data.results)
      setTotalPages(data.total_pages)
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
        
        const handlePageChange = (event, value) => {
          setCurrentPage(value);
        };

        const handleFilterChange = (filterValue) => {
          console.log(filterValue)
          // Example filtering logic
          if (filterValue === 20) {
            setFilteredPosts(posts.filter((post) => post.category === "tech"));
          } else if (filterValue === 30) {
            setFilteredPosts(posts.filter((post) => post.category === "film"));
          } else {
            setFilteredPosts(posts);
          }
        };

     
        
    return (
      <>
     
    

<Container maxWidth="xl" sx={{ paddingTop: '50px', margin: '0 auto' }}>
<Box  sx={{padding: '10px',display: "flex", alignItems: "center",justifyContent:'left', mb: 4 }}>
<SelectFilter onFilterChange={handleFilterChange}></SelectFilter>
</Box>


<Grid container spacing={5} justifyContent="flex-start" alignItems="flex-start">
  
          
            {filteredPosts.map(post => (
            <Grid item 
            key={post.id}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl= {4}
            >
            
                <Post key={post.id} post={post} onAction={handleAction} />
             
                </Grid>
                            
            ))}    
            </Grid>  
            {/* <Pagination 
                pages={pages} 
                currentPage={currentPage} 
                onPageChange={handlePageChange}
                count = {count}
           /> */}
          <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: '16px', display: 'flex', justifyContent: 'center', padding: 3 }}
        />


           </Container>
            </>
          
      
         
           
           
                                                 
    )
};
export default PostParent;



