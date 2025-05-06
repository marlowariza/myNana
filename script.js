$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	if ($("#messageState").is(":checked")) {
		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
		console.log("Abrindo");
	} else {
		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".heart").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
		console.log("fechando");
	}
});

$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if ($(".message").hasClass("closeNor"))
		$(".message").addClass("closed");
	else {
		$(".heart").addClass("fade-out");

		noButton.addEventListener("click", function() {
			if (noCount < messages.length) {
				messageText.innerText = messages[noCount];
				noCount++;
				noButton.style.transform = `scale(${1 - noCount * 0.1})`;
				yesButton.style.transform = `scale(${1 + noCount * 0.1})`;
			}
			if (noCount === messages.length) {
				noButton.style.display = "none";
			}
		});

		yesButton.addEventListener("click", function() {
			$(".message").html(`
				<img src="https://media1.tenor.com/m/aEWN44So2ckAAAAC/kiss-kisses.gif" class="gif">
				<div class="question">YAYAYYAYAYAYAY I LOVE YOU SO MUCH MY SWEET LITTLE KITTEN❤️</div>
			`);
			launchConfetti();
			startHeartRain();
		});
	}
	$(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});

$(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if (!$(".heart").hasClass("closeHer")) {
		$(".heart").addClass("openedHer").addClass("beating");
	} else {
		$(".heart").addClass("no-anim").removeClass("beating");
	}
	$(".heart").removeClass("openHer").removeClass("closeHer");
});

let messages = ["Please?", "Give me a chance!", "Are you sure?", "Think again!", "You might regret this!", "One last chance!", "Pretty please?", "Don't break my heart 💔"];
let noCount = 0;
let noButton = document.getElementById("no");
let yesButton = document.getElementById("yes");
let messageText = document.getElementById("message");

noButton.addEventListener("click", rejectLove);
yesButton.addEventListener("click", acceptLove);

function rejectLove() {
    if (noCount < messages.length) {
        messageText.innerText = messages[noCount];
        noCount++;
        noButton.style.transform = `scale(${1 - noCount * 0.1})`;
        yesButton.style.transform = `scale(${1 + noCount * 0.1})`;
    }
    if (noCount === messages.length) {
        noButton.style.display = "none";
    }
}

function acceptLove() {
    document.getElementById("valentine").innerHTML = `
        <img src="https://media1.tenor.com/m/aEWN44So2ckAAAAC/kiss-kisses.gif" class="gif">
        <div class="question">YAYAYYAYAYAYAY I LOVE YOU SO MUCH MY SWEET LITTLE KITTEN❤️</div>
    `;
    launchConfetti();
    startHeartRain();
}

function launchConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function startHeartRain() {
    const heartContainer = document.getElementById("heart-container");
    if (!heartContainer) {
        console.error("Heart container not found!");
        return;
    }
    
    const interval = setInterval(() => {
        let heartFire = document.createElement("div");
        heartFire.classList.add("heartFire");
        heartFire.innerHTML = "❤️";
        heartFire.style.left = Math.random() * window.innerWidth + "px";
        heartContainer.appendChild(heartFire);

        setTimeout(() => {
            if (heartFire && heartFire.parentNode) {
                heartFire.remove();
            }
        }, 5000);
    }, 300);

    // Stop the heart rain after 10 seconds
    setTimeout(() => {
        clearInterval(interval);
    }, 10000);
}
