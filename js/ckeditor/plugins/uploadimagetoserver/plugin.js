CKEDITOR.plugins.add('uploadimagetoserver', {
    icons: 'uploadimagetoserver',
    init: function (editor) {
        var config = editor.config;
        var api = config.uploadimagetoserverApi
        //Plugin logic goes here.
        editor.ui.addButton('uploadimagetoserver', {
            label: 'Upload Image',
            command: 'insertImage',
            toolbar: 'insert,100'
        });

        editor.addCommand('insertImage', {
            exec: function (editor) {
                $("body")
                    .append(`<form id="frmUploader"><input type="file" onchange="selectFile('${api}')" style="display: none;" accept="image/png, image/gif, image/jpeg" id="inptCustomUploader"/></form>`)
                $("#inptCustomUploader").click();
            }
        });

        
    }

});
function selectFile(api) {
    var input = document.getElementById("inptCustomUploader");
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }

    var editor = CKEDITOR.instances.editor;
    $.ajax(
        {
            url: api,
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                editor.insertHtml(`<figure class="easyimage easyimage-full"><img alt="" src="${data}"/><figcaption></figcaption></figure > `);
                $("#frmUploader").remove();
            },
            error: function (data) {
                alert("error")
            }
        }
    );




}