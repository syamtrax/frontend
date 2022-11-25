import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.js";
import contohGambar from "../assets/Background Halaman Dashboard.png";
import fotoprofil from "../assets/avatardefault_92824.png";
import kasir from "../assets/Group.png";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import moment from "moment";

const Dashboard = () => {
  const [dokumen, setDokumen] = useState([]);
  const [produk, setProduk] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [nama, setNama] = useState("");
  const [namaToko, setNamaToko] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  var startdate = moment();
  var yesterday = moment().subtract(1, "days").format("MMM Do YY");
  var date = moment().format("MMM Do YY");
  const navigate = useNavigate();

  const decode = async () => {
    try {
      const decoded = jwt_decode(cookies.accessToken);
      setNama(decoded.namaPengguna);
      setNamaToko(decoded.namaToko);
    } catch (error) {
      if (!cookies.accessToken) {
        navigate("/");
      }
    }
  };

  const getProduct = async () => {
    const response = await axios.get(
      "https://sembapp.azurewebsites.net/produk"
    );
    setProduk(response.data);
    //setProduk(moment(response.data.tanggalKedaluwarsa));
    console.log(startdate.subtract(moment(produk.tanggalKedaluwarsa)));
  };

  transaction.map((trans) => {
    const date = new Date(trans.createdAt);
    transaction.createdAt = date.toISOString().substring(0, 10);
  });

  const penjualanthisday = transaction.reduce((total, transaction) => {
    if (
      transaction.namaPengguna === nama &&
      moment(transaction.createdAt).format("MMM Do YY") === date
    ) {
      total += transaction.price;
    }
    return total;
  }, 0);

  const penjualanyesterday = transaction.reduce((total, transaction) => {
    if (
      transaction.namaPengguna === nama &&
      moment(transaction.createdAt).format("MMM Do YY") === yesterday
    ) {
      total += transaction.price;
    }
    return total;
  }, 0);

  var persentase =
    ((penjualanthisday - penjualanyesterday) / penjualanyesterday) * 100;

  const totaldokumen = dokumen.reduce((count, dokumen) => {
    if (dokumen.namaPengguna === nama) {
      count += 1;
    }
    return count;
  }, 0);

  const totalproduk = produk.reduce((count, produk) => {
    if (produk.namaPengguna === nama) {
      count += 1;
    }
    return count;
  }, 0);

  const penjualan = transaction
    .reduce((total, transaction) => {
      if (transaction.namaPengguna === nama) {
        total += transaction.price;
      }
      return total;
    }, 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const transaksi = transaction.reduce((count, transaction) => {
    if (transaction.namaPengguna === nama) {
      count += 1;
    }
    return count;
  }, 0);

  const getDocument = async () => {
    const response = await axios.get(
      "https://sembapp.azurewebsites.net/dokumen"
    );
    setDokumen(response.data);
    console.log(dokumen);
  };

  useEffect(() => {
    getTransaction();
    decode();
    getProduct();
    getDocument();
  }, []);

  const getTransaction = async () => {
    const response = await axios.get(
      "https://sembapp.azurewebsites.net/transaction",
      {
        headers: {
          authorization: `Bearer ${cookies.accessToken}`,
        },
      }
    );
    console.log(cookies.accessToken);
    setTransaction(response.data);
  };
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`https://sembapp.azurewebsites.net/transaction/${id}`);
      getTransaction();
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
            <div className="pt-6 text-xs text-gray-500">Beranda</div>
            <div className="text-2xl font-bold pb-4">Halaman Dashboard</div>
            <div className="relative">
              <img
                src={contohGambar}
                className="object-cover h-40 w-full rounded-md brightness-100"
              ></img>
              <div className="absolute top-1/3 w-full">
                <img
                  src={fotoprofil}
                  className="object-cover rounded-full h-15 w-12 mx-auto content-center"
                ></img>
                <div className="text-2xl text-white w-full text-center text-shadow-lg">
                  Selamat Datang{" "}
                  <span className="font-bold text-shadow-xl">{nama}</span> di{" "}
                  <span className="font-bold text-shadow-2xl">{namaToko}</span>
                </div>
              </div>
            </div>
            <div className="flex my-4 gap-6">
              <div className="w-1/2 bg-white shadow-md rounded-md flex h-8">
                <div className="w-full text-center items-center content-center">
                  Total Dokumen : {totaldokumen}
                </div>
              </div>
              <div className="w-1/2 bg-white shadow-md rounded-md h-8">
                <div className="w-full text-center items-center content-center">
                  Jumlah Produk : {totalproduk}
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 w-5/6">
                <div className="p-4 bg-white rounded-md items-center shadow-md">
                  <div className="">Penjualan Hari Ini</div>
                  <div className="flex justify-between">
                    <div className="flex-col font-bold text-2xl content-center items-center">
                      Rp {penjualanthisday}
                    </div>
                    <div className="">
                      <div className="text-sm text-hijau">{persentase}%</div>
                      <div className="text-xs text-abu">dari kemarin</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-md items-center shadow-md">
                  <div className="">Total Penjualan</div>
                  <div className="flex justify-between">
                    <div className="flex-col font-bold text-2xl content-center items-center">
                      Rp {penjualan}
                    </div>
                    <div className="">
                      <div className="text-sm text-hijau">+36%</div>
                      <div className="text-xs text-abu">dari kemarin</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-md items-center shadow-md">
                  <div className="">Total Transaksi</div>
                  <div className="flex justify-between">
                    <div className="flex-col font-bold text-2xl content-center items-center">
                      {transaksi} kali
                    </div>
                    <div className="">
                      <div className="text-sm text-hijau">+36%</div>
                      <div className="text-xs text-abu">dari kemarin</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 w-1/6 ml-4 bg-white rounded-md shadow-md flex items-center content-center justify-center align-middle">
                <img
                  src={kasir}
                  className="h-16 content-center justify-center items-center"
                ></img>
              </div>
            </div>
            <div className="flex mt-4 justify-between gap-4">
              <div className="bg-white w-3/4 h-full rounded-md shadow-md">
                <div className="flex justify-between p-3">
                  <div>
                    <div className="text-lg font-bold">Riwayat Transaksi</div>
                    <div className="text-base">Beberapa transaksi terkini</div>
                  </div>
                </div>
                <div className="h-full">
                  {transaction.length > 0 && (
                    <table className="flex table-fixed justify-center py-2 overflow-y-auto h-80 pb-5">
                      <tbody>
                        {transaction.map((trans) => {
                          if (trans.namaPengguna === nama) {
                            return (
                              <tr key={trans.id} className="border-b-2 h-16">
                                <td className="w-40 text-center">
                                  {trans.label}
                                </td>
                                <td className="w-56">
                                  <div className="font-bold">
                                    {trans.idtrans}
                                  </div>
                                  <div>{trans.paymenttype}</div>
                                </td>
                                <td className="w-48">
                                  <div className="text-lg font-bold">
                                    Rp{" "}
                                    {trans.price
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                  </div>
                                  <div>
                                    {moment(trans.createdAt).format(
                                      "Do MMMM YYYY, h:mm:ss a"
                                    )}
                                  </div>
                                </td>
                                <td className="w-32">{trans.member}</td>
                                <td className="w-32">
                                  <button
                                    onClick={() => deleteTransaction(trans.id)}
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
                  {transaction.length === 0 && (
                    <div className="flex flex-col items-center animate-fade-in-up pb-5">
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
              </div>
              <div className="w-1/4 gap-4">
                <div className="bg-white h-[248px] shadow-md rounded-md mb-4">
                  <div className="h-1/4 bg-birumuda text-white text-center justify-center items-center flex rounded-t-md font-bold">
                    Notifikasi Produk
                  </div>
                  {produk.length > 0 && (
                    <table className="table-fixed justify-center py-2">
                      <thead>
                        <tr>
                          <th className="w-24 flex justify-start pl-2">Nama</th>
                          <th className="w-16 ">Stok</th>
                          <th className="w-16 ">Kadaluarsa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {produk.map((prod, i) => {
                          if (
                            (moment(prod.tanggalKedaluwarsa).diff(
                              startdate,
                              "days"
                            ) < 7 ||
                              prod.stokProduk < 5) &&
                            prod.namaPengguna === nama
                          ) {
                            return (
                              <tr key={i}>
                                <td className="pl-2">{prod.namaProduk}</td>
                                <td className="text-center">
                                  {prod.stokProduk < 5 && (
                                    <div className="font-bold text-red-600">
                                      {prod.stokProduk}
                                    </div>
                                  )}
                                  {prod.stokProduk >= 5 && (
                                    <div className="font-bold">
                                      {prod.stokProduk}
                                    </div>
                                  )}
                                </td>
                                <td className="text-center">
                                  {moment(prod.tanggalKedaluwarsa).diff(
                                    startdate,
                                    "days"
                                  ) < 7 && (
                                    <div className="font-bold text-red-600">
                                      {moment(prod.tanggalKedaluwarsa).diff(
                                        startdate,
                                        "days"
                                      )}
                                    </div>
                                  )}
                                  {moment(prod.tanggalKedaluwarsa).diff(
                                    startdate,
                                    "days"
                                  ) >= 7 && (
                                    <div className="font-bold">
                                      {moment(prod.tanggalKedaluwarsa).diff(
                                        startdate,
                                        "days"
                                      )}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  )}
                  {produk.length === 0 && (
                    <div className="flex flex-col items-center animate-fade-in-up pb-5">
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
                <div className="bg-white h-1/3 shadow-md rounded-md">
                  <div className="h-1/3 bg-birumuda text-white text-center justify-center items-center flex rounded-t-md font-bold">
                    Notifikasi Hutang
                  </div>
                  {dokumen.length > 0 && (
                    <div className="h-2/3 text-sm">
                      <div className="justify-center text-center">
                        Transaksi :{" "}
                        {transaction.map((trans, i) => {
                          if (
                            trans.label === "Belum Lunas" &&
                            trans.namaPengguna === nama
                          ) {
                            i++;
                            if (i === 1) {
                              return (
                                <div key={i}>
                                  <div className="font-bold text-red-600">
                                    {trans.idtrans}
                                  </div>
                                </div>
                              );
                            }
                          }
                        })}{" "}
                      </div>
                      <div className="text-center justify-center">
                        Dokumen :{" "}
                        {dokumen.map((dok, i) => {
                          if (
                            dok.statusDokumen === "Hutang" &&
                            dok.namaPengguna === nama
                          ) {
                            i++;
                            if (i === 1) {
                              return (
                                <div key={dok.id}>
                                  <div className="font-bold text-red-600">
                                    {dok.namaDokumen}
                                  </div>
                                </div>
                              );
                            }
                          }
                        })}
                      </div>
                    </div>
                  )}
                  {dokumen.length === 0 && (
                    <div className="flex flex-col items-center animate-fade-in-up pb-5">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
