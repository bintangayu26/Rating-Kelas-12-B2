const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw8WdbBnZazrJ7-aoLlt51E5CwDIDARqQ7dsRb2Vn9qXgdIbBT3scUkne5QB16cG1f8zw/exec';

// Anonim checkbox
const anonCheckbox = document.getElementById('anonim');
const nameInput = document.getElementById('name');

anonCheckbox.addEventListener('change', function() {
    nameInput.disabled = this.checked;
    if (this.checked) {
        nameInput.value = 'Anonim';
        nameInput.style.opacity = '0.5';
    } else {
        nameInput.value = '';
        nameInput.style.opacity = '1';
    }
});

let semuaRating = {};
const stars = document.querySelectorAll('.star');
const selectKategori = document.getElementById('kategori');

// Saat bintang diklik
stars.forEach((star, index) => {
    star.addEventListener('click', function() {
        const nilai = index + 1;
        const kategori = selectKategori.value;
        
        // Simpan rating
        semuaRating[kategori] = nilai;
        
        // Update tampilan bintang
        stars.forEach((s, i) => {
            if (i < nilai) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
        console.log("Rating disimpan:", kategori, "=", nilai);
    });
});

// Saat kategori berubah
selectKategori.addEventListener('change', function() {
    const kategori = this.value;
    const rating = semuaRating[kategori] || 0;
    
    // Update tampilan bintang untuk kategori yang dipilih
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
});

// Tombol kirim dan elemen lainnya
const tombolKirim = document.getElementById('submit-btn');
const teksKirim = document.getElementById('submit-text');
const teksLoading = document.getElementById('loading-text');
const commentInput = document.getElementById('comment');

// Event Listener untuk Tombol Kirim
tombolKirim.addEventListener('click', async function() {
    console.log("Tombol Kirim diklik!");
    
    // Validasi: cek apakah ada rating untuk kategori yang dipilih
    const kategoriSekarang = selectKategori.value;
    const ratingSekarang = semuaRating[kategoriSekarang];
    
    if (!ratingSekarang) {
        alert("❌ Harap beri rating terlebih dahulu!\nPilih kategori lalu klik diamond untuk memberi rating.");
        return;
    }
    
    // Tampilkan loading, sembunyikan teks biasa
    teksKirim.style.display = 'none';
    teksLoading.style.display = 'inline';
    tombolKirim.disabled = true;
    
    // Kirim data ke Google Sheets
    try {
        // Persiapkan data yang mau dikirim
        const dataKirim = {
            nama: nameInput.value || 'Anonim',
            kategori: kategoriSekarang,
            rating: ratingSekarang,
            komentar: commentInput.value || '',
            semuaRating: JSON.stringify(semuaRating),
            timestamp: new Date().toLocaleString('id-ID')
        };
        
        console.log("Data yang dikirim:", dataKirim);
        
        // Kirim menggunakan fetch
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataKirim)
        });
        
        // Tunggu sebentar untuk simulasi loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Tampilkan pesan SUKSES
        alert(✅ TERIMA KASIH!\n\nRating ${ratingSekarang}/5 untuk kategori "${kategoriSekarang}" berhasil dikirim.);
        
        // Reset form
        resetForm();
        
    } catch (error) {
        console.error("Error mengirim data:", error);
        alert("❌ Gagal mengirim rating. Silakan coba lagi.");
    } finally {
        // Kembalikan tombol ke normal
        teksKirim.style.display = 'inline';
        teksLoading.style.display = 'none';
        tombolKirim.disabled = false;
    }
});

// Fungsi reset form
function resetForm() {
    // Reset rating untuk kategori yang sedang dipilih saja
    const kategoriSekarang = selectKategori.value;
    if (semuaRating[kategoriSekarang]) {
        delete semuaRating[kategoriSekarang];
    }
    
    // Reset tampilan bintang
    stars.forEach(star => star.classList.remove('active'));
    
    // Reset komentar
    commentInput.value = "";
    
    console.log("Form berhasil direset untuk kategori:", kategoriSekarang);

}