    //Nopal
    const deleteButtons = document.querySelectorAll(".btn-delete");
    const editButtons = document.querySelectorAll(".btn-edit");
    const clearButtons = document.querySelectorAll(".btn-clear");
    const submitButtons = document.querySelectorAll(".btn-submit");

    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function () {
            
            const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data ini?");

            if(!konfirmasi){
                event.preventDefault();
            } else {
                alert("Data berhasil hihapus");
            }
            
        });
    });

    editButtons.forEach(function(button) {
        button.addEventListener("click", function (){

            const konfirmasi = confirm("Apakah Anda yakin ingin mengedit data ini?");

            if(!konfirmasi){
                event.preventDefault();
            }
        });
    });

    clearButtons.forEach(function(button) {
        button.addEventListener("click", function (){

            const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data pada form ini?");

            if(!konfirmasi){
                event.preventDefault();
            }
        });
    });

    submitButtons.forEach(function(button) {
        button.addEventListener("click", function (){

            const konfirmasi = confirm("Apakah data yang anda isi sudah benar?");

            if(!konfirmasi){
                event.preventDefault();
            }
        });
    });
    //Nopal


document.addEventListener("DOMContentLoaded", function () {
  //bagian ucup
  const form = document.querySelector(".form-body");
  const perihal = document.getElementById("perihal");
  const berkas = document.getElementById("berkasPendukung");
  //bagian faiz
  const pengusul = document.getElementById("pengusul");
  const waktuPelaksana = document.getElementById("waktuPelaksana");

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
  
  //bagian ucup
  perihal.addEventListener("input", validatePerihal);
  berkas.addEventListener("change", validateBerkas);

  //bagian faiz
  pengusul.addEventListener("input", validatePengusul);
  waktuPelaksana.addEventListener("change", validateWaktu);

  // Update Event Listener Submit (Tambahkan e.preventDefault agar validasi berfungsi penuh)
    form.addEventListener("submit", function (e) {
      const isPengusulValid = validatePengusul();
      const isWaktuValid = validateWaktu();
      const isPerihalValid = validatePerihal();
      const isBerkasValid = validateBerkas();
  
      if (!isPengusulValid || !isWaktuValid || !isPerihalValid || !isBerkasValid) {
        e.preventDefault();
        alert("Mohon periksa kembali form Anda.");
      }
    });
  });

