import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/postSlice";
import Card from "../components/Card";
import { changeGetPost } from "../redux/modelSlice";

function Home() {
  const [getPosts, setGetPosts] = useState([]);
  const dispatch = useDispatch();
  const changeGetPosttt = useSelector(state => state.modal);

  useEffect(() => {
    dispatch(getPost())
      .then((action) => {
        // API isteği tamamlandığında posts durumunu güncelle
        setGetPosts(action.payload);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (changeGetPosttt.getPost) {
      // getPost durumunu değiştir
      dispatch(getPost())
        .then((action) => {
          // API isteği tamamlandığında posts durumunu güncelle
          setGetPosts(action.payload);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
      // Modal durumunu değiştir
      dispatch(changeGetPost());
    }
  }, [dispatch, changeGetPosttt.getPost]);

  return (
    <div className="flex flex-wrap">
      {getPosts.map((post) => (
        <div key={post._id}>
          <Card post = {post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
