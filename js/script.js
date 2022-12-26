const message = {
  phone: undefined,
  text: "",
};

Object.getPrototypeOf(message).isValid = () =>
  !!message.phone &&
  !isNaN(message.phone) &&
  Number.isInteger(Number(message.phone));

const URL = "https://api.whatsapp.com/send";

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

const buildUrl = () =>
  `${URL}?phone=${message.phone}&text=${encodeURIComponent(
    message.text || ""
  )}`;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(() => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

const documentHeight = () =>
  document.documentElement.style.setProperty(
    "--doc-height",
    `${window.innerHeight}px`
  );

const clearButton = document.getElementById("clear-button");
const copyButton = document.getElementById("copy-button");
const copyLinkParagraph = document.getElementById("copy-link");
const form = document.getElementById("form");
const phoneInput = document.getElementById("phone");
const submitButton = document.getElementById("submit-button");
const textInput = document.getElementById("text");

form.addEventListener("submit", handleSubmit);
phoneInput.addEventListener("input", handleChange("phone"));
textInput.addEventListener("input", handleChange("text"));
copyButton.addEventListener("click", handleCopy);
clearButton.addEventListener("click", handleClear);

window.addEventListener("resize", documentHeight);
documentHeight();
