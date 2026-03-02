document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-body");
  const perihal = document.getElementById("perihal");
  const berkas = document.getElementById("berkasPendukung");

  let perihalError = document.createElement("span");
  perihalError.className = "error-msg";
  perihal.parentNode.appendChild(perihalError);

  let berkasError = document.createElement("span");
  berkasError.className = "error-msg";
  berkas.parentNode.appendChild(berkasError);

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

  perihal.addEventListener("input", validatePerihal);
  berkas.addEventListener("change", validateBerkas);

  form.addEventListener("submit", function (e) {
    validatePerihal();
    validateBerkas();
  });
});
