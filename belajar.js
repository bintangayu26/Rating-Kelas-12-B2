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

const SCRIPT_URL ='https://script.google.com/macros/s/AKfycbxOSC6aMuWGcjsLFHYsuNiWWv6fNiORqBgnmztaEHk1jeWxL_vo9041uJhqkW5MdbXuew/exec'; 

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
        
        // Kirim ke Google Apps Script
        const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
  body: JSON.stringify(dataKirim)
});
        
        // Tunggu response
        const result = await response.json();
        console.log("Response:", result);
        
        if (result.status === "success") {
            alert(`✅ TERIMA KASIH!\n\nRating ${ratingSekarang}/5 berhasil dikirim.\nRata-rata semua rating: ${result.rataRata}`);
            
            // Reset form
            semuaRating = {};
            stars.forEach(star => star.classList.remove('active'));
            document.getElementById('comment').value = "";
            
            // Reset checkbox anonim
            if (anonCheckbox.checked) {
                anonCheckbox.checked = false;
                nameInput.disabled = false;
                nameInput.value = "";
                nameInput.style.opacity = '1';
            }
            
        } else {
            throw new Error(result.message);
        }
        
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Gagal mengirim. Error: " + error.message);
    } finally {
        // Reset tombol
        teksKirim.style.display = 'inline';
        teksLoading.style.display = 'none';
        tombolKirim.disabled = false;
    }
    

});
