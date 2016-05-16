window.onload = loadQuestions(0);
var answer;
var bSubmit = document.getElementById("submit_answer");
bSubmit.onclick = function(){
	if(bSubmit.innerHTML == "确定"){
		checkAnswer();
		bSubmit.innerHTML = "下一题";
	}else{
		loadQuestions(1);
		bSubmit.innerHTML = "确定"
	}
	
	
	//judgeRadioClicked();
}

function loadQuestions(questionId) {
	var refRoot = new Wilddog("http://dong.wilddogio.com/questions");
	var ref = refRoot.child(questionId);
	if(ref == null){
		alert("no such child");
	}
	var resultDiv = document.getElementById("result_div");
	var list = document.getElementsByTagName("li");
	//var question_text = document.getElementById("question_text");
	var question_text = document.getElementById("question_text");
	var options = document.getElementsByName("option");
	console.log(question_text.innerHTML);
	console.log(options[0].innerHTML);
	//question_text.innerHTML = "hello";
	var value = ref.child("question_id").key();
	//var question_text = ref.child("question_text");
	resultDiv.style.visibility="hidden";
	ref.orderByValue().on("value", function(snap) {
		console.log(snap.key());
		snap.forEach(function(data) {
			console.log(data.key() + ":" + data.val());
			if (data.key() == "question_text") {
				//list[0].childNodes[1].childNodes[0].nodeValue = data.val();
				question_text.innerHTML = data.val();
				return;
			} else if (data.key() == "optiona") {
				options[0].innerHTML = data.val();
			} else if (data.key() == "optionb") {
				options[1].innerHTML = data.val();
			} else if (data.key() == "optionc") {
				options[2].innerHTML = data.val();
			} else if (data.key() == "optiond") {
				options[3].innerHTML = data.val();
			} else if (data.key() == "answer") {
				answer = data.val();
			}
		})
	});
}

function checkAnswer() {
	var radios = document.getElementsByName("options"); 
	var result = document.getElementById("result");
	var resultDiv = document.getElementById("result_div");
	var rightAnswer = document.getElementById("right_answer");
	/*var selectValue = $('input[type=radio]:checked').value;
    console.log("jquery:"+selectValue); */                   
    //根据 name集合长度 遍历name集合  
    
    for(var i=0;i<radios.length;i++)  
    {   
        //判断那个单选按钮为选中状态  
        if(radios[i].checked)  
        {  
            //弹出选中单选按钮的值  
            console.log(radios[i].value);  
            if(radios[i].value == answer){
            	console.log("correct");
            	result.innerHTML="正确";
            	rightAnswer.innerHTML=answer;
            	resultDiv.style.visibility="visible";
            }else{
            	console.log("wrong");
            	result.innerHTML="错误";
            	rightAnswer.innerHTML=answer;
            	resultDiv.style.visibility="visible";
            }
            
        }   
    }   
}

function judgeRadioClicked()  
{  
    //获得 单选选按钮name集合  
    var radios = document.getElementsByName("options");  
                                  
    //根据 name集合长度 遍历name集合  
    for(var i=0;i<radios.length;i++)  
    {   
        //判断那个单选按钮为选中状态  
        if(radios[i].checked)  
        {  
            //弹出选中单选按钮的值  
            alert(radios[i].value);  
        }   
    }   
  
}  

/*ref.orderByValue().once("value", function(snap) {
		if (snap == null) {
			alert("snap is null");
		} else {
			console.log(snap.val());
			console.log(snap);
			JSON.parse(snap.val(), function(key, value) {
				if (key == "question_text") {
					console.log(value);
				}
			})
		}
		list[0].childNodes[1].childNodes[0].nodeValue = "jfasjflsafjasj"
			for (var i = 0; i < list[0].childNodes.length; i++) {
				console.log(list[0].childNodes[i].nodeValue);
				//console.log(list[0].childNodes.length);
			}
});*/

//console.log(value);
/*ref.child("1").orderByKey().equalTo("question_id").once("value", function (snap) {
	if(snap == null){
		alert("snap is null");
	}else{
		console.log(snap.val());
	}
});*/
/*var p = document.getElementsByTagName("li")[0];
p.childNodes[0].nodeValue = 'A.balabala';

function showTest() {
	var p = document.getElementsByTagName("li")[0];
	for (var i = 0; i < p.childNodes.length; i++) {
		alert(p.childNodes[i].nodeValue);
	}
	p.childNodes[2].nodeValue = 'A.balabala';
}*/