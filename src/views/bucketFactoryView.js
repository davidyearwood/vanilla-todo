import bucketView from './bucketView.js';
export default function bucketFactoryView(props) {
  let bv = bucketView(props);
  return {
    id: props.id,
    get: () => bv
  };
}
