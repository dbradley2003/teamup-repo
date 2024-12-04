import React from "react";
import { useState, useEffect } from "react";
import {applyToPost} from "../components/services"
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const FullScreenDialog = ({ open, onClose, post }) => {

  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenMessageModal = () => setMessageModalOpen(true);
  const handleCloseMessageModal = () => setMessageModalOpen(false);
  
  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear message input
    applyToPost(post.id,message);
    setMessageModalOpen(false); // Close the modal
  };



  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar position="relative" sx={{ backgroundColor: "primary.main" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
              Post Details
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: 4 }}>
          {/* Title Section */}
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            {post.title}
          </Typography>

          {/* Metadata */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            By <strong>{post.owner_username}</strong> on {new Date(post.formatted_date).toLocaleDateString()}
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.6 }}>
            {post.desc}
          </Typography>

          {/* Message Button */}
          {!post.is_owner && (
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" onClick={handleOpenMessageModal}>
                Message Creator
              </Button>
            </Box>
          )}
        </Box>
      </Dialog>

      {/* Message Modal */}
      {!post.is_owner && (
        <Modal
          open={messageModalOpen}
          onClose={handleCloseMessageModal}
          aria-labelledby="message-modal-title"
          aria-describedby="message-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="message-modal-title" variant="h6" component="h2" mb={2}>
              Send Creator a Message
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={handleCloseMessageModal} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSendMessage} variant="contained" color="primary">
                Send Message
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default FullScreenDialog;
