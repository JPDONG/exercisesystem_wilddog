var questionId = 0;
questionId = getCookie('exercise_tk_id');
if (questionId == null || questionId == "") {
		questionId = 0;
} 
window.onload = loadQuestions(questionId);
var answer;
var bSubmit = document.getElementById("submit_answer");


bSubmit.onclick = function() {
	if (bSubmit.innerHTML == "确定") {
		showAnswer();
		bSubmit.innerHTML = "下一题";
	} else {
		loadQuestions(++questionId);
		bSubmit.innerHTML = "确定"
	}
}

function loadQuestions(questionId) {
	var refRoot = new Wilddog("http://dong.wilddogio.com/question_tk");
	var ref = refRoot.child(questionId);
	if (ref == null) {
		alert("no such child");
	}
	var resultDiv = document.getElementById("result_div");
	var list = document.getElementsByTagName("li");
	var question_text = document.getElementById("question_text");
	
	//totalNum = getTotalNum();
	getTotalNum(questionId);
	
	//console.log(question_text.innerHTML);
	resultDiv.style.visibility = "hidden";
	ref.orderByValue().on("value", function(snap) {
		//console.log(snap.key());
		snap.forEach(function(data) {
			console.log(data.key() + ":" + data.val());
			if (data.key() == "question_text") {
				question_text.innerHTML = data.val();
				return;
			} else if (data.key() == "answer") {
				answer = data.val();

			}
		})
	});
	setCookie('exercise_tk_id',questionId,365);
}

function showAnswer() {
	var resultDiv = document.getElementById("result_div");
	var rightAnswer = document.getElementById("right_answer");
	rightAnswer.innerHTML = answer;
	resultDiv.style.visibility = "visible";
}

function getTotalNum(questionId) {
	var ref = new Wilddog("http://dong.wilddogio.com/question_tk/");
	var questionNum = document.getElementById("question_num");
	//totalNum = 0;
	console.log(ref.key());
	ref.orderByValue().on('value', function(snap) {
		console.log(snap.val().length);
		totalNum = snap.val().length;
		if(questionId >= totalNum){
			//questionId = 0;
			setCookie('exercise_tk_id',0,365);
			console.log(getCookie('exercise_tk_id'));
			alert("题已做完！");
		}else{
			questionNum.innerHTML = (questionId) + "/" + totalNum;
		}
		
	});
	//return totalNum;
}