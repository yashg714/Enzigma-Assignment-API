require('dotenv').config();

const config = {
    commonVariables : {
        statusList : ['Not Started','In Progress','Completed','Waiting on someone else','Deffered'],
        priorityList : ['Normal','Low','High']
    }
}

module.exports = config;