import createElement from '../utils/createElement.js';

/**
 * Form data structure
 * <form class='task-form' data-id={id}>
 *  <label>Title</label>
 *  <input type='text' class='task-form__input' id='task-form-title-{id}'>
 *  <label>Description</label>
 *  <input type='text' class='task-form__input' id='task-form-description-{id}'>
 * </form>
 */
export default function taskFormView(props) {
  let { id } = props;
  return createElement(
    'form',
    {
      class: 'task-form',
      'data-id': id
    },
    [
      createElement('label', { for: `task-form-title-${id}` }, 'Title'),
      createElement('input', {
        type: 'text',
        class: 'task-form__input',
        id: `task-form-title-${id}`
      }),
      createElement(
        'label',
        { for: `task-form-descrpition-${id}` },
        'Description'
      ),
      createElement('input', {
        type: 'text',
        class: 'task-form__input',
        id: `task-form-description-${id}`
      })
    ]
  );
}
