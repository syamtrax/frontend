import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { HiFilter } from "react-icons/hi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Product = () => {
  const [produk, setProduk] = useState([]);

  const [nama, setNama] = useState("");
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get("https://sembapp.azurewebsites.net/token");
      const decoded = jwt_decode(response.data.accessToken);
      setNama(decoded.namaPengguna);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getProduct();
    refreshToken();
  }, []);

  const getProduct = async () => {
    const response = await axios.get("https://sembapp.azurewebsites.net/produk");
    setProduk(response.data);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://sembapp.azurewebsites.net/produk/${id}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-abumuda w-full flex justify-center h-screen font-inter">
        <div className="absolute">
          <Navbar />
        </div>
        <div className="container py-16">
          <div className="content-center items-center">
            <div className="pt-6 flex justify-content">
              {" "}
              Beranda
              <span className="self-center">
                <BiChevronRight />
              </span>
              Produk
            </div>
            <div className="text-2xl font-bold pb-4">Halaman Produk</div>
            <div className="relative"></div>
            <div className="flex my-4 gap-6 justify-between">
              <Link
                className="w-1/6 bg-white shadow-md rounded-md flex h-8"
                to="/tambahproduk"
              >
                <button className="w-full text-sm text-center items-center content-center  text-white transition-colors duration-200 transform bg-birumuda rounded-md hover:bg-sky-400">
                  + Tambah Produk
                </button>
              </Link>
              <div className="w-1/3 bg-white shadow-md rounded-md h-8">
                <div className="w-full text-center items-center content-center">
                  Jumlah Produk :
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-6">
              <div className="p-4 h-22 w-full bg-white rounded-md items-center shadow-md text-center text-lg">
                Notifikasi Kedaluwarsa
                <div className="text-center">Produk:</div>
              </div>
              <div className="p-4 h-22 w-full bg-white rounded-md items-center shadow-md text-center text-lg">
                Notifikasi Habis
                <div className="text-center">Produk:</div>
              </div>
            </div>
            <div className="flex mt-4 justify-between gap-4">
              <div className="bg-white w-full h-full rounded-md shadow-md">
                <div className="flex justify-between">
                  <div className="text-lg font-semibold flex items-center px-4">
                    Data Produk
                  </div>
                  <div className="flex px-4">
                    <div className="flex items-center">
                      <form action="">
                        <div className="relative flex items-center">
                          <AiOutlineSearch className="absolute text-gray-400 ml-5" />
                          <input
                            type="text"
                            placeholder="Cari Produk"
                            className=" text-sm font-normal rounded-md border-2 border-gray-300 pr-3 pl-6 py-1 m-4"
                          />
                        </div>
                      </form>
                      <button className="text-sm font-medium rounded-md border-2 border-gray-300 flex items-center px-2 py-1">
                        <span className="p-1">
                          <HiFilter />
                        </span>
                        Filter
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pb-10">
                  <table className="w-full table-fixed justify-center overflow-y-auto">
                    <thead className="">
                      <tr className="border-b-2 border-gray-300">
                        <th className="w-1/6 py-2">KODE</th>
                        <th className="w-1/5">NAMA</th>
                        <th className="w-1/5">KATEGORI</th>
                        <th className="w-1/5">HARGA BELI</th>
                        <th className="w-1/5">HARGA JUAL</th>
                        <th className="w-1/6">STOK</th>
                        <th className="w-1/5">EDIT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {produk.map((dat) => {
                        if (dat.namaPengguna === nama) {
                          return (
                            <tr
                              key={dat.kodeProduk}
                              className="py-8 border-b-2 border-gray-300"
                            >
                              <td className="w-1/5 text-center">
                                {dat.kodeProduk}
                              </td>
                              <td className="w-1/5 text-left">
                                {dat.namaProduk}
                              </td>
                              <td className="w-1/5 text-center">
                                {dat.kategoriProduk}
                              </td>
                              <td className="w-1/5 text-center">
                                {dat.hargaBeli}
                              </td>
                              <td className="w-1/5 text-center">
                                {dat.hargaJual}
                              </td>
                              <td className="w-1/5 text-center">
                                {dat.stokProduk}
                              </td>
                              <td className="w-1/5 text-center">
                                {" "}
                                <Link
                                  to={`editproduk/${dat.kodeProduk}`}
                                  className="font-bold text-birumuda mr-2"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => deleteProduct(dat.kodeProduk)}
                                  className="font-bold text-red-700"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
