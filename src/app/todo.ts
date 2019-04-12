export class Todo {
  id: number;
  title = '';
  complete = false;
  timeSpent: number;
  timeRemaining: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
