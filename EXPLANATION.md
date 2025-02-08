# Penjelasan Tampilan UI/Interaksi

Situs ini memiliki tiga halaman utama, yaitu:

- Halaman Home(Utama) Hanya Menampilkan Judul Aplikasi
- Halaman Add Invoice
- Halaman My Invoices

## Technical Decisions

Di project ini untuk project structure-nya saya mengikuti guide yang sudah diberikan, di mana di dalam folder app(app router), hanya berisi component utama yang akan menjadi sebuah rute(page), kemudian saya meng-extract beberapa komponen di dalam page tersebut ke dalam komponen yang lebih kecil lagi di folder components/invoices sesuai module yang dikerjakan. Alasannya adalah selain karena di evalution criteria juga untuk masalah reusability atau penggunaan kembali, walaupun dalam project ini hanya digunakan di satu page saja, karena scopenya yang masih kecil juga.

Contohnya seperti file search.tsx, table.tsx dan dropdown-status.tsx, saya meng-extractnya ke komponen terpisah di bawah folder component/invoices.

Perlu di catat juga bahwa mungkin ini bisa termasuk overkill di project kecil, karena hanya digunakan sekali saja, memang agak bertentangan dengan prinsip KISS (keep-it-simple-stupid), namun jika memang diperlukan atau memang komponen tsb digunakan di banyak tempat, menerapkan prinsip DRY(dont-repeat-yourself) ini pilihan yang tepat.

Jadi pada akhirnya "it depends" dan menyesuaikan dengan kebutuhan project dan jenis projectnya seperti apa.

Kemudian untuk nilai nilai konstan yang sering digunakan saya masukannya ke folder constants. Untuk hooks sendiri saya masukan di folder hooks.

Dan di dalam folder "lib" saya buat 3 folders, providers untuk menampung kebutuhan custom providers dari MUI-nya, kemudian schemas untuk kebutuhan schema validation zod-nya, dan yang terakhir di folder types untuk kebutuhan type/typing dari aplikasinya, dalam hal ini untuk modules invoices.

Utils untuk menampung fungsi-fungsi kecil yang sering digunakan di aplikasi.

Nah, karena di aplikasi ini tidak menggunakan atau konek ke REST-API, jadi untuk storage nya saya memilih menggunakan localStorage, jadi semua data di dalam aplikasi ini disimpan di dalam localStorage. Alasannya karena storage nya lebih besar saja ketimbang storage lain seperti cookies. Jadi lebih cocok untuk menyimpan datanya di localStorage.

Ini juga membuat datanya akan persistent ketika user melakukan refresh pagenya, jadi tidak akan hilang ketika misal hanya disimpan di memory saja(baca: useState, tanpa bantuan storage seperti localStorage).

Di sini saya menggunakan useEffect untuk melakukan data fetching ke localStoragenya, di project yang lebih real/production grade, harusnya dapat menggunakan approach yang lebih proper seperti React-Query, karena mereka sudah memberikan banyak hal seperti caching, deduping request, loading, error, success state, jadi tidak perlu dilakukan secara manual.
