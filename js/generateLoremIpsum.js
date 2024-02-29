function generateLoremIpsum(sentenceCount) {
    const loremIpsumWords = [
        'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'
    ];

    let loremIpsum = '';

    for (let i = 0; i < sentenceCount; i++) {
        for (let j = 0; j < 10; j++) { // 10 words per sentence for simplicity
            const randomIndex = Math.floor(Math.random() * loremIpsumWords.length);
            const word = loremIpsumWords[randomIndex];
            loremIpsum += word + ' ';
        }
        loremIpsum = loremIpsum.trim() + '. ';
    }

    return loremIpsum.trim();
}
