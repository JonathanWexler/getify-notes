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
	return new Promise((resolve, reject) => {
    fakeAjax(file, function (text) {
      resolve(text); // same as just fakeAjax(file, resolve);
    })
	});
}

var p1 = getFile("file1");
var p2 = getFile("file2");
var p3 = getFile("file3");

// request all files concurrently
p1.then(output)
.then(() => {
  return p2;
}).then(output)
.then((data) => {
  return p3;
}).then(output);
