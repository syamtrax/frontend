import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { HiFilter } from "react-icons/hi";
import fotoprofil from "../assets/avatardefault_92824.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

const Document = () => {
  const [dokumen, setDokumen] = useState([]);
  const [dataTrans, setDataTrans] = useState([]);
  const [nama, setNama] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken"]);

  const decode = async () => {
    try {
      const decoded = jwt_decode(cookies.accessToken);
      setNama(decoded.namaPengguna);
      //setNamaToko(decoded.namaToko);
    } catch (error) {
      if (!cookies.accessToken) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getDocument();
    decode();
    getTransaction();
  }, []);

  const getDocument = async () => {
    const response = await axios.get(
      "https://sembapp.azurewebsites.net/dokumen"
    );
    setDokumen(response.data);
  };
  const getTransaction = async () => {
    const response = await axios.get(
      "https://sembapp.azurewebsites.net/transaction"
    );
    setDataTrans(response.data);
    console.log(dataTrans);
    setDokumen((prevState) => [
      ...prevState,
      {
        id: dataTrans.id,
        label: response.data.label,
        idtrans: response.data.idtrans,
        paymenttype: response.data.paymenttype,
        price: response.data.price,
        member: response.data.member,
      },
    ]);
  };

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`https://sembapp.azurewebsites.net/dokumen/${id}`);
      getDocument();
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
            <div className="pt-6 flex justify-start pb-3 text-xs">
              <span className="text-gray-500">Beranda</span>
              <span className="text-gray-500 self-center">
                <BiChevronRight />
              </span>
              Dokumen
            </div>
            <div className="text-2xl font-bold pb-4">Halaman Dokumen</div>
            <div className="relative"></div>
            <div className="flex my-4 gap-6 justify-between">
              <Link
                className="w-1/6 bg-white shadow-md rounded-md flex h-8"
                to="/tambahdokumen"
              >
                <button className="w-full text-sm text-center items-center content-center  text-white transition-colors duration-200 transform bg-birumuda rounded-md hover:bg-sky-400">
                  + Tambah Dokumen
                </button>
              </Link>
              <div className="w-1/3 bg-white shadow-md rounded-md h-8">
                <div className="w-full text-center items-center content-center">
                  Total Dokumen :
                </div>
              </div>
            </div>

            <div className="flex mt-4 justify-between gap-4">
              <div className="bg-white w-full h-full rounded-md shadow-md">
                <div className="flex justify-between">
                  <div className="text-lg font-semibold flex items-center px-4">
                    Data Dokumen
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
                <div className="mb-4 border-b border-gray-200">
                  <ul
                    className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    id="tabDokumen"
                    data-tabs-toggle="#tabDokumenContent"
                    role="tablist"
                  >
                    <li className="mr-2" role="presentation">
                      <button
                        className="inline-block p-4 rounded-t-lg border-b-2 border-black"
                        id="semua-tab"
                        data-tabs-target="#semua"
                        type="button"
                        role="tab"
                        aria-controls="semua"
                        aria-selected="true"
                      >
                        Semua
                      </button>
                    </li>
                    <li className="mr-2" role="presentation">
                      <button
                        className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-black hover:border-gray-300 text-gray-500 border-gray-100"
                        id="lunas-tab"
                        data-tabs-target="#lunas"
                        type="button"
                        role="tab"
                        aria-controls="lunas"
                        aria-selected="false"
                      >
                        Lunas
                      </button>
                    </li>
                    <li className="mr-2" role="presentation">
                      <button
                        className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-black hover:border-gray-300  text-gray-500 border-gray-100"
                        id="hutang-tab"
                        data-tabs-target="#hutang"
                        type="button"
                        role="tab"
                        aria-controls="hutang"
                        aria-selected="false"
                      >
                        Hutang
                      </button>
                    </li>
                    <li role="presentation">
                      <button
                        className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-black hover:border-gray-300  text-gray-500 border-gray-100"
                        id="kulakan-tab"
                        data-tabs-target="#kulakan"
                        type="button"
                        role="tab"
                        aria-controls="kulakan"
                        aria-selected="false"
                      >
                        Kulakan
                      </button>
                    </li>
                  </ul>
                </div>
                <div id="tabDokumenContent">
                  <div
                    className="p-4"
                    id="semua"
                    role="tabpanel"
                    aria-labelledby="semua-tab"
                  >
                    {dokumen.length > 0 && (
                      <table className="w-full table-fixed justify-center overflow-y-auto">
                        <thead className="">
                          <tr className="border-b-2 border-gray-300">
                            <th className="w-1/6 py-2">DESKRIPSI</th>
                            <th className="w-1/5">KATEGORI</th>
                            <th className="w-1/5">STATUS</th>
                            <th className="w-1/5">TANGGAL TRANSAKSI</th>
                            <th className="w-1/5">JUMLAH</th>
                            <th className="w-1/5">EDIT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dokumen.map((dat) => {
                            if (dat.namaPengguna === nama) {
                              return (
                                <tr
                                  key={dat.id}
                                  className="py-8 border-b-2 border-gray-300"
                                >
                                  <td className="w-1/5 text-center">
                                    {dat.idtrans}
                                  </td>
                                  <td className="w-1/5 text-left">
                                    {dat.kategoriDokumen}
                                  </td>
                                  <td className="w-1/5 text-center">
                                    {dat.status}
                                  </td>
                                  <td className="w-1/5 text-center">
                                    {dat.createdAt}
                                  </td>
                                  <td className="w-1/5 text-center">
                                    {dat.price}
                                  </td>
                                  <td className="w-1/5 text-center">
                                    {" "}
                                    <Link
                                      to={`editdokumen/${dat.id}`}
                                      className="font-bold text-birumuda mr-2"
                                    >
                                      Edit
                                    </Link>
                                    <button
                                      onClick={() => deleteDocument(dat.id)}
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
                    )}
                    {dokumen.length === 0 && (
                      <div className="flex flex-col items-center animate-fade-in-up">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            class="mr-2 w-8 h-8 text-white animate-spin dark:text-white fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="hidden p-4"
                    id="lunas"
                    role="tabpanel"
                    aria-labelledby="lunas-tab"
                  ></div>
                  <div
                    className="hidden p-4"
                    id="hutang"
                    role="tabpanel"
                    aria-labelledby="hutang-tab"
                  ></div>
                  <div
                    className="hidden p-4"
                    id="kulakan"
                    role="tabpanel"
                    aria-labelledby="kulakan-tab"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Document;
