# 🧾 Aplikasi Web Interaktif: Sistem Login dan Dashboard Portal Bootstrap (AJAX + PHP + JSON)

**Nama:** Arya Rangga Putra Pratama  
**NRP:** 5025241072  
**Kelas:** Pemrograman Web A2  
**Dosen Pengampu:** Bapak Fajar Baskoro, S.Kom., M.T.  
**Tanggal:** 22 Oktober 2025  
**Jenis Tugas:** ETS Pemrograman Web  

---

## 💡 Deskripsi Umum

Proyek ini merupakan **simulasi portal login dan register berbasis AJAX dengan PHP**.  
Tujuannya adalah mendemonstrasikan bagaimana **form login dan register dapat dikirim tanpa reload halaman (asynchronous)** menggunakan **jQuery AJAX**, dengan penyimpanan data pengguna ke file `users.json`.

### ✨ Fitur Utama
- Login & register dinamis via AJAX  
- Validasi form di sisi frontend  
- Penyimpanan data ke file JSON  
- Hashing password menggunakan `password_hash()`  
- Fitur “remember me” (localStorage)  
- Show/hide password interaktif  
- Simulasi login via Google  
- Dashboard menampilkan data pengguna  

---

## 🧱 Struktur Folder

```bash
login-simulasi/
│
├── index.html
├── style.css
├── script.js
├── server.php
├── dashboard.html
└── users.json   ← otomatis dibuat saat aplikasi dijalankan
````

---

## 🚀 Cara Menjalankan (Lokal)

1. Pastikan sudah terinstal **PHP 8+** di komputer.

2. Buka terminal di folder proyek ini.

3. Jalankan perintah berikut:

   ```bash
   php -S localhost:8000
   ```

4. Buka di browser:
   👉 [http://localhost:8000](http://localhost:8000)
   atau jika menggunakan Live Server di VS Code:
   👉 [http://127.0.0.1:5500/login-simulasi/index.html](http://127.0.0.1:5500/login-simulasi/index.html)

---

## 🌐 Deploy Online via GitHub Pages

Jika ingin men-deploy versi statis (tanpa PHP), kamu bisa upload file berikut ke GitHub:

* `index.html`
* `style.css`
* `script.js`

> **Catatan:** File `server.php` dan `users.json` tidak akan berjalan di GitHub Pages karena GitHub hanya mendukung file statis.
> Untuk versi full (dengan backend PHP), gunakan platform seperti:
>
> * [000webhost](https://www.000webhost.com/)
> * [InfinityFree](https://www.infinityfree.net/)
> * [Render](https://render.com/)
> * [Vercel + Serverless PHP](https://vercel.com)

---

## 🧩 Penjelasan File

### `index.html`

Berisi tampilan **login dan register** dengan tema modern (putih & biru).
Dibagi menjadi dua bagian:

```html
<section class="left">Penjelasan sistem</section>
<aside class="card">Form login & register</aside>
```

### `style.css`

Mengatur desain dan layout.

| Bagian       | Fungsi                        |
| ------------ | ----------------------------- |
| `:root`      | Variabel warna tema           |
| `.container` | Layout dua kolom              |
| `.card`      | Tampilan utama login/register |
| `.loader`    | Animasi loading AJAX          |
| `.shake`     | Efek getar saat error         |

### `script.js`

Mengatur logika frontend dan komunikasi AJAX.

Contoh potongan kode:

```js
$.ajax({
  url: 'server.php?action=login',
  method: 'POST',
  dataType: 'json',
  data: { email, password },
  success: (res) => {
    if(res.status === 'success'){
      sessionStorage.setItem('demo_logged', email);
      window.location.href = 'dashboard.html';
    }
  }
});
```

### `server.php`

Menangani request register/login, serta menyimpan data ke file `users.json`.

```php
$usersFile = __DIR__ . '/users.json';
if (!file_exists($usersFile))
    file_put_contents($usersFile, json_encode(new stdClass()));
```

### `dashboard.html`

Halaman setelah login berhasil.
Menampilkan email user dan tombol logout.

```js
const logged = sessionStorage.getItem('demo_logged');
if (!logged) location.href = 'index.html';
```

---

## 🔁 Alur Data Sistem

1. User register → AJAX → disimpan ke `users.json`
2. User login → verifikasi via PHP
3. Jika valid → disimpan di `sessionStorage`
4. Redirect ke `dashboard.html`

---

## 📸 Hasil Tampilan

![Screenshot Placeholder](https://via.placeholder.com/900x450?text=Screenshot+Aplikasi+Login)

*(Ganti dengan hasil screenshot asli dari aplikasi)*

---

## 🧠 Kesimpulan

Proyek ini membuktikan bahwa **sistem login sederhana** dapat dibangun hanya dengan:

* **HTML**
* **CSS**
* **JavaScript (AJAX)**
* **PHP (JSON storage)**

tanpa menggunakan database seperti MySQL.
Cocok digunakan sebagai **demo sistem autentikasi** atau **pembelajaran AJAX dasar** di mata kuliah *Pemrograman Web*.

---

## 🔗 Link Terkait

* 🌍 **GitHub Repository:** [https://github.com/aryarangga/antargo-login-simulasi](https://github.com/aryarangga/antargo-login-simulasi)
* 💻 **Live Demo (Local):** [http://localhost:8000](http://localhost:8000)
* 🌐 **Live Demo (GitHub Pages):** [https://aryarangga.github.io/antargo-login-simulasi](https://aryarangga.github.io/antargo-login-simulasi)

---

### ✍️ Dibuat oleh

**Arya Rangga Putra Pratama**
5025241072 — Pemrograman Web A2
Fakultas Teknologi Elektro dan Informatika Cerdas
Institut Teknologi Sepuluh Nopember (ITS)

```

---

Mau aku bantu sekalian buatkan **versi `README.md` siap upload** (dalam file .md biar bisa kamu unduh langsung)?
```
