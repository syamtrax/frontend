import React, { useState } from "react";
import backgroundDaftar from "../assets/Background Halaman Daftar.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Daftar() {
  const [namaPengguna, setnamaPengguna] = useState("");
  const [sandi, setsandi] = useState("");
  const [confSandi, setKonfsandi] = useState("");
  const [telp, settelp] = useState("");
  const [namaToko, setnamaToko] = useState("");
  const [alamatToko, setalamatToko] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://ec2-35-153-232-122.compute-1.amazonaws.com:5000/user", {
        namaPengguna,
        sandi,
        telp,
        namaToko,
        alamatToko,
        confSandi,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 font-inter">
      <div>
        <img
          src={backgroundDaftar}
          className="object-cover h-screen w-screen"
        />
      </div>
      <div className="flex bg-abumuda h-screen">
        <div className="bg-white w-2/3 p-6 m-auto rounded-md shadow-md z-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl text-center">Daftar Toko</h1>
              <p className="text-sm text-center text-gray-800">
                {" "}
                Sudah memiliki Akun?{" "}
                <a className="font-semibold text-birumuda hover:underline">
                  <Link to="/">Masuk</Link>
                </a>
              </p>
              <p className="text-base text-red-500 text-center">{msg}</p>
            </div>
            <form onSubmit={saveUser} className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div>
                  <label
                    className="block text-base text-gray-800"
                    htmlFor="Nama Pengguna"
                  >
                    Nama Pengguna
                  </label>
                  <input
                    className="block border rounded-md w-full p-2 text-gray-900 bg-white focus:border-black"
                    type="text"
                    required
                    value={namaPengguna}
                    onChange={(e) => setnamaPengguna(e.target.value)}
                    placeholder="Masukkan Nama Pengguna"
                  />
                </div>
                <div>
                  <label
                    className="block text-base text-gray-800"
                    htmlFor="Kata Sandi"
                  >
                    Kata Sandi
                  </label>
                  <input
                    className="block border rounded-md w-full p-2 text-gray-900 bg-white focus:border-black"
                    type="password"
                    required
                    value={sandi}
                    onChange={(e) => setsandi(e.target.value)}
                    placeholder="Masukkan Kata Sandi"
                  />
                </div>
                <div>
                  <label
                    className="block text-base text-gray-800"
                    htmlFor="Kata Sandi"
                  >
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    className="block border rounded-md w-full p-2 text-gray-900 bg-white focus:border-black"
                    type="password"
                    required
                    value={confSandi}
                    onChange={(e) => setKonfsandi(e.target.value)}
                    placeholder="Masukkan Ulang Kata Sandi"
                  />
                  {/*isError && <p className="text-danger">{isError}</p>*/}
                </div>
                <div>
                  <label
                    className="block text-base text-gray-800"
                    htmlFor="Nama Toko"
                  >
                    Nama Toko
                  </label>
                  <input
                    className="block border rounded-md w-full p-2 text-gray-900 bg-white focus:border-black"
                    type="text"
                    required
                    value={namaToko}
                    onChange={(e) => setnamaToko(e.target.value)}
                    placeholder="Masukkan Nama Toko"
                  />
                </div>
                <div>
                  <label
                    className="block text-base text-gray-800"
                    htmlFor="Alamat Toko"
                  >
                    Alamat Toko
                  </label>
                  <input
                    className="block border rounded-md w-full p-2 text-gray-900 bg-white focus:border-black"
                    type="text"
                    required
                    value={alamatToko}
                    onChange={(e) => setalamatToko(e.target.value)}
                    placeholder="Masukkan Alamat Toko"
                  />
                </div>
                <div>
                  <label
                    className="block text-base text-gray-800"
                    htmlFor="Nomor Telepon"
                  >
                    No.Telepon
                  </label>
                  <input
                    className="block border rounded-md w-full p-2 text-gray-900 bg-white focus:border-black"
                    type="telp"
                    required
                    value={telp}
                    onChange={(e) => settelp(e.target.value)}
                    placeholder="Masukkan No.Telepon"
                  />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 border rounded"
                />
                <span className="ml-1">
                  Saya setuju dengan{" "}
                  <Link
                    to="#"
                    className="text-birumuda font-semibold hover:underline"
                  >
                    Syarat dan Ketentuan
                  </Link>
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="bg-birumuda text-white px-2 py-2 text-base font-semibold w-full radius rounded-full"
                >
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daftar;
