import React from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <article className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transition-transform hover:scale-105">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Post #{post.id} • User #{post.userId}
        </div>
        <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:text-indigo-600">
          {post.title}
        </h2>
        <p className="mt-2 text-left text-slate-500">{post.body}</p>
      </div>
    </article>
  );
};

export default PostCard;
