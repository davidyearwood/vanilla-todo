import bucketCreator from './bucket.js';
import taskCreator from './task.js';
import createElement from '../utils/createElement.js';
import ID from '../utils/ID.js';

export default class BucketView {
  constructor(config) {
    this.creator = bucketCreator;
    this.model = config.model;
    this.model.register(this);
  }

  createBucket(payload) {
    let bucket = this.model.get(payload.id);
    
    let h1 = createElement('h1', {
      class: 'bucket__title',
      'data-action': 'get-bucket-title-form',
      'data-id': ID()
    }, bucket.title);
    
    let form = taskCreator.createForm({
      id: ID()
    });
    
    let dropzone = createElement('section', {
      class: 'tasks-list dropzone',
      'data-for': bucket.id
    });
    
    let bucketElement = bucketCreator.content({
      id: bucket.id
    });

    bucketElement.appendChild(h1);
    bucketElement.appendChild(form);
    bucketElement.appendChild(dropzone);

    console.log(bucketElement);
  }

  update(msg) {
    switch(msg.action) {
      case 'create-bucket': 
        this.createBucket(msg.payload);
        console.log(msg);
        break;
    }
  }
}