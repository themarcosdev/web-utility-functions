DELIMITER //

CREATE OR REPLACE FUNCTION await_sleep(seconds INT) RETURNS INT
BEGIN
    DO SLEEP(seconds);
    RETURN seconds;
END //

DELIMITER ;
