document.addEventListener("DOMContentLoaded", function () {
  //bagian Nopal
    function konfirmasiAction(selector, pesan, pesanSukses = null) {
      const buttons = document.querySelectorAll(selector);

      buttons.forEach(function(button) {
          button.addEventListener("click", function (event) {

              const konfirmasi = confirm(pesan);

              if (!konfirmasi) {
                  event.preventDefault();
              } else if (pesanSukses) {
                  alert(pesanSukses);
              }
          });
      });
  }

  konfirmasiAction(".btn-delete", "Apakah Anda yakin ingin menghapus data ini?", "Data berhasil dihapus");
  konfirmasiAction(".btn-edit", "Apakah Anda yakin ingin mengedit data ini?");
  
  //bagian ucup
  const form = document.querySelector(".form-body");
  const perihal = document.getElementById("perihal");
  const berkas = document.getElementById("berkasPendukung");
  //bagian faiz
  const pengusul = document.getElementById("pengusul");
  const waktuPelaksana = document.getElementById("waktuPelaksana");
  //bagian Nopal
  const lamaPelaksanaan = document.getElementById("lamaPelaksanaan");

  //bagian ucup
  let perihalError = document.createElement("span");
  perihalError.className = "error-msg";
  perihal.parentNode.appendChild(perihalError);

  let berkasError = document.createElement("span");
  berkasError.className = "error-msg";
  berkas.parentNode.appendChild(berkasError);

  //bagian faiz
  const pengusulError = document.createElement("span");
  pengusulError.className = "error-msg";
  pengusul.parentNode.appendChild(pengusulError);

  const waktuError = document.createElement("span");
  waktuError.className = "error-msg";
  waktuPelaksana.parentNode.appendChild(waktuError);

  //bagian Nopal
  const lamaError = document.createElement("span");
  lamaError.className = "error-msg";
  lamaPelaksanaan.parentNode.appendChild(lamaError);
  
  //bagian ucup
  // validasi perihal
  function validatePerihal() {
    if (perihal.value.trim() === "") {
      perihalError.textContent = "Perihal harus diisi.";
      return false;
    } else if (perihal.value.trim().length < 10) {
      perihalError.textContent = "Perihal minimal 10 karakter.";
      return false;
    } else {
      perihalError.textContent = "";
      return true;
    }
  }

  // validasi upload berkas
  function validateBerkas() {
    if (berkas.files.length === 0) {
      berkasError.textContent = "Berkas Pendukung harus diunggah.";
      return false;
    } else {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      const file = berkas.files[0];

      if (!allowedTypes.includes(file.type)) {
        berkasError.textContent = "Format file harus PDF, JPG, atau PNG.";
        return false;
      } else if (file.size > maxSize) {
        berkasError.textContent = "Ukuran file maksimal 5 MB.";
        return false;
      } else {
        berkasError.textContent = "";
        return true;
      }
    }
  }
  
  //bagian faiz
  // Validasi Nama Pengusul (Hanya Huruf, Tidak Boleh Kosong)
  function validatePengusul() {
    const val = pengusul.value.trim();
    const regexHuruf = /^[a-zA-Z\s]*$/; 

    if (val === "") {
      pengusulError.textContent = "Nama pengusul tidak boleh kosong.";
      return false;
    } else if (!regexHuruf.test(val)) {
      pengusulError.textContent = "Nama hanya boleh berisi huruf abjad.";
      return false;
    } else {
      pengusulError.textContent = "";
      return true;
    }
  }

  // Validasi Waktu Pelaksana (Tidak Boleh Kosong)
  function validateWaktu() {
    if (waktuPelaksana.value === "") {
      waktuError.textContent = "Waktu pelaksana harus dipilih.";
      return false;
    } else {
      waktuError.textContent = "";
      return true;
    }
  }

  //Bagian Nopal
  //Validasi Lama Pelaksanaan
  function validateLamaPelaksanaan() {
    const val = lamaPelaksanaan.value.trim();

    if (val === "") {
      lamaError.textContent = "Lama pelaksanaan tidak boleh kosong.";
      return false;
    }

    const angka = parseInt(val);

    if (isNaN(angka)) {
      lamaError.textContent = "Lama pelaksanaan harus berupa angka.";
      return false;
    } else if (angka < 1) {
      lamaError.textContent = "Minimal lama pelaksanaan adalah 1 hari.";
      return false;
    } else {
      lamaError.textContent = "";
      return true;
    }
  }
  
  //bagian ucup
  perihal.addEventListener("input", validatePerihal);
  berkas.addEventListener("change", validateBerkas);

  //bagian faiz
  pengusul.addEventListener("input", validatePengusul);
  waktuPelaksana.addEventListener("change", validateWaktu);

  //bagian Nopal
  lamaPelaksanaan.addEventListener("input", validateLamaPelaksanaan);
  lamaPelaksanaan.addEventListener("blur", function () {
    let angka = parseInt(lamaPelaksanaan.value);

    if (!isNaN(angka) && angka > 0) {
      lamaPelaksanaan.value = angka + " hari";
    }
  });

  // Update Event Listener Submit (Tambahkan e.preventDefault agar validasi berfungsi penuh)
    form.addEventListener("submit", function (e) {
      const isPengusulValid = validatePengusul();
      const isWaktuValid = validateWaktu();
      const isLamaValid = validateLamaPelaksanaan();
      const isPerihalValid = validatePerihal();
      const isBerkasValid = validateBerkas();
  
      if (!isPengusulValid || !isWaktuValid || !isLamaValid || !isPerihalValid || !isBerkasValid) {
        e.preventDefault();
        alert("Mohon periksa kembali form Anda.");
      }
    });
  });

