CREATE TABLE Staff_Information(
    StaffID BIGINT PRIMARY KEY,
    StaffName VARCHAR(255),
    Position VARCHAR(255),
    Gmail VARCHAR(255),
    PhoneNumber BIGINT
);
INSERT INTO Staff_Information (StaffID, StaffName, Position, Gmail, PhoneNumber) VALUES 
    (100001, 'ycy.yo', 'clerk', 'ycy.yo@gmail.com', '0909090909'), 
    (100002, 'amber chen', 'admin', 'hello@world', '0910101010'),
    (100003, 'whoami', 'customer', 'who@ami', '0911111111');