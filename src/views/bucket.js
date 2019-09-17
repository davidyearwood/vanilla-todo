import taskCreator from './task.js';
import createElement from '../utils/createElement.js';
import ID from '../utils/ID.js';

export function BucketComponent(props) {
  const { id, title } = props;

  let container = createElement('section', {
    class: `bucket bucket-${id}`,
    id: id,
    'data-id': id,
    'data-type': 'bucket'
  });

  let h1 = createElement(
    'h1',
    {
      class: 'bucket__title',
      'data-action': 'get-bucket-title-form',
      'data-id': ID()
    },
    title
  );

  let form = taskCreator.createForm({
    id: ID(),
    dataFor: id
  });

  let dropzone = createElement('section', {
    class: 'tasks-list dropzone',
    'data-for': id
  });

  container.appendChild(h1);
  container.appendChild(form);
  container.appendChild(dropzone);

  return container;
}

export function BucketTitleFormComponent(props) {
  let { id, title } = props;

  return createElement(
    'form',
    {
      class: 'bucket-form',
      'data-id': id,
      'data-type': 'form',
      id: `bucket-form-${id}`
    },
    [
      createElement(
        'label',
        {
          for: `bucket-form-title-${id}`
        },
        'Title'
      ),
      createElement('input', {
        type: 'text',
        class: 'bucket-form__input',
        id: `bucket-form-title-${id}`,
        value: title,
        name: 'title'
      }),
      createElement(
        'button',
        {
          class: 'bucket-form__button',
          'data-action': 'update-bucket-title',
          'data-for': props.id,
          'data-type': 'form',
          type: 'button'
        },
        'Save'
      )
    ]
  );
}

export function BucketFormComponent() {
  let id = ID();

  return createElement(
    'form',
    {
      class: 'bucket-form',
      'data-id': id,
      'data-type': 'form',
      id: `bucket-form-${id}`
    },
    [
      createElement(
        'label',
        {
          for: `bucket-form-title-${id}`
        },
        'Title'
      ),
      createElement('input', {
        type: 'text',
        class: 'bucket-form__input',
        id: `bucket-form-title-${id}`,
        value: '',
        name: 'title'
      }),

      createElement(
        'button',
        {
          class: 'bucket-form__button',
          'data-action': 'create-bucket',
          'data-for': id,
          'data-type': 'form',
          type: 'button'
        },
        'Create Bucket'
      )
    ]
  );
}

export default {
  content: BucketComponent,
  titleForm: BucketTitleFormComponent,
  form: BucketFormComponent
};
