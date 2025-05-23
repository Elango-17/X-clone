import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { baseURL } from "../../constants/url";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {
  const getPostEndPoint = () => {
    switch (feedType) {
      case "forYou":
        return `${baseURL}/api/posts/all`;
      case "posts":
        return `${baseURL}/api/posts/user/${username}`;
      case "likes":
        return `${baseURL}/api/posts/likes/${userId}`;
      case "following":
        return `${baseURL}/api/posts/following`;
      default:
        return `${baseURL}/api/posts/all`;
    }
  };

  const POST_ENDPOINT = getPostEndPoint();

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch, username]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
