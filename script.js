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

    