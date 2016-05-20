var useremail;
$("#login").click(function() {
	//alert("qq");
	var useremail = document.getElementById('email').value;
	var userpassword = document.getElementById('password').value;
	var ref = new Wilddog("https://dong.wilddogio.com/");
	if (useremail == "" || userpassword == "") {
		alert("请输入完整信息");
		//history.go(-1);
	} else {
		ref.authWithPassword({
			email: useremail,
			password: userpassword
		}, function(err, data) {
			if (err == null) {
				console.log("auth success!");
				//getName(ref);
				//存储用户名到Cookie
				ref.orderByValue().on("value", function(snap) {
					snap.forEach(function(data) {
						//console.log(data.key());
						if (data.key() == "users") {
							//var user_ref = ref.child('users');
							data.forEach(function(data1) {
								//console.log(data1.key());
								//var name_ref = user_ref.child(data1.key()); 
								data1.forEach(function(data2) {
									console.log(data2.key());
									//console.log(data2.val());
									if (data2.key() == 'user_email' && data2.val() == useremail) {
										//setCookie('username',user)
										//console.log(data2.val());
										//console.log("name !!"+);
										console.log(data1.key());
										setCookie('username', data1.key(), 365);
										console.log(getCookie('username'));
									}
								})
							})
						}

					});
				});
			} else {
				console.log("auth failed,msg:", err);
				alert("error");
			}
		});
	}

});
$("#reg").click(function() {
	//alert("??");
	var user_name = document.getElementById('name').value;
	var ref = new Wilddog("https://dong.wilddogio.com/");
	var user_email = document.getElementById("email").value;
	var user_password = document.getElementById("password").value;
	var password_confirm = document.getElementById("password_confirm").value;
	if (user_name == "" || user_email == "" || user_password == "" || password_confirm == "") {
		console.log("请输入完整信息");
	} else if (user_password != password_confirm) {
		console.log("密码不一致");
	} else {
		ref.createUser({
				email: user_email,
				password: user_password
			},
			function(err, data) {
				if (err != null) {
					//not success
					console.log("not success");
					console.log(err);
				} else {
					//create user success
					console.log("create user success");
					/*user_ref = ref.child("users");
					if(user_ref != null){
					console.log("users is not null");*/
					//setCookie('username",user_name,0);
					//添加用户信息
					ref.orderByValue().on("value", function(snap) {
						snap.forEach(function(data) {
							console.log(data.key());
							if (data.key() == "users") {
								console.log("users is exist");
								user_ref = ref.child("users");
								user_ref.child(user_name).update({
									"user_name": user_name,
									"user_email": user_email
								});

							}
						})
					});
				}

			});
	}
});

function getName(ref) {
	ref.orderByValue().on("value", function(snap) {
		snap.forEach(function(data) {
			//console.log(data.key());
			if (data.key() == "users") {
				data.forEach(function(data1) {
					//console.log(data1.key());
					data1.forEach(function(data2) {
						console.log(data2.key());
						//console.log(data2.val());
						if (data2.key() == 'user_email' && data2.val() != useremail) {
							//setCookie('username',user)
							//console.log(data2.val());
							//console.log("name !!"+);
							break;
						}
						if (data2.key() == 'user_name') {
							console.log(data2.val());
						}
					})
				})
			}

		});
	});
}