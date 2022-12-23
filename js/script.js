const message = {
  phone: undefined,
  text: "",
};

const URL = "https://api.whatsapp.com/send";

const handleChange = (field) => (e) => {
  const value = e.target.value;
  message[field] = value;
  toggleSubmitButton();
};

const toggleSubmitButton = () => {
  document.getElementById("submit-button").disabled =
    !message.phone || isNaN(message.phone);
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
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

const documentHeight = () =>
  document.documentElement.style.setProperty(
    "--doc-height",
    `${window.innerHeight}px`
  );

document.getElementById("form").addEventListener("submit", handleSubmit);
document
  .getElementById("phone")
  .addEventListener("keyup", handleChange("phone"));
document
  .getElementById("phone")
  .addEventListener("change", handleChange("phone"));
document.getElementById("text").addEventListener("keyup", handleChange("text"));
document
  .getElementById("text")
  .addEventListener("change", handleChange("text"));

window.addEventListener("resize", documentHeight);
documentHeight();
