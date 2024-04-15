-- Tạo extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tạo bảng Admin
CREATE TABLE Admin (
    AdminId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Email VARCHAR(255) NOT NULL UNIQUE,
    UserName VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Fullname VARCHAR(100) NOT NULL
);

-- Chèn dữ liệu cơ bản cho bảng Admin
INSERT INTO Admin (Email, UserName, Password, Fullname)
VALUES 
    ('admin1@example.com', 'admin1', 'hashedpassword1', 'Admin 1'),
    ('admin2@example.com', 'admin2', 'hashedpassword2', 'Admin 2');

-- Tạo bảng User
CREATE TABLE "User" (
    UserId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    UserName VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Fullname VARCHAR(100) NOT NULL,
    Street VARCHAR(255),
    Commune VARCHAR(255),
    District VARCHAR(255),
    Province VARCHAR(255),
    PhoneNumber VARCHAR(15),
    IndentityCard VARCHAR(255),
    Status BOOLEAN,
    Role VARCHAR(20),
    Avatar TEXT
);

-- Chèn dữ liệu cơ bản cho bảng User
INSERT INTO "User" (UserName, Email, Password, Fullname, Street, Commune, District, Province, PhoneNumber, IndentityCard, Status, Role, Avatar)
VALUES 
    ('user1', 'user1@example.com', 'hashedpassword1', 'User 1', '123 Street A', 'Commune A', 'District A', 'Province A', '123456789', 'ID123456789', TRUE, 'customer', 'avatar1.jpg'),
    ('user2', 'user2@example.com', 'hashedpassword2', 'User 2', '456 Street B', 'Commune B', 'District B', 'Province B', '987654321', 'ID987654321', TRUE, 'farmer', 'avatar2.jpg');

-- Tạo bảng Farm
CREATE TABLE Farm (
    FarmId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    UserId UUID,
    FarmName VARCHAR(100) NOT NULL,
    FarmStreet VARCHAR(255),
    FarmCommune VARCHAR(255),
    FarmDistrict VARCHAR(255),
    FarmProvince VARCHAR(255),
    FarmDes TEXT,
    FarmAddress TEXT,
    FarmArea NUMERIC,
    FarmType VARCHAR(255)
);

-- Chèn dữ liệu cơ bản cho bảng Farm
INSERT INTO Farm (UserId, FarmName, FarmStreet, FarmCommune, FarmDistrict, FarmProvince, FarmDes, FarmAddress, FarmArea, FarmType)
VALUES 
    ('cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'Farm 1', '123 Farm Street', 'Farm Commune', 'Farm District', 'Farm Province', 'Description for Farm 1', 'Farm Address 1', 100.5, 'Type 1'),
    ('cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'Farm 2', '456 Farm Street', 'Farm Commune', 'Farm District', 'Farm Province', 'Description for Farm 2', 'Farm Address 2', 75.3, 'Type 2');

-- Tạo bảng Crop
CREATE TABLE Crop (
    FarmId UUID,
    ProductId UUID,
    CropName VARCHAR(100) NOT NULL,
    CropDes TEXT,
    PlantArea NUMERIC,
    HarvestDate DATE,
    EstimatedYield NUMERIC,
    CropStatus VARCHAR(20),
    PlantDate DATE
);

-- Chèn dữ liệu cơ bản cho bảng Crop
INSERT INTO Crop (FarmId, ProductId, CropName, CropDes, PlantArea, HarvestDate, EstimatedYield, CropStatus, PlantDate)
VALUES 
    ('82b0e721-8405-43e2-8f53-80f39414a81b', 'd1220d94-9d13-49c0-9f75-7bcf57051b7d', 'Crop 1', 'Description for Crop 1', 50.2, '2024-04-09', 500, 'Growing', '2024-01-01'),
    ('54d334b4-0c8a-4d36-b43d-9dbdab4bf5c5', 'cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'Crop 2', 'Description for Crop 2', 25.5, '2024-04-09', 300, 'Harvested', '2023-12-01');

-- Tạo bảng Category
CREATE TABLE Category (
    CategoryId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    UserId UUID,
    CategoryName VARCHAR(100) NOT NULL,
    CategoryImage TEXT,
    CategoryDes TEXT
);

-- Chèn dữ liệu cơ bản cho bảng Category
INSERT INTO Category (UserId, CategoryName, CategoryImage, CategoryDes)
VALUES 
    ('cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'Category 1', 'category1.jpg', 'Description for Category 1'),
    ('cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'Category 2', 'category2.jpg', 'Description for Category 2');

-- Tạo bảng Product
CREATE TABLE Product (
    ProductId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    FarmerId UUID,
    CategoryId UUID,
    ProductName VARCHAR(100) NOT NULL,
    ProductImage1 TEXT,
    ProductImage2 TEXT,
    ProductImage3 TEXT,
    HealtBenefit TEXT,
    StorageMethod TEXT,
    CookingMethod TEXT,
    OverviewDes TEXT,
    ProductPrice NUMERIC,
    ProductQuantity INTEGER,
    ExpiryDate DATE
);

-- Chèn dữ liệu cơ bản cho bảng Product
INSERT INTO Product (FarmerId, CategoryId, ProductName, ProductImage1, ProductImage2, ProductImage3, HealtBenefit, StorageMethod, CookingMethod, OverviewDes, ProductPrice, ProductQuantity, ExpiryDate)
VALUES 
    ('cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'f2c1c7f4-1072-4b4f-8767-f4b547f21b1a', 'Product 1', 'product1.jpg', 'product1_2.jpg', 'product1_3.jpg', 'Health benefits of Product 1', 'Storage method for Product 1', 'Cooking method for Product 1', 'Overview description for Product 1', 10.5, 100, '2024-12-31'),
    ('cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'f2c1c7f4-1072-4b4f-8767-f4b547f21b1a', 'Product 2', 'product2.jpg', 'product2_2.jpg', 'product2_3.jpg', 'Health benefits of Product 2', 'Storage method for Product 2', 'Cooking method for Product 2', 'Overview description for Product 2', 8.75, 150, '2024-11-30');

-- Tạo bảng Cart
CREATE TABLE Cart (
    CartId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    UserId UUID,
    ProductId UUID,
    QuantityOfCart INTEGER
);

-- Chèn dữ liệu cơ bản cho bảng Cart
INSERT INTO Cart (UserId, ProductId, QuantityOfCart)
VALUES 
    ('d1220d94-9d13-49c0-9f75-7bcf57051b7d', 'ee9c5d95-f5c9-4875-88c3-464ecfb8e393', 2),
    ('d1220d94-9d13-49c0-9f75-7bcf57051b7d', '5f15b744-c04d-4b78-8e35-38b5fb0c8a0e', 1);

-- Tạo bảng Order
CREATE TABLE "Order" (
    OrderId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    TotalAmount NUMERIC,
    EstimateDelivery DATE,
    ShippingAddress TEXT,
    OrderStatus VARCHAR(20),
    OrderTime TIMESTAMP,
    UserId UUID
);

-- Chèn dữ liệu cơ bản cho bảng Order
INSERT INTO "Order" (TotalAmount, EstimateDelivery, ShippingAddress, OrderStatus, OrderTime, UserId)
VALUES 
    (25.5, '2024-04-15', '123 Shipping Street', 'Processing', CURRENT_TIMESTAMP, 'd1220d94-9d13-49c0-9f75-7bcf57051b7d'),
    (35.75, '2024-04-20', '456 Shipping Street', 'Processing', CURRENT_TIMESTAMP, 'd1220d94-9d13-49c0-9f75-7bcf57051b7d');

-- Tạo bảng OrderItem
CREATE TABLE OrderItem (
    OrderId UUID,
    ProductId UUID,
    QuantityOfItem INTEGER
);

-- Chèn dữ liệu cơ bản cho bảng OrderItem
INSERT INTO OrderItem (OrderId, ProductId, QuantityOfItem)
VALUES 
    ('1313c4ee-b8ee-4a3e-9d09-089f110f2f47', 'ee9c5d95-f5c9-4875-88c3-464ecfb8e393', 2),
    ('1313c4ee-b8ee-4a3e-9d09-089f110f2f47', '5f15b744-c04d-4b78-8e35-38b5fb0c8a0e', 1);

-- Tạo bảng Payment
CREATE TABLE Payment (
    PaymentId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    OrderId UUID,
    UserId UUID,
    PaymentMethod VARCHAR(50),
    TransactionID VARCHAR(100),
    Amount NUMERIC,
    PaymentTime TIMESTAMP,
    PaymentStatus VARCHAR(20)
);

-- Chèn dữ liệu cơ bản cho bảng Payment
INSERT INTO Payment (OrderId, UserId, PaymentMethod, TransactionID, Amount, PaymentTime, PaymentStatus)
VALUES 
    ('1313c4ee-b8ee-4a3e-9d09-089f110f2f47', 'd1220d94-9d13-49c0-9f75-7bcf57051b7d', 'Credit Card', '1234567890', 25.5, CURRENT_TIMESTAMP, 'Success'),
    ('1313c4ee-b8ee-4a3e-9d09-089f110f2f47', 'd1220d94-9d13-49c0-9f75-7bcf57051b7d', 'Bank Transfer', '0987654321', 35.75, CURRENT_TIMESTAMP, 'Success');

-- Tạo bảng Review
CREATE TABLE Review (
    ReviewID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ProductID UUID,
    UserID UUID,
    Rating INTEGER,
    Comment TEXT,
    ReviewTime TIMESTAMP
);

-- Chèn dữ liệu cơ bản cho bảng Review
INSERT INTO Review (ProductID, UserID, Rating, Comment, ReviewTime)
VALUES 
    ('ee9c5d95-f5c9-4875-88c3-464ecfb8e393', 'd1220d94-9d13-49c0-9f75-7bcf57051b7d', 4, 'Great product!', CURRENT_TIMESTAMP),
    ('5f15b744-c04d-4b78-8e35-38b5fb0c8a0e', 'd1220d94-9d13-49c0-9f75-7bcf57051b7d', 5, 'Excellent service!', CURRENT_TIMESTAMP);

-- Tạo bảng PurchasesHistory
CREATE TABLE PurchasesHistory (
    PurchaseHistoryId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    OrderId UUID,
    UserId UUID,
    ProductId UUID,
    PaymentId UUID,
    QuantityPurchased INTEGER,
    PurchaseDate TIMESTAMP,
    TotalAmount NUMERIC
);

-- Chèn dữ liệu cơ bản cho bảng PurchasesHistory
INSERT INTO PurchasesHistory (OrderId, UserId, ProductId, PaymentId, QuantityPurchased, PurchaseDate, TotalAmount)
VALUES 
    ('1313c4ee-b8ee-4a3e-9d09-089f110f2f47', 'd1220d94-9d13-49c0-9f75-7bcf57051b7d', 'ee9c5d95-f5c9-4875-88c3-464ecfb8e393', 'eaf79938-b98a-4e3d-840d-10870c8fe0b5', 2, CURRENT_TIMESTAMP, 25.5),
    ('1313c4ee-b8ee-4a3e-9d09-089f110f2f47', 'd1220d94-9d13-49c0-9f75-7bcf57051b7d', '5f15b744-c04d-4b78-8e35-38b5fb0c8a0e', 'eaf79938-b98a-4e3d-840d-10870c8fe0b5', 1, CURRENT_TIMESTAMP, 35.75);

-- Tạo bảng Message
CREATE TABLE Message (
    MessageID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    SenderID UUID,
    ReceiverID UUID,
    Content TEXT,
    Date TIMESTAMP,
    Status BOOLEAN
);

-- Chèn dữ liệu cơ bản cho bảng Message
INSERT INTO Message (SenderID, ReceiverID, Content, Date, Status)
VALUES 
    ('d1220d94-9d13-49c0-9f75-7bcf57051b7d', 'cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'Hello, how are you?', CURRENT_TIMESTAMP, FALSE),
    ('cf6bda3c-8f22-4594-bdd8-8dc75b0ebd3d', 'd1220d94-9d13-49c0-9f75-7bcf57051b7d', 'I am good, thank you!', CURRENT_TIMESTAMP, TRUE);

select * from "User" 