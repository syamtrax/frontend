import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/login";
import Daftar from "./pages/daftar";
import Dashboard from "./pages/dashboard";
import Produk from "./pages/produk";
import TambahProduk from "./pages/tambahproduk";
import Dokumen from "./pages/dokumen";
import TambahDokumen from "./pages/tambahdokumen";
import EditProduk from "./pages/editproduk";
import EditDokumen from "./pages/editdokumen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/tambahproduk" element={<TambahProduk />} />
        <Route path="/produk/editproduk/:kode" element={<EditProduk />} />
        <Route path="/dokumen/editdokumen/:id" element={<EditDokumen />} />
        <Route path="/dokumen" element={<Dokumen />} />
        <Route path="/tambahdokumen" element={<TambahDokumen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
