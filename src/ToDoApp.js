import ID from './utils/ID.js';
import Bucket from './bucket.js';
import createElement from './utils/createElement.js';
import removeChildrenNodes from './utils/removeChildrenNodes.js';

export default class ToDoApp {
  constructor() {
    this.buckets = new Map();
    this.container = createElement('div', { class: 'todo', id: 'todo' });
  }

  createBucket() {
    let { buckets } = this;
    let id = ID();
    let bucket = new Bucket({ id });
    buckets.set(id, {
      id,
      bucket
    });

    return buckets.get(id);
  }

  deleteBucket(id) {
    let { buckets } = this;
    let bucket = buckets.get(id);
    return buckets.delete(id);
  }

  renderBuckets() {
    let { buckets, container } = this;
    let fragment = document.createDocumentFragment();

    for (let [key, value] of buckets) {
      fragment.appendChild(value.bucket);
    }
    removeChildrenNodes(container);
    container.appendChild(fragment);
  }
}
