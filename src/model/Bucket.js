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
      tasks: bucket.tasks || [],
      id
    });

    this.notify({action: 'create-bucket', payload: { id }});
  }

  all() {
    return Array.from(this.buckets.values());
  }
}