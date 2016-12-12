var ghpages = require('gh-pages');
var path = require('path');
ghpages.publish(path.join(__dirname, 'gh_pages'), function(err) { 
    err&&console.log(err.stack);
    !err&&console.log('ok...');
});