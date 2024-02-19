function calculateSimilarity(str1, str2) {
    function calculateDistance(str1, str2) {
        const matrix = Array.from({ length: str1.length + 1 }, () => Array.from({ length: str2.length + 1 }, (_, i) => i));
        
        for (let i = 1; i <= str1.length; i++) {
            for (let j = 1; j <= str2.length; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
        
        return matrix[str1.length][str2.length];
    }

    const distance = calculateDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = 1 - distance / maxLength;

    return { string1: str1, string2: str2, similarity: similarity * 100 };
}
