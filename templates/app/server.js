/*
todo

const app = require('./feather/app');
var promisify     = require('es6-promisify');
var sm            = require('sitemap');

var getSitemapXML = function() {
	var sitemap = sm.createSitemap({
		hostname:  process.env.npm_package_homepage,
		cacheTime: 60000,
		urls:      [{ url: '/', priority: 1 }]
	};

	return promisify(sitemap.toXML.bind(sitemap))();
});
app.get('/sitemap.xml', function(req, res, next) {
	getSitemapXML().then(
		function(xml) {
			res.header('Content-Type', 'application/xml');
			res.send(xml);
		},
		next
	);
});
*/
require("./feather");
