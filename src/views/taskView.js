import createElement from '../utils/createElement.js';

/*
 *
 * <section class='task' data-id='{id}' id='task-{id}'> 
 *  <h1 class='task__title'>{title}</h1>
 *  <p class='task__description'>{description}</p>
 * </section>
 */
export default function taskView(props) {
  const { id, title, description } = props;

  return createElement(
    'section',
    {
      class: 'task',
      id: `task-${id}`,
      'data-id': id,
      'data-type': 'task'
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
