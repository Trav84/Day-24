var ToDoCollection = Backbone.Collection.extend({
	model: ToDoModel,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/Travis-ToDoList'
});