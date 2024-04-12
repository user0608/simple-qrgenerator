const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const qrtexto = document.getElementById("qrtexto");

const generarQR = (texto, size) => {
  if (texto === "") {
    alert("Please enter a URL");
  } else {
    setTimeout(() => {
      generateQRCode(texto, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
      }, 50);
    }, 100);
  }
};

const container = document.getElementById("list-items");
const unselectAllItems = () => {
  const items = document.getElementsByClassName("text-item");
  if (items == null) return;
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("bg-red-100");
  }
};

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();
  const texto = document.getElementById("url").value;
  const itm = document.createElement("li");
  itm.classList.add("item");
  itm.classList.add("text-item");
  itm.classList.add("list-disc");
  itm.classList.add("list-inside");
  itm.classList.add(
    "active:bg-gray-200",
    "shadow-sm",
    "overflow-hidden",
    "relative",
    "font-mono",
    "px-2"
  );
  itm.innerText = texto;
  itm.addEventListener("click", ({ target }) => {
    unselectAllItems();
    target.classList.add("bg-red-100");
    clearUI();
    generarQR(target.textContent, 300);
  });
  unselectAllItems();
  itm.classList.add("bg-red-100");
  container.appendChild(itm);
  container.scrollTop = container.scrollHeight - container.clientHeight;
  const size = 300;
  generarQR(texto, size);
  document.getElementById("url").value = "";
  // Validate url
};

// Generate QR code
const generateQRCode = (texto, size) => {
  qrtexto.innerText = texto;
  const qrcode = new QRCode("qrcode", {
    text: texto,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
