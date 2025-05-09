SELECT * FROM Customers
SELECT CustomerName, City FROM Customers;

SELECT * 
FROM Customers
WHERE Country = 'Spain' AND CustomerName LIKE 'G%';

SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;