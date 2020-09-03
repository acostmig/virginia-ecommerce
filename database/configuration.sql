SELECT * FROM lbweb.user;

SELECT User FROM mysql.user;

GRANT ALL PRIVILEGES
ON *.*
TO root@'35.174.39.18'
IDENTIFIED BY 'abusador1'
 WITH GRANT OPTION;

REVOKE ALL PRIVILEGES, GRANT option FROM 'root'@'%';

REVOKE USAGE ON sys FROM 'root'@'67.87.53.218';

drop user 'root'@'67.87.53.218';


SELECT * from information_schema.user_privileges where grantee like "%";


