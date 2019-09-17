import bucketCreator from './bucket.js';
import taskCreator from './task.js';
import createElement from '../utils/createElement.js';
import ID from '../utils/ID.js';

const DELETE_BUCKET = 'delete-bucket';
const CREATE_BUCKET = 'create-bucket';

export default class BucketView {
  constructor(config) {
    this.creator = bucketCreator;
    this.model = config.model;
    this.container = config.container;
    this.model.register(this);
  }

  createForm() {
    return this.creator.form();
  }
  createBucketComponent(payload) {
    let bucketComponent = this.creator.content({
      title: payload.title,
      id: payload.id
    });

    return bucketComponent;
  }

  deleteBucketComponent(payload) {
    let bucketId = `#bucket-${payload.id}`;
    let bucket = this.container.querySelector(bucketId);
    this.container.removeChild(bucket);
  }

  render(bucketComponent) {
    this.container.appendChild(bucketComponent);
  }

  update(msg) {
    switch (msg.action) {
      case CREATE_BUCKET:
        let bucketComponent = this.createBucketComponent(msg.payload);
        this.render(bucketComponent);
        break;
      case DELETE_BUCKET:
        this.deleteBucketComponent(msg.payload);
        break;
    }
  }
}
