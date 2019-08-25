import createElement from '../utils/createElement.js';

export function BucketComponent(props) {
  const {
    id,
    title
  } = props;

  return createElement(
    'section', {
      class: 'bucket',
      id: `bucket-${id}`,
      'data-id': id,
      'data-type': 'bucket'
    }
  );
}

export function BucketFormComponent(props) {
  let {
    id,
  } = props;

  return createElement(
    'form', {
      class: 'bucket-form',
      'data-id': id,
      'data-type': 'form',
      id: `bucket-form-${id}`,
    }, [
      createElement('label', {
        for: `bucket-form-title-${id}`
      }, 'Title'),
      createElement('input', {
        type: 'text',
        class: 'bucket-form__input',
        id: `bucket-form-title-${id}`,
        value: '',
        name: 'title'
      }),

      createElement(
        'button', {
          class: 'task-form__button',
          'data-action': 'create-bucket',
          'data-for': props.id,
          'data-type': 'form',
          type: 'button'
        },
        'Create Bucket'
      )

    ]
  );
}