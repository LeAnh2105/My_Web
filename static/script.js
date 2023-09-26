function processImage(event) {
    var imagePreview = document.getElementById('imagePreview');
    var originalImage = document.getElementById('originalImage');
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var img = new Image();
            img.src = e.target.result;

            img.onload = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var data = imageData.data;

                for (var i = 0; i < data.length; i += 4) {
                    var grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = grayscale;
                    data[i + 1] = grayscale;
                    data[i + 2] = grayscale;
                }

                ctx.putImageData(imageData, 0, 0);
                imagePreview.src = canvas.toDataURL('image/jpeg');
                imagePreview.style.display = 'block';
                originalImage.src = e.target.result; // Hiển thị ảnh gốc
                originalImage.style.display = 'block';
            };
        };

        reader.readAsDataURL(file);
    }
}

// Gắn sự kiện onchange cho input file
var fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', processImage);
