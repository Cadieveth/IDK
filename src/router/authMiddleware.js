// src/router/authMiddleware.js

import store from "@/store"; // Pastikan alamat path menuju store yang benar

export default function authMiddleware(to, from, next) {
  // Cek apakah pengguna telah terotentikasi
  if (store.state.isAuthenticated) {
    // Jika pengguna mencoba mengubah alamat URL menjadi "/", redirect ke halaman "/home"
    if (to.path === "/") {
      next("/home");
    } else {
      next();
    }
  } else {
    next();
  }
}
