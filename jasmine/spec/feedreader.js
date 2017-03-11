// feedreader.js

/* Tests placed within the $() function,
 * since some of these tests may require DOM elements.
 * This ensures tests won't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        /* Ensure allFeeds variable is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed
         * in allFeeds object, ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('feed has url', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

        /* Loops through each feed
         * in allFeeds object, ensures it has a name defined
         * and that the name is not empty.
         */
         it('feed has name', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });

    });

    describe('The menu', function() {

        /* Ensures the menu element is
         * hidden by default.
         */
        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Ensures the menu changes visibility when
          * menu icon is clicked.
          */
        it('menu changes visibility on icon click', function() {
            var menuIcon = $('.menu-icon-link');

            menuIcon.click();
                expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {

        /* For async load
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Ensures when the loadFeed function
         * completes and there is at least one entry.
         */
        it('loadFeed fx completes, entries filled', function() {
            var container = $('.feed');

            expect(container.length).toBeGreaterThan(0);
         });

    });

    describe('New Feed Selection', function() {
        var firstFeed;

        /* For async load
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
               firstFeed = $('.feed').html();
               done();

                console.log('FIRST FEED' + firstFeed);
            });
        });

        /* Ensures when a new feed is loaded
         * that the content actually changes.
         */
        it('content changes in feed', function(done) {
            var secondFeed;

            loadFeed(1, function() {
                secondFeed = $('.feed').html();
                expect($('.feed').html()).not.toEqual(firstFeed);
                done();

                console.log('SECOND FEED' + secondFeed);
            });
        });

    });

}());
