import createElement from '../utils/createElement.js';
/*
 * Data structure: 
 * <section class='bucket' data-id='{id}' id='bucket-{id}'> 
 *  <h1 class='bucket__title'>{title}</h1>
 * </section>
 */

export default function bucketView(props) {
  const { id, title } = props;

  return createElement(
    'section',
    {
      class: 'bucket',
      id: `bucket-${id}`,
      'data-id': id
    },
    [createElement('h1', { class: 'bucket__title' }, title)]
  );
}
