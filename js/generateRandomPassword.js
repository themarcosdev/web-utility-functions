/**
  Generate a random password | string ;
*/
function generateRandomPassword(config) {
    let lowercaseLetters = config.lowercaseLetters ?? '';
    let numbers = config.numbers ?? '';
    let uppercaseLetters = config.uppercaseLetters ?? '';
    let symbols = config.symbols ?? ;
    let passwordLength = config.passwordLength ?? 8;

    if (!lowercaseLetters && !numbers && !uppercaseLetters && !symbols) {
        return false;
    }
  
    let allChars = lowercaseLetters + numbers + uppercaseLetters + symbols;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}

let config = {
    lowercaseLetters: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '1234567890',
    passwordLength: 10,
    uppercaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    symbols: '!@#$%^&*()'
};

