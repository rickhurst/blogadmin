$(document).ready(function(){

	MyApp = new Backbone.Marionette.Application();

	MyApp.addRegions({
		mainRegion: "#contents"
	});

	Post = Backbone.Model.extend({

	});

	Posts = Backbone.Collection.extend({
		model: Post
	});

	PostView = Backbone.Marionette.ItemView.extend({
		template: "#post-list-item-template",
		tagName: 'li',
		className: 'post'
	});

	PostListView = Backbone.Marionette.CompositeView.extend({
	
		id: "posts",
		template: "#post-list-template",
		itemView: PostView,

		appendHtml: function(collectionView, itemView){
			collectionView.$("ul").append(itemView.el);
		}
	});

	MyApp.addInitializer(function(options){
		var postsView = new PostListView({
			collection: options.posts
		});
		MyApp.mainRegion.show(postsView);

		// trigger the jqm create() method to turn new list into a jqm listview
		$('#contents').trigger('create');
	});

});