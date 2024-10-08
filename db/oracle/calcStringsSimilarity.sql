CREATE OR REPLACE FUNCTION calculate_similarity(str1 IN VARCHAR2, str2 IN VARCHAR2)
RETURN NUMBER IS
    -- Declarando variáveis antes da função aninhada
    distance   NUMBER;
    maxLength  NUMBER;
    similarity NUMBER;

    -- Função aninhada para calcular a distância de Levenshtein
    FUNCTION calculate_distance(s1 IN VARCHAR2, s2 IN VARCHAR2)
    RETURN NUMBER IS
        len_s1 NUMBER := LENGTH(s1);
        len_s2 NUMBER := LENGTH(s2);
        matrix SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(); -- Matriz dinâmica para a distância
        i      NUMBER;
        j      NUMBER;
        cost   NUMBER;
        min_val NUMBER;
    BEGIN
        -- Inicializando a matriz de distâncias
        FOR i IN 0..len_s1 LOOP
            matrix.EXTEND(len_s2 + 1);
            FOR j IN 0..len_s2 LOOP
                IF i = 0 THEN
                    matrix(i * (len_s2 + 1) + j + 1) := j;
                ELSIF j = 0 THEN
                    matrix(i * (len_s2 + 1) + j + 1) := i;
                ELSE
                    matrix(i * (len_s2 + 1) + j + 1) := 0;
                END IF;
            END LOOP;
        END LOOP;

        -- Preenchendo a matriz de distâncias
        FOR i IN 1..len_s1 LOOP
            FOR j IN 1..len_s2 LOOP
                cost := CASE WHEN SUBSTR(s1, i, 1) = SUBSTR(s2, j, 1) THEN 0 ELSE 1 END;
                min_val := LEAST(
                    matrix((i - 1) * (len_s2 + 1) + j + 1) + 1, -- Inserção
                    matrix(i * (len_s2 + 1) + (j - 1) + 1) + 1, -- Remoção
                    matrix((i - 1) * (len_s2 + 1) + (j - 1) + 1) + cost -- Substituição
                );
                matrix(i * (len_s2 + 1) + j + 1) := min_val;
            END LOOP;
        END LOOP;

        RETURN matrix(len_s1 * (len_s2 + 1) + len_s2 + 1); -- Retorna a distância de Levenshtein
    END calculate_distance;

BEGIN
    -- Calcula a distância de Levenshtein entre as duas strings
    distance := calculate_distance(str1, str2);

    -- Calcula o comprimento máximo entre as duas strings
    maxLength := GREATEST(LENGTH(str1), LENGTH(str2));

    -- Se maxLength for zero, ambas as strings são vazias, então a similaridade é 100%
    IF maxLength = 0 THEN
        similarity := 100;
    ELSE
        -- Calcula a similaridade como 1 menos a razão entre a distância e o comprimento máximo
        similarity := (1 - (distance / maxLength)) * 100;
    END IF;

    RETURN similarity;
END calculate_similarity;
