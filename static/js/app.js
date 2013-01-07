$(document).ready(function(){

    MyApp = new Backbone.Marionette.Application();

    MyApp.addRegions({
        defaultRegion: "#default-contents",
        postEditRegion: "#post-edit"
    });

    MyApp.Controller = Marionette.Controller.extend({

        // Show view in the specified region and then transition between pages
        showMobilePage: function(region, view) {
            // Only attempt if we are rendering in different region (page).
            //if ('#' + $.mobile.activePage.parent().attr('id') !== region.el) {
                region.show(view);
                //console.log(view.$el);
                $.mobile.changePage(view.$el, {changeHash: false});
            //}
            //else {
                // Debugging message for development so can see when this happens
            //    console.log('Attempted to render in the same region');
            //}
        }

    });

    MyApp.module("BlogAdmin", function(BlogAdmin, App, Backbone, Marionette, $_, _) {

        // Routes for our page regions
        BlogAdmin.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "": "showPostList"
            }
        });

        Post = Backbone.Model.extend({});
        Posts = Backbone.Collection.extend({
            model: Post
        });

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
                
                //this.model.set({file_name: 'changed'});

                // var postEdit = new PostEditView({
                //  model: this.model
                // });

                //MyApp.postEditRegion.show(postEdit);
                //$('#contents').trigger('create');

                // rerender the whole composite view and reapply jquery mobile
                // seems overkill, but jquery mobile gets confused when itemview updates
                // individual item amongst already initialised stuff
                //MyApp.mainRegion.show(MyApp.postsView);
                //$('#contents').trigger('create');
                
                // trigger create on parent
                //$(this.el).closest('#contents').trigger('create');
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

        PostEditView = Backbone.Marionette.ItemView.extend({
            template: '#post-edit-template'
        });

        // Controller for managing the Blog Admin
        BlogAdmin.Controller = App.Controller.extend({

            initialize: function(options) {
                this.bindTo(MyApp.vent, "posts:SHOW_LIST", this.showPostList, this);
                this.bindTo(MyApp.vent, "posts:SHOW_EDIT", this.showPostEdit, this);

                //this.router = new ElementInfo.Router({controller: this});
            },


            showPostList: function(posts) {

                console.log('show post list');
                console.log(MyApp.data.posts);

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



    MyApp.addInitializer(function(options){

        MyApp.data = options;

        //console.log(options);

        MyApp.vent.trigger("posts:SHOW_LIST");
        // MyApp.postsView = new PostListView({
        //   collection: options.posts
        // });
        // MyApp.mainRegion.show(MyApp.postsView);

        // trigger the jqm create() method to turn new list into a jqm listview
        //$('#contents').trigger('create');
    });

});