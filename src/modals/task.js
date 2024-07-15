const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskId : {
        type : String,
        required : false,
        unique: true,
    },
    userId : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    dueDate : Date,
    description : String,
    priority : {
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }    
});

taskSchema.pre('save', async function(next){
    const task = this;
    if (task.isNew) {
      const lastTask = await this.constructor.findOne().sort({ createdAt: -1 });
      const lastIdNumber = lastTask ? parseInt(lastTask.taskId.split('_')[1], 10) : 0;
      this.taskId = `Task_${lastIdNumber + 1}`;
    }
    next();
});

module.exports = mongoose.model('task',taskSchema);