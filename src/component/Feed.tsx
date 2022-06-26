import React, { useState, useEffect, useRef } from "react";
import data from "../data/data.json";

const getData = async (from: number, to: number) => {
  return data.slice(from, from + to);
};

interface Post {
  id: number;
  linkImageUser: string;
  content: string;
}

const Feed = () => {
  const [post, setPost] = useState<Post[]>([]);
  const botRef = useRef<HTMLDivElement>(null);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  useEffect(() => {
    console.log("run event");
    if (!botRef.current) {
      return;
    }
    const ab = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setLoadMore(true);
        }
      }
    });
    ab.observe(botRef.current);
    return () => ab.disconnect();
  }, [botRef.current]);

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await getData(post.length, 5);
      if (fetch.length > 0) {
        setPost([...post, ...fetch]);
      }
    };
    fetchData();
    setLoadMore(false);
  }, [loadMore]);

  return (
    <>
      <div>
        {post.map((item, index) => (
          <div className="post" key={index}>
            <img src={item.linkImageUser} alt="" />
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      <div ref={botRef} style={{ height: "40px" }}></div>
    </>
  );
};

export default Feed;
