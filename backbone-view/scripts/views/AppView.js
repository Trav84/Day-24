var AppView = Backbone.View.extend({

	el: '#app-view',
	initialize: function() {

		_.bindAll(
			this,
			'onKeyUp',
			'createNewItem',
			'onCollectionsAdded'
		);

		this.itemsCollection = new ToDoCollection();

		this.$textBox = $('#text-input-box');
		this.$displayList = $('#display-list');
		this.$itemCheckBox = $('.item-check-box');
		this.$error = $('.error');

		this.$textBox.on('keyup', this.onKeyUp);
		this.$itemCheckBox.on('change', this.onCheckedBox);
		this.itemsCollection.on('add', this.onCollectionsAdded);

		//this.updateFromSever();

	},

	onKeyUp: function(e) {
		if(e.which === 13) {
			this.createNewItem();
			this.$textBox.val('');
		}
	},

	createNewItem: function() {

		this.newItem = new ToDoModel();
		this.newItem.set({
			itemToDo: this.$textBox.val()
		});

		if(!this.newItem.isValid()) {
			this.$error.html(this.newItem.validationError).show();
		}

		this.newItem.save();
		this.itemsCollection.add(this.newItem);

	},

	onCollectionsAdded: function(toDoItem) {

		var itemView = new ListItemView({model: toDoItem});
		this.$displayList.append(itemView.$el);
	},

	// updateFromSever: function() {
	// 	// Poll every 10 seconds to keep the channel model up-to-date.
	// 	this.newItem = new ToDoModel();
	// 	this.newItem.fetch();
	// 	var itemView = new ListItemView({model: this.newItem});
	// 	this.$displayList.append(itemView.$el);

	// }

});