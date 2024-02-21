import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { register } from "../redux/userSlice";
import { toast } from "react-toastify";

function Register({signUp, setSignUp,clickHandler}) {

  const dispatch = useDispatch();
  const [authData,setAuthData] = useState({username : "",email:"",password:""})

  const onChangeHandler = (e) => {
    setAuthData({...authData,[e.target.name] : e.target.value})
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(authData));
      toast.success("Kayıt başarılı!"); // Başarılı kayıt durumunda başarılı mesajı göster
    } catch (error) {
      toast.error(error.response.data.msg); // Hata durumunda hata mesajını göster
    }
  };


  console.log("authData:",authData)

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mb-10">
        <form className="max-w-md mx-auto mb-10">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              e-posta
            </label>
            <input
              value = {authData.email} name="email" onChange={onChangeHandler}
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              username
            </label>
            <input
              value = {authData.username} name="username" onChange={onChangeHandler}
              type="text"
              id="username"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Şifre
            </label>
            <input
              value = {authData.password} name="password" onChange={onChangeHandler}
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <Link
                to="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </Link>
              <div className="flex items-start mb-5 text-red-500 font-bold">
                <span onClick={clickHandler} className="cursor-pointer">Zaten üye misin?</span>
              </div>
            </label>
          </div>
          <button
            onClick={registerHandler}
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
