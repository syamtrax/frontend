import { useState, useRef } from "react";
import axios from "axios";
import loginBackground from "../assets/backgroundLogin.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const Authentication = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-35-153-232-122.compute-1.amazonaws.com:5000/login",
        {
          user,
          pwd,
        }
      );
      console.log(response.data.accessToken);
      const accessToken = response.data.accessToken;
      setCookie("accessToken", accessToken, {
        path: "/",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setErrMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      {success ? (
        {
          /*<div>
          <h1>Berhasil!</h1>
          <p>Anda berhasil login!</p>
          <a href="#">Masuk ke Halaman Utama</a>
          </div>*/
        }
      ) : (
        <div className="relative w-full h-screen flex items-center bg-cover font-inter">
          <img
            src={loginBackground}
            className="absolute w-full h-full object-cover"
          />
          <div className="bg-white w-1/4 p-6 m-auto rounded-md shadow-md z-10">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold text-center">SembApp</h1>
              <form onSubmit={Authentication} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div>
                    <label
                      for="uname"
                      className="block text-base text-gray-800"
                    >
                      Nama Pengguna
                    </label>
                    <p
                      ref={errRef}
                      className={
                        errMsg
                          ? "block text-sm font-medium text-red-600"
                          : "offscreen"
                      }
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <input
                      type="text"
                      className="block border rounded-md w-full p-2 text-gray-900 bg-white focus:border-black"
                      ref={userRef}
                      autoComplete="off"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      required
                      placeholder="Nama Pengguna"
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block text-base text-gray-800"
                    >
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      className="block border rounded-md w-full p-2 text-gray-900 bg-white focus:border-black"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      required
                      placeholder="Kata Sandi"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 border rounded" />
                    <label
                      for="remember"
                      className="ml-1 text-sm font-medium text-gray-800"
                    >
                      Ingat Saya
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Link
                      to="#"
                      className="text-sm font-semibold text-birumuda hover:underline"
                    >
                      Lupa Kata Sandi?
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="bg-birumuda text-white px-2 py-2 text-base font-semibold w-full radius rounded-full">
                    Masuk
                  </button>
                </div>
              </form>
              <p className="text-sm text-center text-gray-800">
                {" "}
                Belum memiliki toko?{" "}
                <Link
                  to="/daftar"
                  className="font-semibold text-birumuda hover:underline"
                >
                  Daftarkan toko
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
