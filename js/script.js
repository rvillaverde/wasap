const message = {
  phone: undefined,
  text: "",
};

const URL = "https://api.whatsapp.com/send";

const handleChange = (field, validateFn) => (e) => {
  const value = e.target.value;

  if (validateFn(value)) {
    message[field] = value;
    toggleSubmitButton();
  }
};

const validateText = (value) => {
  console.log("validate text", value);
  return !!value && !!value.length;
};

const validatePhone = (value) => {
  return !!value && !isNaN(value);
};

const toggleSubmitButton = () => {
  console.log("toggle submit", !!message.text && message.text.length);
  document.getElementById("submit-button").disabled =
    !message.text || message.text.length === 0 || !message.phone;
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("handle submit", buildUrl());
  window.open(buildUrl(), "_blank");
};

const buildUrl = () => `${URL}?phone=${message.phone}&text=${message.text}`;

document.getElementById("form").addEventListener("submit", handleSubmit);
document
  .getElementById("phone")
  .addEventListener("change", handleChange("phone", validatePhone));
document
  .getElementById("text")
  .addEventListener("change", handleChange("text", validateText));
