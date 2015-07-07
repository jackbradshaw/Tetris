requirejs.config({
    baseUrl: 'scripts',
    paths: {
    	"knockout": "../node_modules/knockout/build/output/knockout-latest.debug"
    }
});

requirejs(['app']);

