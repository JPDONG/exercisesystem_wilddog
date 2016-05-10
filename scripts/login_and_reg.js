$("#login").click(function() {
	//alert("qq");
	var useremail = document.getElementById('email').value;
	var userpassword = document.getElementById('password').value;
	var ref = new Wilddog("https://dong.wilddogio.com/");
	if (useremail == "" || userpassword == "") {
		alert("请输入完整信息");
		history.go(-1);
	} else {
		ref.authWithPassword({
			email: useremail,
			password: userpassword
		}, function(err, data) {
			if (err == null) {
				console.log("auth success!");
			} else {
				console.log("auth failed,msg:", err);
				alert("error");
			}
		});
	}

});
$("#reg").click(function() {
	alert("??");
	var ref = new Wilddog("https://dong.wilddogio.com/");
	var user_email = document.getElementById("email").value;
	var user_password = document.getElementById("password").value;
	var password_confirm = document.getElementById("password_confirm").value;
	if (user_email == "" || user_password == "" || password_confirm == "") {
		alert("请输入完整信息");
	} else if (user_password != password_confirm) {
		alert("密码不一致");
	} else {
		ref.createUser({
				email: user_email,
				password: user_password
			},
			function(err, data) {
				if (err != null) {
					//not success
					console.log("not success");
				} else {
					//create user success
					console.log("create user success");
				}
			});
	}
});