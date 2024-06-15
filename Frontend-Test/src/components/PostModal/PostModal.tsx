import { POST } from "../../types/post.type";
import "./PostModal.scss";

interface PostModalProps {
  post: POST;
  closeModal: () => void;
}
const PostModal: React.FC<PostModalProps> = ({ post, closeModal }) => {
  const { title, thumbnail, content, author, date } = post;
  const formatDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img
          className="modal-img"
          src={thumbnail?.large ?? thumbnail?.small}
          alt={title}
        />
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="author-info">
          {author?.avatar && (
            <img
              src={author.avatar}
              alt={author.name}
              className="author-avatar"
            />
          )}

          <div className="author-details">
            <p className="author-name">{author.name}&nbsp;&nbsp;</p>
            <p className="author-role">{author.role}</p>
          </div>
          <p className="date">{formatDate(date)}</p>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
