export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}

export function checkWin(selectedWord, correctLetters, wrongLetters) {
    let status = 'win';

    // Check for win
    selectedWord.split('').forEach((letter) => {
        if (!correctLetters.includes(letter)) {
            status = '';
        }
    });

    // Check for lose
    if (wrongLetters.length === 6) {
        status = 'lose';
    }

    return status;
}
