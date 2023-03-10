const URL = "https://api.whatsapp.com/send";

const message = {
  phone: undefined,
  text: "",
};

Object.getPrototypeOf(message).isValid = () =>
  !!message.phone &&
  !isNaN(message.phone) &&
  Number.isInteger(Number(message.phone));

const getElementById = (id) => document.getElementById(id);

const clearButton = getElementById("clear-button");
const copyButton = getElementById("copy-button");
const copyLinkParagraph = getElementById("copy-link");
const form = getElementById("form");
const phoneInput = getElementById("phone");
const submitButton = getElementById("submit-button");
const textInput = getElementById("text");

const infoIcon = getElementById("info-icon");
const infoMessage = getElementById("info-message");
const closeInfoButton = getElementById("close-info-button");

/* Handlers */
const handleChange = (field) => (e) => {
  const value = e.target.value;
  message[field] = value;
  toggleSubmitButton();
};

const handleClear = () => {
  message.text = "";
  textInput.value = "";
  textInput.focus();
};

const toggleSubmitButton = () => {
  submitButton.disabled = !message.isValid();
  copyButton.disabled = !message.isValid();
};

const handleCopy = () => {
  if (message.isValid()) {
    return navigator.clipboard.writeText(buildUrl()).then(
      () => {
        copyLinkParagraph.classList.add("confirm");
        setTimeout(() => copyLinkParagraph.classList.remove("confirm"), 2000);
      },
      () => console.log("Failed to copy message")
    );
  }

  console.log("Failed to copy message: phone is not valid.");
};

const handleSubmit = (e) => {
  e.preventDefault();
  window.open(buildUrl(), "_blank");
};

function handleOpenInfo() {
  infoMessage.classList.add("open");
}

function handleCloseInfo() {
  infoMessage.classList.remove("open");
}

/* Helpers */
const buildUrl = () =>
  `${URL}?phone=${message.phone}&text=${encodeURIComponent(
    message.text || ""
  )}`;

const documentHeight = () =>
  document.documentElement.style.setProperty(
    "--doc-height",
    `${window.innerHeight}px`
  );

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(() => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

form.addEventListener("submit", handleSubmit);
phoneInput.addEventListener("input", handleChange("phone"));
textInput.addEventListener("input", handleChange("text"));
copyButton.addEventListener("click", handleCopy);
clearButton.addEventListener("click", handleClear);

infoIcon.addEventListener("click", handleOpenInfo);
closeInfoButton.addEventListener("click", handleCloseInfo);

window.addEventListener("resize", documentHeight);
documentHeight();
