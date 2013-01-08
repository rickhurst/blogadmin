//$(document).ready(function(){

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

//});