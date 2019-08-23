export default function clearFormValues(form) {
  Array.prototype.forEach.call(form.children, child => {
    if (child.value) {
      child.value = '';
    }
  });
}