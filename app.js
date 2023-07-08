const form = document.getElementById("generate");
const qrcode = document.getElementById("qrcode");

const onSubmit = (e) => {
  e.preventDefault();

  clear();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  console.log(url, size);

  if (!url) {
    alert("Por favor insira uma URL");
    return;
  }
  showSpinner();

  setTimeout(() => {
    hideSpinner();

    generateQRCode(url, size);

    setTimeout(() => {
      const saveUrl = qrcode.querySelector("img").src;
      createSaveBtn(saveUrl);
    }, 50);
  }, 1000);
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clear = () => {
  qrcode.innerHTML = "";
  const link = document.getElementById("save-link");
  if (link) {
    link.remove();
  }
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = "btn-download";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Download";

  document.getElementById("qrcode-container").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onSubmit);
