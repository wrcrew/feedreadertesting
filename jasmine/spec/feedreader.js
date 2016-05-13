/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('each feed object has a URL defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                //console.log(allFeeds[i].url);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('each feed object has a name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                //console.log(allFeeds[i].name);
            }
        });
    });


    /* A new test suite named "The menu" */

    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. */

        it('should be hidden by default', function() {

            expect(document.body.className).toMatch("menu-hidden");
            //console.log(document.body.className);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('should appear when clicked', function() {

            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
        });

        it('should disappear when clicked again', function() {
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });   
    
    });


    describe('Initial Entries', function() {
    
    /* A new test suite named "Initial Entries" */

    /*loadFeed() is asynchronous so this test requires the use of Jasmine's beforeEach and asynchronous done() function. */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        it('when feeds are loaded, it should have at least 1 entry', function() {
            expect($('article.entry').length).not.toBe(0); 
        });
        
    });

    //a new test suite named "New Feed Selection"

    describe('New Feed Selection', function() {

        var oldFeed;
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('when new feed is loaded, content does not equal previous feed', function(done) {
            
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                //console.log($('.feed').html());
                loadFeed(1, function() {
                    //console.log($('.feed').html());
                    expect($('.feed').html()).not.toEqual(oldFeed);
                    done();
                }); 
            });
        });
    });
}());
