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

// function getFile(file) {
// 	return ASQ(function(done){
// 		fakeAjax(file,done);
// 	});
// }

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

function *loadFiles(file) {
  output(yield file);
  output(yield file);
  output(yield file);
}


// ASQ().runner(function *loadFiles(){
	// request all files concurrently

// });


['file1','file2','file3'].map(getFile).reduce(function (file) {
    return loadFiles(function() {
      return file;
    });
});
