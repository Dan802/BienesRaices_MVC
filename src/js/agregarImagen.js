import { Dropzone } from "dropzone";

// Si requerimos enviar un token:
// const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

// .imagen = id del form 
Dropzone.options.imagen  = {
    dictDefaultMessage: 'Drop files here to upload',
    acceptedFiles: "image/*",
    maxFilesize: 5,     //5mb
    maxFiles: 1,    // 1 archivo
    parallelUploads: 1,
    autoProcessQueue: false, // se procesan al darle aceptar
    addRemoveLinks: true,
    dictRemoveFile: 'Delete File',
    dictMaxFilesExceeded: 'The limit is 1 file',
    headers: {
        // 'CSRF-Token': token
    },
    paramName: 'imagen',
    init: function() {

        const dropzone = this
        const btnPublicar = document.querySelector('#publicar')

        // Cuando el usuario de click en publicar llamamos a dropzone
        btnPublicar.addEventListener('click', function() {
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function() {
            if(dropzone.getActiveFiles().length == 0) {
                window.location.href = '/my-properties'
            }
        })

        dropzone.on('error', function(file, message) {
            console.log(file)
            console.log(message)
        })
    }
}