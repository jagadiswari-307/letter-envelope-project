document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const personName = body.dataset.name || "";
    const personFolder = body.dataset.person || "person-1";

    const letterSets = {

        "person-1": [
            {
                image: "../letters/person-1/letter-1.png",
                question: "What was I named first",
                answer: "Jahnavi"
            },
        ],

        "person-2": [
            {
                image: "../letters/person-2/letter-1.png",
                question: "What is my favourite color",
                answer: "Yellow"
            },
        ],

        "person-3": [
            {
                image: "../letters/person-3/letter-1.png",
                question: "Which character do I hate the most in TSTP",
                answer: "Isabel"
            },
        ]

    };

    const letters = letterSets[personFolder] || [];

    let currentLetter = 0;
    let nextLetterButton = null;

    const personNameElement =
        document.getElementById("personName");

    const questionElement =
        document.getElementById("question");

    const envelope =
        document.getElementById("envelope");

    const letterPaper =
        document.querySelector(".letter-paper");

    const openButton =
        document.getElementById("openButton");

    const puzzleOverlay =
        document.getElementById("puzzleOverlay");

    const closePuzzle =
        document.getElementById("closePuzzle");

    const answerInput =
        document.getElementById("answer");

    const unlockButton =
        document.getElementById("unlockButton");

    const message =
        document.getElementById("message");

    const confettiContainer =
        document.getElementById("confetti-container");

    personNameElement.textContent = personName;

    if (letters.length === 0) {
        openButton.style.display = "none";
        return;
    }

    showLetter(currentLetter);

    openButton.addEventListener("click", () => {
        openPuzzle();
    });

    closePuzzle.addEventListener("click", () => {
        puzzleOverlay.classList.remove("active");
    });

    unlockButton.addEventListener("click", unlockLetter);

    answerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            unlockLetter();
        }
    });

    function showLetter(index) {

        const letter = letters[index];

        questionElement.textContent =
            letter.question;

        letterPaper.innerHTML = "";

        const image =
            document.createElement("img");

        image.alt = "Your letter";

        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "contain";
        image.style.display = "none";

        image.onload = () => {
            image.style.display = "block";
        };

        image.onerror = () => {
            console.log(
                "Letter image could not be loaded:",
                letter.image
            );
        };

        image.src = letter.image;

        letterPaper.appendChild(image);
    }

    function openPuzzle() {

        const letter = letters[currentLetter];

        questionElement.textContent =
            letter.question;

        answerInput.value = "";
        message.textContent = "";

        puzzleOverlay.classList.add("active");

        setTimeout(() => {
            answerInput.focus();
        }, 150);
    }

    function unlockLetter() {

        const answer =
            answerInput.value
                .toLowerCase()
                .trim();

        const correctAnswer =
            letters[currentLetter].answer
                .toLowerCase()
                .trim();

        if (answer !== correctAnswer) {

            message.textContent =
                "Not quite... try again. ♡";

            return;
        }

        message.textContent =
            "Unlocked! 💌";

        createConfetti();

        setTimeout(() => {

            puzzleOverlay.classList.remove("active");

            envelope.classList.remove(
                "letter-out"
            );

            envelope.classList.add(
                "opening"
            );

            setTimeout(() => {

                envelope.classList.add(
                    "letter-out"
                );

                openButton.style.display =
                    "none";

                showNextLetterButton();

            }, 850);

        }, 500);
    }

    function showNextLetterButton() {

        if (nextLetterButton) {
            nextLetterButton.remove();
        }

        if (
            currentLetter >=
            letters.length - 1
        ) {
            createFinishedMessage();
            return;
        }

        nextLetterButton =
            document.createElement("button");

        nextLetterButton.textContent =
            "Read another letter";

        nextLetterButton.className =
            "next-letter-button";

        nextLetterButton.addEventListener(
            "click",
            prepareNextLetter
        );

        document.querySelector("main")
            .appendChild(nextLetterButton);
    }

    function prepareNextLetter() {

        nextLetterButton.remove();
        nextLetterButton = null;

        envelope.classList.remove(
            "letter-out"
        );

        setTimeout(() => {

            envelope.classList.remove(
                "opening"
            );

            setTimeout(() => {

                currentLetter++;

                showLetter(currentLetter);

                openPuzzle();

            }, 800);

        }, 900);
    }

    function createFinishedMessage() {

        const finished =
            document.createElement("p");

        finished.className =
            "finished-message";

        finished.textContent =
            "That's all for now... 💌";

        document.querySelector("main")
            .appendChild(finished);
    }

    function createConfetti() {

        confettiContainer.innerHTML = "";

        const colors = [
            "#f4c94d",
            "#e98ca2",
            "#8eb7d1",
            "#92aa76",
            "#c39acb",
            "#f2a65a",
            "#f8df83"
        ];

        for (let i = 0; i < 120; i++) {

            const piece =
                document.createElement("span");

            piece.className =
                "confetti";

            piece.style.left =
                Math.random() * 100 + "%";

            piece.style.backgroundColor =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];

            piece.style.setProperty(
                "--duration",
                2.8 +
                Math.random() * 2.5 +
                "s"
            );

            piece.style.setProperty(
                "--drift1",
                Math.random() * 180 -
                90 +
                "px"
            );

            piece.style.setProperty(
                "--drift2",
                Math.random() * 260 -
                130 +
                "px"
            );

            piece.style.setProperty(
                "--drift3",
                Math.random() * 320 -
                160 +
                "px"
            );

            piece.style.animationDelay =
                Math.random() * 0.5 +
                "s";

            if (Math.random() > 0.65) {
                piece.style.borderRadius =
                    "50%";
            }

            confettiContainer.appendChild(
                piece
            );
        }

        setTimeout(() => {
            confettiContainer.innerHTML = "";
        }, 6500);
    }

});