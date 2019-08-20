import taskView from './taskView.js';
import taskFormView from './taskFormView.js';

function TaskFactory(props) {
  return {
    element: taskView(props),
    form: taskFormView(props)
  };
}
