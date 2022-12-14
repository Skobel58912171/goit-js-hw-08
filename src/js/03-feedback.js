import throttle from 'lodash.throttle';
const ref = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
// console.log(ref.form);
// console.log(ref.textarea);
// console.log(ref.inputEmail);
const STORAGE_KEY = 'feedback-form-state';

ref.form.addEventListener('submit', onSubmit);
ref.form.addEventListener('input', throttle(onInput, 500));
populateForm();

function onSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  const formObject = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  console.log(formObject);
  localStorage.removeItem(STORAGE_KEY);
}
function onInput(evt) {
  const user = {
    email: ref.inputEmail.value,
    message: ref.textarea.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function populateForm() {
  // try {
  const saveFormFields = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saveFormFields) {
    ref.inputEmail.value = saveFormFields.email;
    ref.textarea.value = saveFormFields.message;
  }
}
