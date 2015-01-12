var ACS = require('acs-node');
function create(req, res) {
	console.log(req.body);
	console.log(process.env.NODE_ENV);
	ACS.Users.create({
		email : req.body.email,
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		password : req.body.password,
		username : req.body.username,
		password_confirmation : req.body.confirm_password
	},function(data){
		console.log(data);
		if(data.success) return res.send(200,data);
		return res.send(200,data)


	},req,res)
	
	//res.render('index', { title: 'Welcome to Node.ACS!' });
}

function login(req,res)
{
	console.log('login action called');
	console.log(req.body);
	ACS.Users.login({
		login : req.body.username,
		password : req.body.password
	},function(data){
		console.log(data);
		if(data.success)
		{
			res.cookie('user',JSON.stringify(data.users[0]));
			return res.send(200,data);
		} 
		return res.send(data.meta.code,data);
	},req,res);
}

function logout(req,res)
{
	ACS.Users.logout(function(e){
		if(e.success) 
		{
			console.log('logout success! ',e);
			res.clearCookie('user');
			return res.send(200);
		}
		
	},req,res);
}