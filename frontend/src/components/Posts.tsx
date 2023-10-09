interface PostProps {
  imageUrl: string;
}

export function Post({ imageUrl }: PostProps) {
  return (
    <div className="post">
      <img src={imageUrl} />
    </div>
  );
}

export default Post;
