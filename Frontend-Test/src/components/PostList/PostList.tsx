import { POST } from "../../types/post.type";
import { PostCard } from "../PostCard/PostCard";
import "./PostList.scss";

interface PostsProps {
  posts: Array<POST>;
}
export const PostList: React.FC<PostsProps> = ({ posts }) => {
  return (
    <>
      <div className="post-list">
        {posts?.map((info) => (
          <div key={info.id} className="post-wrapper">
            <PostCard post={info} />
          </div>
        ))}
      </div>
    </>
  );
};
