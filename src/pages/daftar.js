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
      await axios.post("https://sembappcoba.azurewebsites.net/user", {
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
    <div className="grid grid-cols-2">
      <div>
        <img src={backgroundDaftar} className="h-screen w-screen"></img>
      </div>
      <div className="bg-abumuda h-screen">
        <div className="relative bg-white w-2/3 p-6 m-auto my-10 rounded-2xl drop-shadow-2xl">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl mt-1 text-center">Daftar Toko</h1>
            <p className="text-sm text-center text-gray-800 mb-6">
              {" "}
              Sudah memiliki Akun?{" "}
              <a className="font-semibold text-birumuda hover:underline">
                <Link to="/">Masuk</Link>
              </a>
            </p>
            <p className="text-base text-red-500 text-center">{msg}</p>
            <form onSubmit={saveUser}>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <label
                      className="text-base text-gray-800"
                      htmlFor="Nama Pengguna"
                    >
                      Nama Pengguna
                    </label>
                  </div>
                  <input
                    className="border rounded-lg w-full p-2 text-gray-900 bg-white focus:border-black"
                    type="text"
                    required
                    value={namaPengguna}
                    onChange={(e) => setnamaPengguna(e.target.value)}
                    placeholder="Masukkan Nama Pengguna"
                  />
                </div>
                <div>
                  <div className="flex flex-col">
                    <label className="text-base" htmlFor="Kata Sandi">
                      Kata Sandi
                    </label>
                    <div className=" flex flex-col">
                      <input
                        className="border rounded-lg w-full p-2 text-gray-900 bg-white focus:border-black"
                        type="password"
                        required
                        value={sandi}
                        onChange={(e) => setsandi(e.target.value)}
                        placeholder="Masukkan Kata Sandi"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base" htmlFor="Kata Sandi">
                      Konfirmasi Kata Sandi
                    </label>
                    <div className=" flex flex-col">
                      <input
                        className="border rounded-lg w-full p-2 text-gray-900 bg-white focus:border-black"
                        type="password"
                        required
                        value={confSandi}
                        onChange={(e) => setKonfsandi(e.target.value)}
                        placeholder="Masukkan Ulang Kata Sandi"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base" htmlFor="Nama Toko">
                      Nama Toko
                    </label>
                    <input
                      className="border rounded-lg w-full p-2 text-gray-900 bg-white focus:border-black"
                      type="text"
                      required
                      value={namaToko}
                      onChange={(e) => setnamaToko(e.target.value)}
                      placeholder="Masukkan Nama Toko"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base" htmlFor="Alamat Toko">
                      Alamat Toko
                    </label>
                    <input
                      className="border rounded-lg w-full p-2 text-gray-900 bg-white focus:border-black"
                      type="text"
                      required
                      value={alamatToko}
                      onChange={(e) => setalamatToko(e.target.value)}
                      placeholder="Masukkan Alamat Toko"
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label className="text-base" htmlFor="Nomor Telepon">
                      No.Telepon
                    </label>
                    <input
                      className="border rounded-lg w-full p-2 text-gray-900 bg-white focus:border-black"
                      type="telp"
                      required
                      value={telp}
                      onChange={(e) => settelp(e.target.value)}
                      placeholder="Masukkan No.Telepon"
                    />
                  </div>
                  <div className="flex items-center text-sm mt-1 mb-6">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 border rounded focus:accent-birumuda"
                    />
                    <span className="ml-1">
                      Saya setuju dengan{" "}
                      <a className="text-birumuda font-medium">
                        Syarat dan Ketentuan
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center flex-col">
                    <button
                      type="submit"
                      className="bg-birumuda text-white py-3 mb-1 text-base font-bold w-full radius rounded-full"
                    >
                      Daftar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daftar;
