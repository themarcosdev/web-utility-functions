CREATE OR REPLACE FUNCTION db_owner.await_sleep(seconds IN NUMBER) RETURN NUMBER
AS
    PRAGMA AUTONOMOUS_TRANSACTION;
    message VARCHAR2(200);
    status  INTEGER;
BEGIN
    DBMS_ALERT.WAITONE('noname', message, status, seconds);
    ROLLBACK;
    RETURN seconds;
END;
