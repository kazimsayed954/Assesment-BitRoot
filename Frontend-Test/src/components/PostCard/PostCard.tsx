import React, { useState } from "react";
import { POST } from "../../types/post.type";
import "./PostCard.scss";
import PostModal from "../PostModal/PostModal";
import { formatDate } from "../../utils/formatDate";

interface PostCardProps {
  post: POST;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = ()=>setIsModalOpen(!isModalOpen);

  const { title, content, thumbnail, date, author } = post;
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
        <div className="author-info">
          <div className="author-details">
            <p className="author-name">{author.name}&nbsp;&nbsp;</p>
            <p className="author-role">{author.role}</p>
          </div>
          <p className="date">{formatDate(date)}</p>
        </div>
      </div>
      {isModalOpen && <PostModal post={post} closeModal={toggleModal} />}
    </>
  );
};
