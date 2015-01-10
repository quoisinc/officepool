var ACS = require('acs-node');
function index(req, res) {
	ACS.Users.showMe(function(e){
		console.log('user ',e);
		return res.render('index', { title: 'Welcome to Node.ACS!' });;
	},req,res)
	
}