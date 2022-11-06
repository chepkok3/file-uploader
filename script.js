const dropArea = document.querySelector(".wrapper");
dragText = dropArea.querySelector("h1");
button = dropArea.querySelector("button");
input = dropArea.querySelector("input");
let file; //global variable for multiple functions

button.onclick = () => {
  input.click(); //whenever the user clicks the button, the input is also clicked
};

input.addEventListener("change", function () {
  //first file is only selected
  file = this.files[0];
  dropArea.classList.add("active");
  showFile();
});

//whenever the use drags the file over the DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //prevent from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//when the user leaves dragged file from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//when user drops a file on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //stopping default behavior
  //ensure selection of one file at a time
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile() {
  let fileType = file.type; //accessing selected type of file
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  //incorporating image extensions in array
  if (validExtensions.includes(fileType)) {
    //in case selected file is an image
    let fileReader = new FileReader(); //developing new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file sourse in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`; //
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("Not an image file!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
