---
title: XML to CellSV
menu: 
    main:
        weight: 10
---
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"> -->
<link href="https://unpkg.com/filepond@^4/dist/filepond.css" rel="stylesheet" />
<script src="https://unpkg.com/filepond@^4/dist/filepond.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9.17.2/dist/sweetalert2.all.min.js"></script>

<script src="../xml2json.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<link href="../style.css" rel="stylesheet">

<input type="file" 
       class="filepond"
       name="filepond"
       multiple
       data-max-file-size="20MB"
       data-max-files="25" />

<button class='buttono' onclick="convert()" id="convertBtn">Convert
</button>
<!-- <div id="spinner" class="fa"><i class="fas fa-spinner fa-spin"></i></div> -->

<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
<script src="../script.js"></script>
<script>
    function processFile(upload) {
        console.debug(upload)
        // create the file reader
        let reader = new FileReader()
        // prepare the download name
        let downloadName = replaceExtension(upload.name, 'tsv')

        reader.readAsText(upload)

        reader.addEventListener("load", () => {
            let result = convert2csv(reader.result)
            if (result != null) {
                saveData(str2blob(result), downloadName)
            }
        }, false)
    }

    function convert2csv(xml) {
        let x2js = new X2JS()
        let json = x2js.xml_str2json(xml)
        if(json==null){ 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong parsing the XML!',
                footer: '<a href="/errors">Why do I have this issue?</a>'
            })
            return null
        }
        let X = JSON.stringify(json, null, 4)
        // console.debug(X)

        // convert to csv
        // replace the indentation with a cell
        X = X.replace(/[ ]{4}/g, "\t");
        // replace the quotations with numerals, and put the value in a cell
        X = X.replace(/\"(.*?)\"/g, "#\t$1\t#");

        return X
    }
</script>