class Player {
    constructor(name) {
        this.name = name;
        this.rollCount = 0;
        this.total = 0;
    }

    rollDice() {
        this.rollCount++;
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;

        let roundScore = 0;
            if (dice1 === 1 || dice2 === 1) {
                roundScore = 0;
            } else if (dice1 === dice2) {
                roundScore = (dice1 + dice2) * 2;
            } else {
                roundScore = dice1 + dice2;
            }

        this.total += roundScore;

        return { dice1, dice2, roundScore };
    }

    reset() {
        this.rollCount = 0;
        this.total = 0;
    }
}

const game = {
    player1: new Player('Wizard'),
    player2: new Player('Necromancer'),
    gameFinished: false,
    canRoll: true,

    rollDice() {
        if (this.gameFinished || !this.canRoll) {
            return;
        }

        this.canRoll = false;
        const rollButton = document.getElementById('rollButton');
        rollButton.disabled = true;
        const imagesDiv = document.getElementById('images');
        const lightningImg = document.getElementById('lightning');
        const skullImg = document.getElementById('skull');
        imagesDiv.classList.remove('hidden');
        lightningImg.style.transform = 'translateX(0)';
        skullImg.style.transform = 'translateX(0)';

        setTimeout(() => {
            lightningImg.style.transform = 'translateX(23em)';
            skullImg.style.transform = 'translateX(-23em)';
        }, 10);

        setTimeout(() => {
            imagesDiv.classList.add('hidden');
            lightningImg.style.transform = 'translateX(0)';
            skullImg.style.transform = 'translateX(0)';
            rollButton.disabled = false;
            this.canRoll = true;
        }, 1000);

        const result1 = this.player1.rollDice();
        const result2 = this.player2.rollDice();

        document.getElementById('dice1Result1').textContent = result1.dice1;
        document.getElementById('dice1Result2').textContent = result1.dice2;
        document.getElementById('totalResult1').textContent = `Total: ${this.player1.total}`;
        document.getElementById('dice2Result1').textContent = result2.dice1;
        document.getElementById('dice2Result2').textContent = result2.dice2;
        document.getElementById('totalResult2').textContent = `Total: ${this.player2.total}`;

        if (this.player1.rollCount === 3 && this.player2.rollCount === 3) {
            setTimeout(() => {
                const winnerMessageArea = document.getElementById('winnerMessageArea');
                let message = '';
                let imageSrc = '';
                if (this.player1.total > this.player2.total) {
                    message = "The Wizard Wins!";
                    imageSrc = '../images/magicBook.png'; 
                } else if (this.player2.total > this.player1.total) {
                    message = "The Necromancer Wins!";
                    imageSrc = '../images/grave.png'; 
                } else {
                    message = "Tie!";
                    imageSrc = '../images/magicBook.png'; 
                }
                document.getElementById('winnerMessage').innerHTML = `<p>${message}</p><img src="${imageSrc}" alt="${message}">`;
                document.getElementById('winnerMessage').classList.remove('hidden');
                winnerMessageArea.style.display = 'inline-block';
            }, 1100);
            this.gameFinished = true;
        }
    },

    resetGame() {
        this.player1.reset();
        this.player2.reset();
        this.gameFinished = false;

        document.getElementById('dice1Result1').textContent = '-';
        document.getElementById('dice1Result2').textContent = '-';
        document.getElementById('totalResult1').textContent = 'Total: -';
        document.getElementById('dice2Result1').textContent = '-';
        document.getElementById('dice2Result2').textContent = '-';
        document.getElementById('totalResult2').textContent = 'Total: -';
        document.getElementById('winnerMessage').classList.add('hidden');
        document.getElementById('winnerMessageArea').style.display = 'none';
    }
};

function rollDice() {
    game.rollDice();
}

function resetGame() {
    game.resetGame();
}
