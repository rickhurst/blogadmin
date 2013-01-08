MyApp.module("BlogAdmin", function(BlogAdmin, App, Backbone, Marionette, $_, _) {

    // Routes for our page regions
    BlogAdmin.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "showPostList"
        }
    });

    // Models
    Post = Backbone.Model.extend({});
    
    Tag = Backbone.Model.extend({});

    // Collections
    Posts = Backbone.Collection.extend({
        model: Post
    });

    Tags = Backbone.Collection.extend({
        model: Tag
    });

    // Views
    PostView = Backbone.Marionette.ItemView.extend({
        template: "#post-list-item-template",
        tagName: 'li',
        className: 'post',
        events:{
            'click a' : 'showPostEdit'
        },

        // initialize: function(options) {
        //     this.element = options.element;
        // },

        showPostEdit: function(e){
            MyApp.vent.trigger("posts:SHOW_EDIT", this.model);
            e.preventDefault();
        },

        
        initialize: function() {
          // auto update the item view when the model is changed
          //this.bindTo(this.model, 'change', this.render);
        }

    });



    PostListView = Backbone.Marionette.CompositeView.extend({
    
        id: "posts",
        template: "#post-list-template",
        itemView: PostView,
        itemViewContainer: 'ul'

        // appendHtml: function(collectionView, itemView){
        //  collectionView.$("ul").append(itemView.el);
        // }
    });

    PostEditView = Backbone.Marionette.Layout.extend({
        template: '#post-edit-template',

        regions: {
            tag_list: '#tag-list'
        },

        initialize: function(){
            // loop through global tags and create tag model for each one, 
            // marking any already in model.tags

            var tag_collection = new Tags(); 

            var model_tags = this.model.get("tags");
            console.log(model_tags);

            _.each(App.data.all_tags, function(item){
                var t_selected = false;
                _.each(model_tags, function(model_tag){
                    if(model_tag == item){
                        t_selected = true;
                    }
                });
                var t = new Tag({
                    tag_name: item,
                    selected: t_selected
                });
                tag_collection.add(t);
            });

            console.log(tag_collection);
        },

        // overide the builtin serializeData as we want to pass some additional data to the view
        serializeData: function(){

            var view_data = this.model.toJSON();
            view_data.all_tags = App.data.all_tags;

            return view_data;

        }
    });

    // Controller for managing the Blog Admin
    BlogAdmin.Controller = App.Controller.extend({

        initialize: function(options) {
            this.bindTo(MyApp.vent, "posts:SHOW_LIST", this.showPostList, this);
            this.bindTo(MyApp.vent, "posts:SHOW_EDIT", this.showPostEdit, this);

            //this.router = new ElementInfo.Router({controller: this});
        },


        showPostList: function(posts) {

            //console.log('show post list');
            //console.log(MyApp.data.posts);

            this.showMobilePage(
                App.defaultRegion,
                new PostListView({
                    collection: MyApp.data.posts
                })
            );

        },


        showPostEdit: function(element) {

            console.log(element);

            var blogEdit = new PostEditView(
                    {model: element}
            );

            this.showMobilePage(
                App.postEditRegion,
                blogEdit
            );
            //this.router.navigate("element-info/" + element.attributes.code );
        }

    });


    // Setup controller
    BlogAdmin.c = new BlogAdmin.Controller({});


});