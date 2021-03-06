const controller = require('../client/controller'),
      moment = require('moment'),
      notifier = require('node-notifier');

/*
* Run by the cron job every midnight.
*
* Fetches the tasks for the day and lines them up
* for the user to be notified.
*/
exports.timeTasks = async function(){
    
    const currDateTime = moment();
    const nextDateTime = moment();
    const nextDate = nextDateTime.startOf('day').add(1,'days');
    const currDate = currDateTime.startOf('day');

    const tasksRequest = await controller.fetchTasksByDate(currDate.toISOString(), nextDate.toISOString());
    const tasks = tasksRequest.data;

    const filteredTasks = tasks.filter(val => moment(val.dateTime).isAfter(moment()));

    for (let task of filteredTasks) {

        const timediff = moment(task.dateTime).diff(moment());
        console.log(task.content);
        console.log(timediff);
        setTimeout(() => {

            notifier.notify(
				{
					title: 'Todo notification!',
					message: task.content,
					sound: true
				},
			);

        }, timediff);
    }

    return filteredTasks;
}

exports.addTaskToQueue = function(task){
    
    if ((moment().isSame(task.dateTime, 'day'))) {

        const timediff = moment(task.dateTime).diff(moment());
        console.log(task.content);
        console.log(timediff);
        setTimeout(() => {

            notifier.notify(
                {
                    title: 'Todo notification!',
                    message: task.content,
                    sound: true
                },
            );

        }, timediff);
    }
}