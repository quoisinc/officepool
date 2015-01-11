var ACS = require('acs-node');
function index(req, res) {
	ACS.Users.showMe(function(e){
		console.log('user ',e);
		if(e.success && e.users) res.cookie('user',JSON.stringify(e.users[0]));
		return res.render('index', { title: 'Welcome to Node.ACS!' });;
	},req,res)
	
}