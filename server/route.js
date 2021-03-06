const controller = require('./controller');

module.exports = async function(app){

    app.route('/task')
        .get(controller.getAllTask)
        .post(controller.postTask);

    app.route('/task/date')
        .get(controller.getTaskByDate);

}