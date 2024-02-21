import React from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/postSlice";
import { changeGetPost, changeModal, getPostId, updateChangeOpen, updateOpen } from "../redux/modelSlice";
import { toast } from "react-toastify";

function Card({ post }) {
  const dispatch = useDispatch();

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
    dispatch(changeGetPost());
    toast.success("Post silindi.");
  }

  const updatePostHandler = (id) => {
    dispatch(changeModal());
    dispatch(updateOpen());
    dispatch(updateChangeOpen());
    dispatch(getPostId(id));
  }

  return (
    <div>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post?.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post?.description}
        </p>
        <Link
          to="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {post?.user}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <Link to="#">
          <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            {new Date(post?.date).toLocaleDateString("tr-TR")}
          </h5>
        </Link>
        <div className="flex justify-between items-center text-indigo-700">
          <button>
            <GrUpdate onClick={()=> updatePostHandler(post?._id)} size={20} />
          </button>
          <button onClick={()=> deletePostHandler(post?._id)}>
            <AiFillDelete size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
