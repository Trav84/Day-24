var ToDoModel = Backbone.Model.extend({
	urlRoot: "http://tiny-pizza-server.herokuapp.com/collections/Travis-ToDoList",
	defaults: {
		itemToDo: '',
		completed: false
	},

	validate: function(attrs, options) {
		if(!attrs.itemToDo) return 'Please enter an <b>item</b>.';
	}
});