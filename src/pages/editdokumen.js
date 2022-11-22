import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { HiArrowLeft } from "react-icons/hi";
import axios from "axios";
import jwt_decode from "jwt-decode";

function EditDokumen() {
  const [namaDokumen, setnamaDokumen] = useState("");
  const [kategoriDokumen, setkategoriDokumen] = useState("");
  const [deskripsiDokumen, setdeskripsiDokumen] = useState("");
  const [uploadBukti, setuploadBukti] = useState(null);
  const [msg, setMsg] = useState("");
  const { id } = useParams();

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

  const saveDokumen = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://sembapp.azurewebsites.net/dokumen/${id}`, {
        namaDokumen,
        kategoriDokumen,
        deskripsiDokumen,
        uploadBukti,
      });
      navigate("/dokumen");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.setMsg);
      }
    }
  };

  useEffect(() => {
    getDocumentById();
    refreshToken();
  }, []);

  const getDocumentById = async () => {
    const response = await axios.get(`https://sembapp.azurewebsites.net/dokumen/${id}}`);
    setnamaDokumen(response.data.namaDokumen);
    setkategoriDokumen(response.data.kategoriDokumen);
    setdeskripsiDokumen(response.data.deskripsiDokumen);
    //setuploadBukti(response.data.uploadBukti);
  };

  return (
    <div className="bg-abumuda w-full h-full flex justify-center font-inter">
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
            <span className="text-gray-500">Dokumen</span>
            <span className="text-gray-500 self-center">
              <BiChevronRight />
            </span>
            <span>Edit Dokumen</span>
          </div>
          <h1 className="text-2xl font-bold pb-4">Halaman Edit Dokumen</h1>
          <div className="flex flex-col w-full h-full rounded-md shadow-md bg-white p-6">
            <div className="flex justify-between mb-3">
              <h2 className="text-lg font-semibold">Edit Dokumen</h2>
              <Link to="/dokumen">
                <button className="flex font-medium items-center text-birumuda hover:underline">
                  <HiArrowLeft />
                  Kembali
                </button>
              </Link>
            </div>
            <form className="flex flex-col gap-3" onSubmit={saveDokumen}>
              <div className="flex flex-col">
                <label className="text-base font-medium text-birumuda">
                  Nama Dokumen
                </label>
                <input
                  className="border-b-2 w-1/2 p-1 text-gray-500 bg-white"
                  type="text"
                  value={namaDokumen}
                  onChange={(e) => setnamaDokumen(e.target.value)}
                  placeholder="Masukkan Nama Dokumen"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-base font-medium text-birumuda">
                  Kategori Dokumen
                </label>
                <select
                  className="border-b-2 w-1/2 p-1 text-gray-500 bg-white"
                  value={kategoriDokumen}
                  onChange={(e) => setkategoriDokumen(e.target.value)}
                >
                  <option value="none">Pilih Kategori Dokumen</option>
                  <option value="Penjualan">Nota Penjualan</option>
                  <option value="Kulakan">Nota Kulakan</option>
                  <option value="Lain">Lainnya</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-base font-medium text-birumuda">
                  Deskripsi Dokumen
                </label>
                <textarea
                  className="border-b-2 w-1/2 h-28 p-1 text-gray-500 bg-white"
                  value={deskripsiDokumen}
                  onChange={(e) => setdeskripsiDokumen(e.target.value)}
                  placeholder="Masukkan rincian dokumen (detail harga, banyak produk, dll)"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-base font-medium text-birumuda">
                  Unggah Bukti Dokumen
                </label>
                <input
                  className="border-2 border-dashed w-1/2 p-1 text-gray-500 bg-white"
                  type="file"
                  name="Bukti Dokumen"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setuploadBukti(e.target.files[0]);
                  }}
                />
                <div className="w-full">
                  {uploadBukti && (
                    <div className="flex w-full gap-6">
                      <img
                        className="content-center"
                        alt="not found"
                        width={"100px"}
                        src={URL.createObjectURL(uploadBukti)}
                      />
                      <button onClick={() => setuploadBukti(null)}>
                        <div className="w-28 py-1 border border-birumuda bg-birumuda text-white font-semibold rounded-full hover:underline">
                          Hapus
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-6">
                <Link to="/dokumen">
                  <button className="w-28 py-1 border border-birumuda text-birumuda font-semibold rounded-full hover:underline">
                    Batal
                  </button>
                </Link>
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

export default EditDokumen;
