export default function getFormValues(form) {
  let values = {};
  Array.prototype.forEach.call(form.children, child => {
    let value = child.value;
    if (value) {
      values[child.name] = value;
    }
  });

  return values;
}
