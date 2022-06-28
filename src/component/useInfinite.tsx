import React, { RefObject, useEffect, useState } from "react";
import { Post } from "./model";

const useInfinite = (postRef: RefObject<HTMLDivElement>, post: Post[]) => {
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (!postRef.current) {
      return;
    }
    const ab = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setLoad(true);
        }
      }
    });
    ab.observe(postRef.current);
    return () => ab.disconnect();
  }, [post]);

  return [load, setLoad] as const;
};

export default useInfinite;
