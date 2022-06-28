import React, { useState, useEffect, useRef } from "react";
import data from "../data/data.json";
import { Post } from "./model";
import useInfinite from "./useInfinite";

const getData = async (from: number, to: number) => {
  return data.slice(from, from + to);
};

const Feed = () => {
  const [post, setPost] = useState<Post[]>([]);
  const postRef = useRef<HTMLDivElement>(null);

  const [load, setLoad] = useInfinite(postRef, post);

  // useEffect(() => {
  //   if (!postRef.current) {
  //     return;
  //   }
  //   if (loadMore) {
  //     return;
  //   }
  //   const ab = new IntersectionObserver((entries) => {
  //     for (const entry of entries) {
  //       if (entry.isIntersecting) {
  //         setLoadMore(true);
  //       }
  //     }
  //   });
  //   ab.observe(postRef.current);
  //   return () => ab.disconnect();
  // }, [post]);

  useEffect(() => {
    const fetchData = async () => {
      const fetch = await getData(post.length, 5);
      console.log(fetch);
      if (fetch.length > 0) {
        setPost([...post, ...fetch]);
      }
    };
    if (!load) {
      fetchData();
    }
    setLoad(false);
  }, [load]);

  return (
    <>
      <div>
        {post.map((item, index) => (
          <div key={index}>
            {item.id === post.length - 1 ? (
              <div
                ref={postRef}
                style={{ backgroundColor: "black", height: "20px" }}
              ></div>
            ) : (
              ""
            )}
            <div className="post">
              <img src={item.linkImageUser} alt="" />
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
