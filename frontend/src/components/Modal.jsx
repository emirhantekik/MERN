import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { changeModal, changeGetPost, updateClose } from "../redux/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPost, updatePost } from "../redux/postSlice";
import { toast } from "react-toastify";

function Modal() {
  const update = useSelector((state) => state.modal.update);

  const id = useSelector(state => state.modal.id)

  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    user: "",
    title: "",
    description: "",
  });

  const changeModalHandler = () => {
    dispatch(changeModal());
    dispatch(updateClose());
  };

  const sharePostHandler = (e) => {
    e.preventDefault();
    try {
      if (!update) {
        dispatch(createPost(postData));
        dispatch(changeModal());
        dispatch(updateClose());
        toast.success("Post paylaşıldı.");
      } else {
        dispatch(updatePost({id,data: postData}));
        dispatch(changeModal());
        dispatch(updateClose());

        toast.success("Post güncellendi.");
      }
      dispatch(getPost());
      dispatch(changeGetPost());
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.6)" }}
      className="w-full h-screen fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
    >
      <div className="bg-white w-1/2 p-2 rounded-md">
        <div className="flex justify-between">
          <h1 className="font-bold mb-2 text-xl flex justify-center items-center">
            Post Paylaş
          </h1>
          <div
            onClick={changeModalHandler}
            style={{ width: "30px", height: "30px" }}
            className="justify-center items-center cursor-pointer "
          >
            <MdCancel className="h-full w-full text-indigo-700" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <input
            onChange={onChange}
            name="user"
            value={postData.username}
            className="w-1/2 mb-2 rounded-md "
            type="text"
            placeholder="User"
          />
          <input
            onChange={onChange}
            name="title"
            value={postData.title}
            className="w-1/2 mb-2 rounded-md"
            type="text"
            placeholder="Title"
          />
          <input
            onChange={onChange}
            name="description"
            value={postData.description}
            className="w-1/2 mb-2 rounded-md"
            type="text"
            placeholder="Description"
          />
          <div
            onClick={sharePostHandler}
            className="w-1/2 mb-2 rounded-md bg-indigo-600 mt-2 flex justify-center text-white text-xl p-2 cursor-pointer"
          >
            {update ? "Güncelle" : "Paylaş"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
