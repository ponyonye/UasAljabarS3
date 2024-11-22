var image = null;

const dragArea = document.querySelector(".drag-area");
const button = document.getElementById("btn");
const buttongs = document.getElementById("gs-btn");
const input = document.getElementById("finput");

button.addEventListener("click", () => {
  input.click();
});

dragArea.addEventListener("dragover", (event) => {
  event.preventDefault(); // Mencegah perilaku default
  dragArea.classList.add("drag-over"); // Tambahkan efek
});

dragArea.addEventListener("dragleave", () => {
  dragArea.classList.remove("drag-over"); // Hilangkan efek
});

dragArea.addEventListener("drop", (event) => {
  event.preventDefault(); // Mencegah perilaku default
  dragArea.classList.remove("drag-over"); // Hilangkan efek
  const files = event.dataTransfer.files; // Ambil file

  if (files.length > 0 && files[0].type.match(/image.*/)) {
    const inputFile = files[0];

    // Buat URL blob untuk file
    const fileURL = URL.createObjectURL(inputFile);

    // Gunakan URL blob untuk membuat SimpleImage
    image = new SimpleImage(fileURL);

    // Gambarkan gambar ke kanvas
    var canvas = document.getElementById("can");
    image.drawTo(canvas);

    // Tampilkan kontainer kanvas (jika sebelumnya tersembunyi)
    document.querySelector(".canvas-container").style.display = "flex";
    document.querySelector(".input-container").style.display = "none";
  } else {
    alert("File yang Anda pilih bukan gambar");
  }
});

function onupload() {
  dragArea.style.display = "none";
  document.querySelector(".input-container").style.display = "none";

  // Dapatkan input dari file
  var fileinput = document.getElementById("finput");

  console.log(fileinput.files[0]);
  // Buat gambar baru dari input file
  image = new SimpleImage(fileinput);
  // Dapatkan elemen kanvas
  var canvas = document.getElementById("can");
  // Gambarkan gambar di kanvas
  image.drawTo(canvas);

  document.querySelector(".canvas-container").style.display = "flex";
}

function gri() {
  // Iterasi setiap piksel gambar
  button.setAttribute("disabled", true);
  for (var pixel of image.values()) {
    // Hitung rata-rata RGB
    var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

    // Tetapkan nilai grayscale ke setiap komponen RGB
    pixel.setRed(average);
    pixel.setGreen(average);
    pixel.setBlue(average);
  }

  console.log("process done");

  // Tampilkan gambar baru di kanvas
  var canvas = document.getElementById("can");
  image.drawTo(canvas);

  button.removeAttribute("disabled");
}
