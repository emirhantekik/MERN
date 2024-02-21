import React, { useState } from "react";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { changeLogout } from "../redux/modelSlice";

function Login({ signUp, setSignUp, clickHandler}) {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const loginClickHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login(authData));
      // Giriş başarılı olduğunda gelen yanıtın içeriğini kontrol edin
      if (response.payload.status === "OK") {
        toast.success("Giriş başarılı!");
        // Giriş başarılı olduğunda logout işlemini gerçekleştirin
        dispatch(changeLogout());
        localStorage.getItem("/auth");
        navigate("/");
      } else {
        // Giriş başarısız olduğunda sunucudan gelen hatayı gösterin
        toast.error(response.payload.msg);
      }
    } catch (error) {
      // Giriş sırasında bir hata olursa, genel hata mesajını gösterin
      toast.error("Giriş sırasında bir hata oluştu.");
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mb-10 ">
        <form className="max-w-md mx-auto mb-10">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              e-posta
            </label>
            <input
              name="email"
              value={authData.email}
              onChange={onChangeHandler}
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Şifre
            </label>
            <input
              name="password"
              value={authData.password}
              onChange={onChangeHandler}
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder="Şifre"
            />
          </div>
          <div className="flex items-start mb-5 text-red-500 font-bold">
            <span
              onClick={clickHandler}
              className="flex items-center h-5 text-md cursor-pointer hover:text-red-800"
            >
              <p className="text-red">Şifreni mi unuttun?</p>
            </span>
          </div>
          <button
            onClick={loginClickHandler}
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Giriş yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
