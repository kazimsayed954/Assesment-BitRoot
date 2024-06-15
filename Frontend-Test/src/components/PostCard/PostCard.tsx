import React, { useState } from "react";
import { POST } from "../../types/post.type";
import "./PostCard.scss";
import PostModal from "../PostModal/PostModal";

interface PostCardProps {
  post: POST;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = ()=>setIsModalOpen(!isModalOpen);

  const { title, content, thumbnail } = post;
  return (
    <>
      <div className="post-card">
        <div className="image-container">
          <img src={thumbnail?.small ?? thumbnail?.large} alt={title} />
          <div className="overlay">
            <div onClick={toggleModal} className="overlay-text">
              {"Learn More"}
            </div>
          </div>
        </div>
        <h3 onClick={toggleModal}>{title}</h3>
        <p>{content?.substring(0, 100)}...</p>
      </div>
      {isModalOpen && <PostModal post={post} closeModal={toggleModal} />}
    </>
  );
};
