import api from "../api";


//API methods for components






export const fetchPosts = async (page) => {
    try{
        const response = await api.get(`/api/posts/?page=${page}`);
        return response.data;
        }
    catch (error){
        console.error("Error fetching posts:", error);
        throw error;
    }  
}

export const deletePost = async (post) => {
    try{
        const response = await api.delete(`/api/posts/${post.id}/`);
        console.log("Post deleted successfully", response.data);
    } catch (error){
        error("Failed to delete post", error);
    }   
}

export const applyToPost = async (post) => {
    try{
        const response = await api.post(`/api/posts/${post.id}/apply/`);
        console.log("User successfully applied to post", response.data);
    } catch (error){
        error("Failed to apply to post", error);
    }
    
}

export const getSinglePost = async (post_id) => {
    try{
        const response = await api.get(`/api/posts/${post_id}/`);
        console.log(response.data)
        return response.data
    } catch (error){
        error("Failed to apply to post", error);
    }
    
}

export const editPost = async (post_id, title, desc) => {
    try{
        const response = await api.put(`/api/posts/${post_id}/`,{title,desc});
        console.log("Successfully edited post", response.data)
    } catch (error){
        error("Failed to edit post", error);
    }
    
}

export const createPost = async (title, desc) => {
    try{
        const response = await api.post(`/api/posts/`, {title,desc});
        console.log("Successfully created post", response.data)
    } catch (error){
        error("Failed to create post", error);
    }
    
}

export const fetchMessages = async (chat_id,page) => {
    try{
        const response = await api.get(`/api/chats/${chat_id}/messages/?page=${page}`);
        console.log(`Successfully fetched messages for chat with id: ${chat_id} `, response.data)
        return response.data
    } catch (error){
        error("Failed to create post", error);
    }  
}

export const createNewMessage = async(payload,chat_id) => {
    try{
        const response = await api.post(`/api/chats/${chat_id}/messages/`,payload);
        console.log(`Successfully created a new message in chat: ${chat_id} `, response.data)
        return response.data
    } catch (error){
        error("Failed to create new message", error);
    }  
}

export const fetchChats = async() => {
    try{
        const response = await api.get(`/api/chats/`);
        console.log(`Successfully fetched chats `, response.data)
        return response.data
    } catch (error){
        error("Failed to create new message", error);
    }  
}







