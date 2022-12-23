function setupTypewriter(t) {
	    var HTML = t.innerHTML;

	    t.innerHTML = "";

	    var cursorPosition = 0,
	        tag = "",
	        writingTag = false,
	        tagOpen = false,
	        typeSpeed = 75,
        tempTypeSpeed = 0;

	    var type = function() {
        
	        if (writingTag === true) {
	            tag += HTML[cursorPosition];
	        }

	        if (!writingTag && !tagOpen) {
	            if (HTML[cursorPosition] === " ") {
	                tempTypeSpeed = 0;
	            }
	            else {
	                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
	            }
	            t.innerHTML += HTML[cursorPosition];
	        }

	        cursorPosition += 1;
	        if (cursorPosition < HTML.length - 1) {
	            setTimeout(type, tempTypeSpeed);
	        }

	    };

	    return {
	        type: type
	    };
	}

//	var typer = document.getElementById('typewriter');

	typewriter = setupTypewriter(typewriter);

	typewriter.type();