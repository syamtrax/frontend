import React from "react";
import pengaturan from "../assets/pengaturan.png";
import help from "../assets/help.png";
import notifikasi from "../assets/notifikasi.png";
import avatar from "../assets/avatardefault_92824.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete("https://sembapp.azurewebsites.net/logout", {
        headers: {
          authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      removeCookie("accessToken", { path: "/" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 right-0 left-0 z-50 w-full bg-white h-16 shadow-md">
      <div className="flex justify-between h-full mx-auto">
        <div className="flex">
          <div className="flex items-center text-2xl font-black w-40 text-center px-5 bg-birumuda text-white">
            <Link to="/dashboard">
              <button>SembApp</button>
            </Link>
          </div>
          <div className="flex text-base justify-start text-center items-center">
            <Link to="/dashboard">
              <div className="px-5 bg-white hover:font-bold">Beranda</div>
            </Link>
            <Link to="/produk">
              <div className="px-5 bg-white hover:font-bold">Produk</div>
            </Link>
            <Link to="/dokumen">
              <div className="px-5 bg-white hover:font-bold">Dokumen</div>
            </Link>
            <div className="px-5 bg-white hover:font-bold">Transaksi</div>
            <div className="px-5 bg-white hover:font-bold">Keuangan</div>
          </div>
        </div>
        <div className="flex text-base text-center items-center gap-4">
          <button className="py-7">
            <img src={notifikasi} />
          </button>
          <button className="py-7">
            <img src={help} />
          </button>
          <button className="py-7">
            <img src={pengaturan} />
          </button>
          <button>
            <div className="">
              <button className="mx-8 h-16 w-full justify-center content-center items-center peer bg-white text-black">
                <img className="h-10" src={avatar} />
              </button>
              <div className="hidden w-32 peer-hover:flex hover:flex flex-col bg-white drop-shadow-lg absolute justify-start">
                <button className="" onClick={Logout}>
                  <div className="hover:bg-gray-200 p-10 w-full text-center">
                    Logout
                  </div>
                </button>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
