---
title: CellSV to XML
menu: 
    main:
        weight: 20
---
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"> -->
<link href="https://unpkg.com/filepond@^4/dist/filepond.css" rel="stylesheet" />
<script src="https://unpkg.com/filepond@^4/dist/filepond.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9.17.2/dist/sweetalert2.all.min.js"></script>

<script src="../xml2json.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<link href="../style.css" rel="stylesheet" />
<link href="../accordion.css" rel="stylesheet" />

<input type="file" 
       class="filepond"
       name="filepond"
       multiple
       data-max-file-size="20MB"
       data-max-files="25" />

</br>

<div class="tabs">
  <div class="tab">
    <input class='accordion' type="checkbox" id="chck1">
    <label class="tab-label" for="chck1">Advanced Options</label>
    <div class="tab-content">
      <form>
          <label for="extension">Extension Name:</label>
            <input class='option-input' type="text" value="xml" id="extension" name="extension" maxlength="8" size="10">
      </form>
    </div>
  </div>
</div>

</br>

<button class='buttono' onclick="convert()" id="convertBtn">Convert
</button>
<!-- <div id="spinner" class="fa"><i class="fas fa-spinner fa-spin"></i></div> -->

<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
<script src="../script.js"></script>
<script src="../vkbeautify.js"></script>
<script>
    function processFile(upload) {
        console.debug(upload)
        // create the file reader
        let reader = new FileReader()
        // prepare the download name
        let extension = document.getElementById("extension").value
        let downloadName = replaceExtension(upload.name, extension)

        reader.readAsText(upload)

        reader.addEventListener("load", () => {
            let header = '<?xml version="1.0"?>\n'
            let result = convert2xml(reader.result)
            if (result != null) {
                saveData(str2blob(header + result), downloadName)
            }
        }, false)
    }

    function convert2xml(csv) {
        
        // convert to json
        // replace the quotations with numerals, and put the value in a cell
        csv = csv.replace(/#\t(.*?)\t#/g, '"$1"');
        // replace the indentation with a cell
        let json = csv.replace(/\t/g, "    ");

        json = JSON.parse(json)

        let x2js = new X2JS()
        let xml = x2js.json2xml_str(json)
        
        if(xml==null){ 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong parsing the CSV!',
                footer: '<a href="/errors">Why do I have this issue?</a>'
            })
            return null
        }

        // console.debug(xml)
        xml = vkbeautify.xml(xml)
        // xml = xml.replace(/&quot;/g, '"');
        return xml
    }
</script>