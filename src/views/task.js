import createElement from '../utils/createElement.js';

export function TaskComponent(props) {
  const { id, title, description } = props;

  return createElement(
    'section',
    {
      class: 'task',
      id: `task-${id}`,
      'data-id': id,
      'data-type': 'task',
      draggable: true
    },
    [
      createElement('h1', { class: 'task__title', 'data-for': id }, title),
      createElement(
        'p',
        { class: 'task__description', 'data-for': id },
        description
      )
    ]
  );
}

export function TaskFormComponent(props) {
  let { id, title, description } = props;

  return createElement(
    'form',
    {
      class: 'task-form',
      'data-id': id,
      'data-type': 'form',
      id: `task-form-${id}`,
      draggable: true
    },
    [
      createElement('label', { for: `task-form-title-${id}` }, 'Title'),
      createElement('input', {
        type: 'text',
        class: 'task-form__input',
        id: `task-form-title-${id}`,
        value: title || '',
        name: 'title'
      }),
      createElement(
        'label',
        {
          for: `task-form-descrpition-${id}`
        },
        'Description'
      ),
      createElement('input', {
        type: 'text',
        class: 'task-form__input',
        id: `task-form-description-${id}`,
        value: description || '',
        name: `description`
      })
    ]
  );
}

export function TaskEditFormComponent(props) {
  let form = TaskFormComponent(props);
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

export function TaskCreateFormComponent(props) {
  let form = TaskFormComponent(props);
  let fragment = document.createDocumentFragment();

  fragment.appendChild(
    createElement(
      'button',
      {
        class: 'task-form__button',
        'data-action': 'create',
        'data-for': props.id,
        'data-type': 'form'
      },
      'Create'
    )
  );

  form.appendChild(fragment);

  return form;
}

export default {
  content: TaskComponent,
  editForm: TaskEditFormComponent,
  createForm: TaskCreateFormComponent
};
