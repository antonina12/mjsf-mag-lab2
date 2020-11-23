export class Task {
  static TS_COMPLETED = 'completed'
  static TS_INCOMPLETED = 'incompleted'



  constructor() {
    this.title = "";
    this.description = "";
	this.type="";
    this.status = Task.TS_INCOMPLETED;
  }
}
