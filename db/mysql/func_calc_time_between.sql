DELIMITER //

CREATE OR REPLACE FUNCTION calcular_horarios_disponiveis(
    horario_inicio TIME,
    horario_fim TIME,
    duracao_atendimento INT
)
RETURNS JSON
BEGIN
    DECLARE total_minutos INT;
    DECLARE duracao_total INT;
    DECLARE horarios_disponiveis INT;
    DECLARE resultado INT;
    DECLARE json_resultado JSON;

    SET total_minutos = TIMESTAMPDIFF(MINUTE, horario_inicio, horario_fim);
    SET duracao_total = total_minutos / duracao_atendimento;
    SET horarios_disponiveis = FLOOR(duracao_total);

    CREATE TEMPORARY TABLE IF NOT EXISTS temp_horarios_disponiveis (
        entrada TIME,
        saida TIME
    );

    INSERT INTO temp_horarios_disponiveis (entrada, saida)
    SELECT ADDTIME(horario_inicio, SEC_TO_TIME((duracao_atendimento * (n - 1)) * 60)),
           ADDTIME(horario_inicio, SEC_TO_TIME((duracao_atendimento * n) * 60))
    FROM (
        SELECT @row := @row + 1 AS n
        FROM information_schema.columns, (SELECT @row := 0) r
        LIMIT horarios_disponiveis
    ) t
    WHERE ADDTIME(horario_inicio, SEC_TO_TIME((duracao_atendimento * n) * 60)) <= horario_fim;

    SELECT COUNT(*) INTO resultado
    FROM temp_horarios_disponiveis;

    SET json_resultado = (
        SELECT CONCAT(
            '{"total_horarios_disponiveis":', resultado, ',',
            '"total_minutos_solicitados":', duracao_atendimento, ',',
            '"horarios_disponiveis":[',
            GROUP_CONCAT(CONCAT('{"entrada":"', entrada, '", "saida":"', saida, '"}')),
            ']}'
        )
        FROM temp_horarios_disponiveis
    );

    DROP TEMPORARY TABLE IF EXISTS temp_horarios_disponiveis;

    RETURN json_resultado;
END //

DELIMITER ;


/** Exemplo : */
SELECT calcular_horarios_disponiveis('08:00:00', '11:59:00', 15) AS horarios_disponiveis;
