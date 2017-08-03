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
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}


var files = ["file1","file2","file3"]
.map(getFile)
.reduce(function(chain, v) {
  return chain.then().then(output)
}
//}, Promise.resolve /* Starts with a reolved promise*/);
// But will automatically start reduction with the first file
