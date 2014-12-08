var ACS = require('acs-node');
switch(process.env.NODE_ENV) 
{
	case 'development' :
		ACS.init('YgHqtaJgeh06Tl2bvjvZtioVvkJdCOyv');
		break;
	default :
		ACS.init('fDLIWMZxk3eH70YtlOrgu8WPmNC5YsC1');
		break;
}
// initialize app
function start(app, express) {
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));		//set favicon
}

// release resources
function stop() {
	
}