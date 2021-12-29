const str2blob = txt => new Blob([txt]);
const timer = ms => new Promise(res => setTimeout(res, ms))

function saveData(blob, fileName) { // does the same as FileSaver.js
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

function replaceExtension(name, extension) {
    return name.substring(0, name.lastIndexOf('.')) + '.' + extension
}

// Get a reference to the file input element
const inputElement = document.querySelector('input[type="file"]');

// Create a FilePond instance
const pond = FilePond.create(inputElement);


async function convert() {
        document.getElementById('convertBtn').disabled = true
        // document.getElementById('spinner').style.display = 'inline-block'

        console.debug(pond.getFiles())
        for (var i = pond.getFiles().length - 1; i >= 0; i--) {
            console.debug(pond.getFile(i).file.name)
            processFile(pond.getFile(i).file)
            await timer(500)
            pond.removeFile(i)
        }

        document.getElementById('convertBtn').disabled = false
        // document.getElementById('spinner').style.display = 'none'
    }