import api from "../api";


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

