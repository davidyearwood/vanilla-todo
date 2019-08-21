import taskFormView from './taskFormView.js';
import createElement from '../utils/createElement.js';

export default function taskEditFormView(props) {
  let form = taskFormView(props);
  let fragment = document.createDocumentFragment();

  fragment.appendChild(
    createElement(
      'button',
      {
        class: 'task-form__button',
        'data-action': 'update',
        'data-for': props.id,
        'data-type': 'form'
      },
      'Save'
    )
  );

  fragment.appendChild(
    createElement(
      'button',
      {
        class: 'task-form__button',
        'data-action': 'cancel',
        'data-for': props.id,
        'data-type': 'form'
      },
      'Cancel'
    )
  );

  fragment.appendChild(
    createElement(
      'button',
      {
        class: 'task-form__button',
        'data-action': 'delete',
        'data-for': props.id,
        'data-type': 'form'
      },
      'Delete'
    )
  );

  form.appendChild(fragment);

  return form;
}
