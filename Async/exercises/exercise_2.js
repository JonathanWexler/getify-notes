function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

function getFile(file) {
  var f, t;

	fakeAjax(file, function(data) {
    if(!f) t = text;
    else f(text);

    return function thunk(cb) {
      if(!t) f = cb;
      else cb(t);
    }
	});
}

// request all files concurrently
var fileThunk1 = getFile("file1", );
var fileThunk2 = getFile("file2");
var fileThunk3 = getFile("file3");


fileThunk1(function(response) {
  output(response);
  fileThunk2(function() { // need to call this inside the first call so it is run immediately, whether output is ready yet, it's just two functions being called next to each other, they don't depend on each other.

  })
})

// SOLUTION ****************************

function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	var t;
	var f;

	fakeAjax(file,function(text){
		if (!f) t = text;
		else f(text);
	});

	return function th(cb) {
		if (!t) f = cb;
		else cb(t);
	};
}


// request all files concurrently
var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

th1(function ready(text){
	output(text);
	th2(function ready(text){
		output(text);
		th3(function ready(text){
			output(text);
			output("Complete!");
		});
	});
});
