import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { HiArrowLeft } from "react-icons/hi";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function TambahProduk() {
  const [kodeProduk, setkodeProduk] = useState("");
  const [namaProduk, setnamaProduk] = useState("");
  const [kategoriProduk, setkategoriProduk] = useState("");
  const [cookies] = useCookies(["accessToken"]);
  const [hargaBeli, sethargaBeli] = useState(0);
  const [hargaJual, sethargaJual] = useState(0);
  const [stokProduk, setstokProduk] = useState(0);
  const [satuanProduk, setsatuanProduk] = useState("");
  const [tanggalKedaluwarsa, settanggalKedaluwarsa] = useState("");
  const [msg, setMsg] = useState("");
  const [namaPengguna, setNama] = useState("");
  const navigate = useNavigate();

  const decode = async () => {
    try {
      const decoded = jwt_decode(cookies.accessToken);
      setNama(decoded.namaPengguna);
    } catch (error) {
      if (!cookies.accessToken) {
        navigate("/");
      }
    }
  };

  const saveProduk = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://ec2-34-194-13-113.compute-1.amazonaws.com:5000/produk",
        {
          kodeProduk,
          namaProduk,
          kategoriProduk,
          hargaBeli,
          hargaJual,
          stokProduk,
          satuanProduk,
          tanggalKedaluwarsa,
          namaPengguna,
        }
      );
      navigate("/produk");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.setMsg);
      }
    }
  };

  useEffect(() => {
    decode();
  }, []);

  return (
    <div className="flex bg-abumuda w-full h-screen justify-center font-inter">
      <div className="absolute">
        <Navbar />
      </div>
      <div className="container py-16">
        <div className="content-center items-center">
          <div className="pt-6 flex justify-start pb-3 text-xs">
            <span className="text-gray-500">Beranda</span>
            <span className="text-gray-500 self-center">
              <BiChevronRight />
            </span>
            <span className="text-gray-500">Produk</span>
            <span className="text-gray-500 self-center">
              <BiChevronRight />
            </span>
            <span>Tambah Produk</span>
          </div>
          <h1 className="text-2xl font-bold pb-4">Halaman Tambah Produk</h1>
          <div className="flex flex-col rounded-md shadow-md bg-white p-6">
            <div className="flex justify-between mb-3">
              <h2 className="text-lg font-semibold">Tambah Produk</h2>
              <Link to="/produk">
                <button className="flex font-medium items-center text-birumuda hover:underline">
                  <HiArrowLeft />
                  Kembali
                </button>
              </Link>
            </div>
            <form className="flex flex-col gap-3" onSubmit={saveProduk}>
              <div className="flex flex-col">
                <label className="text-base font-medium text-birumuda">
                  Kode Produk
                </label>
                <input
                  className="border-b-2 w-1/2 p-1 text-gray-500 bg-white"
                  type="number"
                  value={kodeProduk}
                  onChange={(e) => setkodeProduk(e.target.value)}
                  placeholder="12345"
                  required
                />
              </div>
              <div className="flex justify-between gap-3">
                <div className="flex flex-col w-1/2">
                  <label className="text-base font-medium text-birumuda">
                    Nama Produk
                  </label>
                  <input
                    className="border-b-2 w-full p-1 text-gray-500 bg-white"
                    type="text"
                    value={namaProduk}
                    onChange={(e) => setnamaProduk(e.target.value)}
                    placeholder="Masukkan Nama Produk"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-base font-medium text-birumuda">
                    Kategori Produk
                  </label>
                  <select
                    className="border-b-2 w-full p-1 text-gray-500 bg-white"
                    type="text"
                    value={kategoriProduk}
                    onChange={(e) => setkategoriProduk(e.target.value)}
                    required
                  >
                    <option value="none">Pilih Kategori Produk</option>
                    <option value="Beras">Beras</option>
                    <option value="Gula">Gula Pasir</option>
                    <option value="Minyak">Minyak goreng dan mentega</option>
                    <option value="Daging">Daging</option>
                    <option value="Telur">Telur ayam</option>
                    <option value="Susu">Susu</option>
                    <option value="Bawang">Bawang</option>
                    <option value="Gas">Gas (LPG) dan minyak tanah</option>
                    <option value="Garam">Garam</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <div className="flex flex-col w-1/2">
                  <label className="text-base font-medium text-birumuda">
                    Harga Beli Produk
                  </label>
                  <input
                    className="border-b-2 w-full p-1 text-gray-500 bg-white"
                    type="number"
                    value={hargaBeli}
                    onChange={(e) => sethargaBeli(e.target.value)}
                    placeholder="Masukkan Harga Beli"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-base font-medium text-birumuda">
                    Harga Jual Produk
                  </label>
                  <input
                    className="border-b-2 w-full p-1 text-gray-500 bg-white"
                    type="number"
                    value={hargaJual}
                    onChange={(e) => sethargaJual(e.target.value)}
                    placeholder="Masukkan Harga Jual"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <div className="flex flex-col w-1/2">
                  <label className="text-base font-medium text-birumuda">
                    Stok Produk
                  </label>
                  <input
                    className="border-b-2 w-full p-1 text-gray-500 bg-white"
                    type="number"
                    value={stokProduk}
                    onChange={(e) => setstokProduk(e.target.value)}
                    placeholder="Masukkan Stok Produk"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-base font-medium text-birumuda">
                    Satuan Produk
                  </label>
                  <select
                    className="border-b-2 w-full p-1 text-gray-500 bg-white"
                    type="text"
                    value={satuanProduk}
                    onChange={(e) => setsatuanProduk(e.target.value)}
                    required
                  >
                    <option value="none">Pilih Satuan Produk</option>
                    <option value="Box">Box</option>
                    <option value="Kg">Kg</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-base font-medium text-birumuda">
                  Tanggal Kedaluwarsa
                </label>
                <input
                  className="border-b-2 w-1/2 p-1 text-gray-500 bg-white"
                  type="date"
                  value={tanggalKedaluwarsa}
                  onChange={(e) => settanggalKedaluwarsa(e.target.value)}
                  placeholder="Masukkan Tanggal Kedaluarsa"
                  required
                />
              </div>
              <div className="flex justify-end mt-6 gap-6">
                <button
                  className="w-28 py-1 border border-birumuda bg-birumuda text-white font-semibold rounded-full hover:underline"
                  type="submit"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TambahProduk;
