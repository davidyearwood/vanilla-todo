import taskView from './taskView.js';
import taskFormView from './taskFormView.js';

export default function taskViewFactory(props) {
  let tv = taskView(props);
  let form = props.form ? props.form(props) : taskFormView(props);
  return {
    id: props.id,
    get: () => tv,
    getForm: () => form
  };
}
