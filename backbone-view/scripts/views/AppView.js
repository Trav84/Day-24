var AppView = Backbone.View.extend({

	el: '#app-view',
	initialize: function() {

		_.bindAll(
			this,
			'onKeyUp',
			'createNewItem',
			'onCollectionsAdded',
			'onDeleteCollectionClick'
		);

		this.itemsCollection = new ToDoCollection();

		this.$textBox = $('#text-input-box');
		this.$displayList = $('#display-list');
		this.$itemCheckBox = $('.item-check-box');
		this.$error = $('.error');
		this.$delButton = $('#delete-button');

		this.$textBox.on('keyup', this.onKeyUp);
		this.$itemCheckBox.on('change', this.onCheckedBox);
		this.itemsCollection.on('add', this.onCollectionsAdded);
		this.$delButton.on('click', this.onDeleteCollectionClick);

		this.itemsCollection.fetch();

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

	onDeleteCollectionClick: function() {
		console.log('click');
		var self = this;

		// this.itemsCollection.each(function(model) {
		// 	console.log(model);
		// 	// self.itemsCollection.remove(model);
		// 	model.destroy({
		// 		success: function() {
		// 			console.log('success');
		// 		},
		// 		error: function() {
		// 			console.log('error');
		// 		}
		// 	});
		// 	console.log('destroyed');
		// });

		while(this.itemsCollection.length!==0) {
				this.itemsCollection.at(0).destroy();
		}
		
	}
});