import Model from './Model.js';
import ID from '../utils/ID.js';

/*
 * Bucket -> Task
 * Bucket {
 *  String Title,
 *  String Id 
 * }  
 * Bucket has many tasks
 * Task belongs to a bucket 
 * 
 * Bucket {
 *  String Title
 *  String Id
 *  Task tasks = {}
 * } 
 */
export default class BucketModel extends Model {
  constructor(config) {
    super();
    this.model = config.model;
    this.buckets = new Map();
  }

  delete(id) {
    this.buckets.delete(id);
    this.notify({
      action: 'delete-bucket',
      payload: {
        id
      }
    });
  }

  get(id) {
    return this.buckets.get(id);
  }

  create(bucket) {
    let { model } = this;
    let id = ID();
    let newBucket = {
      id,
      title: bucket.title,
      tasks: model.getAllByBelongsTo.bind(model, id),
      id
    };

    this.buckets.set(id, newBucket);

    this.notify({
      action: 'create-bucket',
      payload: {
        id
      }
    });

    return newBucket.id;
  }

  all() {
    return Array.from(this.buckets.values());
  }
}