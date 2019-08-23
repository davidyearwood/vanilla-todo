export function task(props) {
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

function taskFormBoiler(props) {
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
