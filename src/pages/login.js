import { useState, useRef } from "react";
import axios from "axios";
import loginBackground from "../assets/backgroundLogin.jpg";
import { Link, useNavigate } from "react-router-dom";
import useCookies from "react-use-cookie";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [cookies, setCookie] = useCookies(["auth"]);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  //const [checkedUsername, setCheckedUsername] = useState("");
  //const [checkedPassword, setCheckedPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  /*useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser('');
    setPwd('');
    setSuccess(true);
  }

  const validateUsername = async (username) =>{
    try {
      const res = await axios.get(`http://localhost:5000/user/${username}`);
      console.log(res);
      if(res.data.length === 0){
        setErrMsg('Username not found');
        errRef.current.focus();
      }
    } catch (error) {
      console.log(error);
    }

  const validatePassword = (password) => {
    if(password.length < 8){
      setErrMsg('Password is incorrect');
      errRef.current.focus();
    }
  }
  }*/

  const Authentication = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sembapp.azurewebsites.net/login",
        {
          user,
          pwd,
        }
      );
      console.log(JSON.stringify(response.data));
      const accessToken = response.data.payload.accessToken;
      setCookie("refreshToken", { accessToken });

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
          <div className="w-1/4 p-6 m-auto bg-white rounded-md shadow-md z-10">
            <h1 className="text-4xl font-bold text-center">SembApp</h1>
            <form onSubmit={Authentication} className="mt-6">
              <div className="mb-2">
                <div className="flex justify-between">
                  <label
                    for="uname"
                    className="block text-sm font-medium text-gray-800"
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
                </div>
                <input
                  type="text"
                  className="block w-full px-4 py-3 mt-2 text-black bg-white border rounded-md focus:border-black"
                  ref={userRef}
                  autoComplete="off"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  placeholder="Nama Pengguna"
                />
              </div>
              <div className="mb-2">
                <label
                  for="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Kata Sandi
                </label>
                <input
                  type="password"
                  className="block w-full px-4 py-3 mt-2 text-black bg-white border rounded-md focus:border-black"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  placeholder="Kata Sandi"
                />
              </div>
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-black border rounded focus:border-black"
                  />
                  <label
                    for="remember"
                    className="ml-2 text-sm font-medium text-gray-800"
                  >
                    Ingat Saya
                  </label>
                </div>
                <div className="flex items-center">
                  <Link
                    to="#"
                    className="ml-2 text-sm font-medium text-birumuda"
                  >
                    Lupa Kata Sandi?
                  </Link>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-birumuda rounded-md hover:bg-sky-400">
                  Masuk
                </button>
              </div>
            </form>
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Belum memiliki toko?{" "}
              <Link
                to="/daftar"
                className="font-medium text-birumuda hover:underline"
              >
                Daftarkan toko
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
