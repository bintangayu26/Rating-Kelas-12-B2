//anonim
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

const SCRIPT_URL ='https://script.google.com/macros/s/AKfycbx37pU9qk1reFeHaXYcTPEbe24vufTsxhI_9NvfPB9iGBMUK-roztTx63vBgxiuJy3_xg/exec'; 

// fetch('https://script.google.com/macros/s/AKfycbx37pU9qk1reFeHaXYcTPEbe24vufTsxhI_9NvfPB9iGBMUK-roztTx63vBgxiuJy3_xg/exec', {
//  method: 'POST',
//  headers: {'Content-Type': 'application/json'},
//  body: JSON.stringify({nama: 'Test', kategori: 'Alur Cerita', rating: 5, komentar: 'Test', semuaRating: '{}', timestamp: new Date().toLocaleString('id-ID')})
//}).then(r => r.json()).then(d => console.log(d)).catch(e => console.error(e));

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
    });
});

// Saat kategori berubah
selectKategori.addEventListener('change', function() {
    const kategori = this.value;
    const rating = semuaRating[kategori] || 0;
    
    // Update tampilan bintang
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
});

// Tombol kirim
const tombolKirim = document.getElementById('submit-btn');
const teksKirim = document.getElementById('submit-text');
const teksLoading = document.getElementById('loading-text');

tombolKirim.addEventListener('click', async function() {
    // Validasi
    const kategoriSekarang = selectKategori.value;
    const ratingSekarang = semuaRating[kategoriSekarang];
    
    if (!ratingSekarang) {
        alert("❌ Harap beri rating terlebih dahulu!");
        return;
    }
    
    // Tampilkan loading
    teksKirim.style.display = 'none';
    teksLoading.style.display = 'inline';
    tombolKirim.disabled = true;
    
    try {
        // Siapkan data
        const dataKirim = {
            nama: nameInput.value || 'Anonim',
            kategori: kategoriSekarang,
            rating: ratingSekarang,
            komentar: document.getElementById('comment').value || '',
            semuaRating: JSON.stringify(semuaRating),
            timestamp: new Date().toLocaleString('id-ID')
        };
        
        console.log("Mengirim:", dataKirim);
        
       const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // INI PENTING untuk Google Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataKirim)
        });
        
        // Tunggu 2 detik (simulasi proses)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Karena mode 'no-cors', kita tidak bisa baca response
        // Tampilkan pesan sukses
        alert(`✅ TERIMA KASIH!\nRating ${ratingSekarang}/5 berhasil dikirim.`);
        
        // Reset form
        resetForm();
        
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Gagal mengirim. Error: ' + error.message);
    } finally {
        // Reset tombol
        teksKirim.style.display = 'inline';
        teksLoading.style.display = 'none';
        tombolKirim.disabled = false;
    }
});

// ===== FUNGSI RESET FORM =====
function resetForm() {
    // Hapus rating untuk kategori saat ini
    const kategoriSekarang = selectKategori.value;
    if (semuaRating[kategoriSekarang]) {
        delete semuaRating[kategoriSekarang];
    }
    
    // Reset bintang
    stars.forEach(star => star.classList.remove('active'));
    
    // Reset komentar
    commentInput.value = '';
    
    console.log('Form direset');
}

// ===== INITIALIZE =====
console.log('Aplikasi Rating siap digunakan!');
console.log('Script URL:', SCRIPT_URL);

