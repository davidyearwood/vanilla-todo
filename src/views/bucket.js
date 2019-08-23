import createElement from '../utils/createElement.js';

export function BucketComponent(props) {
  const { id, title } = props;

  return createElement(
    'section',
    {
      class: 'bucket',
      id: `bucket-${id}`,
      'data-id': id,
      'data-type': 'bucket'
    },
    [createElement('h1', { class: 'bucket__title' }, title)]
  );
}