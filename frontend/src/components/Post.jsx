import React from "react";
import "../styles/Post.css"
import {useState,useEffect} from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
const Post =({post,onAction,contentThreshold = 300} ) => {
    
    // const contentThreshold = 300;
    const shouldFade = post.desc.length > contentThreshold;
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const isTitleTooLong = post.title.length > 30;
    const truncatedTitle = isTitleTooLong ? post.title.substring(0,27) + "..." : post.title;
    const truncatedDescription = post.desc.length > contentThreshold ? `${post.desc.substring(0, contentThreshold)}...` : post.desc;
    const toggleDropdown = (e) => {
        e.stopPropagation();
        console.log('toggle')
        
        setIsDropdownOpen(prevState => !prevState);
        console.log('Dropdown state:', isDropdownOpen);
      };

    let applyButton = 'Collab'

    if (post.has_applied) {
        applyButton = 'Notified'
    }
    
    const categoryLabels = {
        tech: 'Technology',
        film: 'Film & Media'
    };

    const handleUsernameClick = (e) => {
        e.stopPropagation();
        navigate(`/profile/${post.owner}`);
      };

    const handleViewPost = () => {
        navigate(`/post/${post.id}`)
    }

    const handleEdit = (e) =>{
        e.stopPropagation();
        onAction(post,'edit')
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        onAction(post,'delete')
    }

    const handleClickOutside = (e) => {
        if (isDropdownOpen && !e.target.closest('.options-container')) {
            closeDropdown();
        }
    };
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);
  

 
    return (
        
        // <div className="post-box clickable-post"
        // onClick={handleViewPost}
        // >
        <Card
  sx={{ // Let the Grid item control the width
    maxWidth: { xs: '300px', md: '360px', lg: '400px', xl: '450px' },
    height: { xs: '200px', md: '240px', lg: '267px', xl: '300px' }, // Fixed height
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: '2px auto',
    borderRadius: '8px',
    boxShadow: 3,
    '&:hover': {
      boxShadow: 6,
    },
    cursor: 'pointer',
  }}
  onClick={handleViewPost}
>
            
            
            <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {post.owner_username[0].toUpperCase()}
          </Avatar>
        }
        action={
          post.is_owner && (
            <IconButton onClick={toggleDropdown}>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
            <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              overflow: 'hidden',
              whiteSpace: 'normal',
            }}
          >
            {post.title}
          </Typography>
        }
        
        subheader={
          <Box
            sx={{
              display: 'inline-block',
              padding: '2px 8px',
              marginTop: '2px',
              borderRadius: '12px',
              backgroundColor: '#e0f7fa',
              color: '#00796b',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >

{categoryLabels[post.category]}
          </Box>   
        }
      />

      {/* Divider */}
      <Divider sx={{ margin:0 }} />

      {/* Card Content */}
      <CardContent
        sx={{
          paddingTop: '0px',
          paddingBottom: '8px',
          marginTop: '0px',
          flexGrow: 0,
          alignItems: 'flex-start',
          overflow: 'hidden',
          
        }}
      ></CardContent>

       {/* Card Content */}
       <CardContent
  sx={{
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

  }}
>
        <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{
          fontSize: '16px',
          lineHeight: '1.4', // Slightly tighter line spacing
          margin: '0px', // Remove margin
          padding: '0px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          display: '-webkit-box',
          WebkitLineClamp: 3, // Limit to 3 lines
          WebkitBoxOrient: 'vertical',
        }}
        
        >
          {truncatedDescription}
        </Typography>
      </CardContent>

      {/* Card Footer */}
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            color="primary"
            onClick={handleUsernameClick}
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {post.owner_username}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {post.formatted_date}
        </Typography>
      </CardActions>
      <Menu
        anchorEl={anchorEl}
        open={isDropdownOpen}
        onClose={closeDropdown}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
}

export default Post