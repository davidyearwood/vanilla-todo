import Model from './Model.js';
import ID from '../utils/ID.js';

export default class BucketModel extends Model {
  constructor() {
    super();
    this.buckets = new Map();
  }

  delete(id) {
    this.buckets.delete(id);
    this.notify({action: 'delete-bucket', payload: {id} });
  }

  get(id) {
    return this.buckets.get(id);
  }

  create(bucket) {
    let id = ID();
    this.buckets.set(id, {
      title: bucket.title,
      id
    });

    this.notify({action: 'create-bucket', payload: { id }});
  }

  all() {
    return Array.from(this.buckets.values());
  }
}