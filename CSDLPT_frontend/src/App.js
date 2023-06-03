import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import UngDung1 from "./components/UngDung1";
import UngDung2 from "./components/UngDung2";
import KhachHangList from "./components/KhachHangList";
import KhachHangEdit from "./components/KhachHangEdit";
import ThemKhachHang from "./components/ThemKhachHang";
import ThemVe from "./components/ThemVe";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Nav />} >
          <Route element={<UngDung1 />} path="/ungdung1" />
          <Route element={<UngDung2 />} path="/ungdung2" />
          <Route element={<ThemVe />} path="/ve/new" />
          <Route element={<KhachHangList />} path="/khachhangs" />
          <Route element={<KhachHangEdit />} path='/khachhang/new'/>
          <Route element={<ThemKhachHang />} path='/khachhang/new1'/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
