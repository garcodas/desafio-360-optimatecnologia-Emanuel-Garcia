-- --------CREATE DATABASE--------
CREATE DATABASE GDA0011_OT_Emanuel_Garcia
GO
-- --------CREATE DATABASE--------

-- --------CLIENT TABLE--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[Client]    Script Date: 12/4/2024 10:46:40 PM ******/

CREATE TABLE [dbo].[Client](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [varchar](245) NULL,
	[TradeName] [varchar](245) NULL,
	[DeliveryAddress] [varchar](345) NOT NULL,
	[Phone] [varchar](45) NOT NULL,
	[Email] [varchar](45) NOT NULL,
	[CreatedAt] [date] NOT NULL,
	[ModifiedAt] [date] NULL ,
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
-- --------CLIENT TABLE--------


-- --------ROL TABLE--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[Role]    Script Date: 12/4/2024 10:47:44 PM ******/

CREATE TABLE [dbo].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](45) NOT NULL,
	[CreatedAt] [date] NOT NULL,
	[ModifiedAt] [date] NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- --------ROL TABLE--------
-- --------STATUS TABLE--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[Status]    Script Date: 12/4/2024 10:51:08 PM ******/

CREATE TABLE [dbo].[Status](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](45) NOT NULL,
	[CreatedAt] [date] NOT NULL,
	[ModifiedAt] [date] NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
-- --------STATUS TABLE--------
-- --------USER TABLE--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[User]    Script Date: 12/4/2024 10:51:49 PM ******/
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](45) NOT NULL,
	[FullName] [varchar](250) NOT NULL,
	[PasswordHash] [varchar](max) NOT NULL,
	[Phone] [varchar](45) NOT NULL,
	[BirthDate] [date] NOT NULL,
	[RoleId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[ClientId] [int] NOT NULL,
	[CreatedAt] [date] NOT NULL,
	[ModifiedAt] [date] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Client] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([Id])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Client]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([Id])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Role]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Status] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([Id])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Status]
GO
-- --------USER TABLE--------
-- --------USER SESSION--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[UserSession]    Script Date: 12/20/2024 9:16:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserSession](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Token] [varchar](max) NOT NULL,
	[UserId] [int] NOT NULL,
	[ExpiresAt] [date] NOT NULL,
	[CreatedAt] [date] NOT NULL,
 CONSTRAINT [PK_UserSession] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserSession]  WITH CHECK ADD  CONSTRAINT [FK_UserSession_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[UserSession] CHECK CONSTRAINT [FK_UserSession_User]
GO


-- --------USER SESSION--------
-- --------PRODUCTCATEGORY TABLE--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[ProductCategory]    Script Date: 12/4/2024 10:53:03 PM ******/

CREATE TABLE [dbo].[ProductCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](45) NOT NULL,
	[UserId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[CreatedAt] [date] NOT NULL,
	[ModifiedAt] [date] NULL,
 CONSTRAINT [PK_ProductCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ProductCategory]  WITH CHECK ADD  CONSTRAINT [FK_ProductCategory_Status] FOREIGN KEY([UserId])
REFERENCES [dbo].[Status] ([Id])
GO

ALTER TABLE [dbo].[ProductCategory] CHECK CONSTRAINT [FK_ProductCategory_Status]
GO

ALTER TABLE [dbo].[ProductCategory]  WITH CHECK ADD  CONSTRAINT [FK_ProductCategory_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[ProductCategory] CHECK CONSTRAINT [FK_ProductCategory_User]
GO
-- --------PRODUCTCATEGORY TABLE--------
-- --------PRODUCT TABLE--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[Product]    Script Date: 12/4/2024 10:53:56 PM ******/

CREATE TABLE [dbo].[Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](45) NOT NULL,
	[Brand] [varchar](45) NOT NULL,
	[BarCode] [varchar](45) NOT NULL,
	[Stock] [float] NOT NULL,
	[Price] [float] NOT NULL,
	[ImageUrl] [varchar](max) NOT NULL,
	[ProductCategoryId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[CreatedAt] [date] NOT NULL,
	[ModifiedAt] [date] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- --------PRODUCT TABLE--------
-- --------ORDER TABLE--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[Order]    Script Date: 12/4/2024 10:54:40 PM ******/

CREATE TABLE [dbo].[Order](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [varchar](max) NOT NULL,
	[Address] [varchar](max) NOT NULL,
	[Phone] [varchar](45) NOT NULL,
	[Email] [varchar](45) NOT NULL,
	[DeliveryDate] [date] NULL,
	[Total] [float] NULL,
	[CreatedAt] [date] NOT NULL,
	[ModifiedAt] [date] NULL,
	[UserId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Status] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([Id])
GO

ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Status]
GO

ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_User]
GO
-- --------ORDER TABLE--------
-- --------ORDERDETAIL TABLE--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

/****** Object:  Table [dbo].[OrderDetail]    Script Date: 12/4/2024 10:55:11 PM ******/
CREATE TABLE [dbo].[OrderDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Qty] [float] NOT NULL,
	[UnitPrice] [float] NOT NULL,
	[SubTotal] [float] NOT NULL,
	[OrderId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
 CONSTRAINT [PK_OrderDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO

ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Order]
GO

ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO

ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Product]
GO
-- --------ORDERDETAIL TABLE--------

-- --------STORED PROCEDURES--------
-- --------CLIENT--------
-- Insert Client
CREATE PROCEDURE InsertClient
	@CompanyName VARCHAR(245) = NULL,
    @TradeName VARCHAR(245) = NULL,
    @DeliveryAddress VARCHAR(345),
    @Phone VARCHAR(45),
    @Email VARCHAR(45)
AS
BEGIN
    INSERT INTO [dbo].[Client] ([CompanyName], [TradeName], [DeliveryAddress], [Phone], [Email], [CreatedAt])
    VALUES (@CompanyName, @TradeName, @DeliveryAddress, @Phone, @Email, GETDATE());
END;
GO

-- Update Client
CREATE PROCEDURE UpdateClient
    @Id INT,
    @CompanyName VARCHAR(245) = NULL,
    @TradeName VARCHAR(245) = NULL,
    @DeliveryAddress VARCHAR(345),
    @Phone VARCHAR(45),
    @Email VARCHAR(45)
AS
BEGIN
    UPDATE [dbo].[Client]
    SET [CompanyName] = @CompanyName, 
        [TradeName] = @TradeName, 
        [DeliveryAddress] = @DeliveryAddress, 
        [Phone] = @Phone, 
        [Email] = @Email, 
        [ModifiedAt] = GETDATE()
    WHERE [Id] = @Id;
END;
GO

-- Delete Client
CREATE PROCEDURE DeleteClient
    @Id INT
AS
BEGIN
    DELETE FROM [dbo].[Client] WHERE [Id] = @Id;
END;
GO

-- --------CLIENT--------
-- --------ROLE--------
-- Insert Role
CREATE PROCEDURE InsertRole
    @Name VARCHAR(45)
AS
BEGIN
    INSERT INTO [dbo].[Role] ([Name], [CreatedAt])
    VALUES (@Name, GETDATE());
END;
GO

-- Update Role
CREATE PROCEDURE UpdateRole
    @Id INT,
    @Name VARCHAR(45)
AS
BEGIN
    UPDATE [dbo].[Role]
    SET [Name] = @Name, [ModifiedAt] = GETDATE()
    WHERE [Id] = @Id;
END;
GO

-- Delete Role
CREATE PROCEDURE DeleteRole
    @Id INT
AS
BEGIN
    DELETE FROM [dbo].[Role] WHERE [Id] = @Id;
END;
GO

-- --------ROLE--------
-- --------STATUS--------
-- Insert Status
CREATE PROCEDURE InsertStatus
    @Name VARCHAR(45)
AS
BEGIN
    INSERT INTO [dbo].[Status] ([Name], [CreatedAt])
    VALUES (@Name, GETDATE());
END;
GO

-- Update Status
CREATE PROCEDURE UpdateStatus
    @Id INT,
    @Name VARCHAR(45)
AS
BEGIN
    UPDATE [dbo].[Status]
    SET [Name] = @Name, [ModifiedAt] = GETDATE()
    WHERE [Id] = @Id;
END;
GO

-- Delete Status
CREATE PROCEDURE DeleteStatus
    @Id INT
AS
BEGIN
    DELETE FROM [dbo].[Status] WHERE [Id] = @Id;
END;
GO

-- --------STATUS--------
-- --------USER--------
-- Insert User
CREATE PROCEDURE InsertUser
    @Email VARCHAR(45),
    @FullName VARCHAR(250),
    @PasswordHash VARCHAR(MAX),
    @Phone VARCHAR(45),
    @BirthDate DATE,
    @RoleId INT,
    @StatusId INT,
    @ClientId INT
AS
BEGIN
    INSERT INTO [dbo].[User] ([Email], [FullName], [PasswordHash], [Phone], [BirthDate], [RoleId], [StatusId], [ClientId], [CreatedAt])
    VALUES (@Email, @FullName, @PasswordHash, @Phone, @BirthDate, @RoleId, @StatusId, @ClientId, GETDATE());
END;
GO

-- Update User
CREATE PROCEDURE UpdateUser
    @Id INT,
    @Email VARCHAR(45),
    @FullName VARCHAR(250),
    @PasswordHash VARCHAR(MAX),
    @Phone VARCHAR(45),
    @BirthDate DATE,
    @RoleId INT,
    @StatusId INT,
    @ClientId INT
AS
BEGIN
    UPDATE [dbo].[User]
    SET [Email] = @Email,
        [FullName] = @FullName,
        [PasswordHash] = @PasswordHash,
        [Phone] = @Phone,
        [BirthDate] = @BirthDate,
        [RoleId] = @RoleId,
        [StatusId] = @StatusId,
        [ClientId] = @ClientId,
        [ModifiedAt] = GETDATE()
    WHERE [Id] = @Id;
END;
GO

-- Delete User
CREATE PROCEDURE DeleteUser
    @Id INT
AS
BEGIN
    DELETE FROM [dbo].[User] WHERE [Id] = @Id;
END;
GO

-- --------USER--------
-- --------PRODUCTCATEGORY--------
-- Insert ProductCategory
CREATE PROCEDURE InsertProductCategory
    @Name VARCHAR(45),
    @UserId INT,
    @StatusId INT
AS
BEGIN
    INSERT INTO [dbo].[ProductCategory] ([Name], [UserId], [StatusId], [CreatedAt])
    VALUES (@Name, @UserId, @StatusId, GETDATE());
END;
GO

-- Update ProductCategory
CREATE PROCEDURE UpdateProductCategory
    @Id INT,
    @Name VARCHAR(45),
    @UserId INT,
    @StatusId INT
AS
BEGIN
    UPDATE [dbo].[ProductCategory]
    SET [Name] = @Name, [UserId] = @UserId, [StatusId] = @StatusId, [ModifiedAt] = GETDATE()
    WHERE [Id] = @Id;
END;
GO

-- Delete ProductCategory
CREATE PROCEDURE DeleteProductCategory
    @Id INT
AS
BEGIN
    DELETE FROM [dbo].[ProductCategory] WHERE [Id] = @Id;
END;
GO

-- --------PRODUCTCATEGORY--------
-- --------PRODUCT--------
-- Insert Product
CREATE PROCEDURE InsertProduct
    @Name VARCHAR(45),
    @Brand VARCHAR(45),
    @BarCode VARCHAR(45),
    @Stock FLOAT,
    @Price FLOAT,
    @ImageUrl VARCHAR(MAX),
    @ProductCategoryId INT,
    @UserId INT,
    @StatusId INT
AS
BEGIN
    INSERT INTO [dbo].[Product] ([Name], [Brand], [BarCode], [Stock], [Price], [ImageUrl], [ProductCategoryId], [UserId], [StatusId], [CreatedAt])
    VALUES (@Name, @Brand, @BarCode, @Stock, @Price, @ImageUrl, @ProductCategoryId, @UserId, @StatusId, GETDATE());
END;
GO

-- Update Product
CREATE PROCEDURE UpdateProduct
    @Id INT,
    @Name VARCHAR(45),
    @Brand VARCHAR(45),
    @BarCode VARCHAR(45),
    @Stock FLOAT,
    @Price FLOAT,
    @ImageUrl VARCHAR(MAX),
    @ProductCategoryId INT,
    @UserId INT,
    @StatusId INT
AS
BEGIN
    UPDATE [dbo].[Product]
    SET [Name] = @Name, 
        [Brand] = @Brand, 
        [BarCode] = @BarCode, 
        [Stock] = @Stock, 
        [Price] = @Price, 
        [ImageUrl] = @ImageUrl, 
        [ProductCategoryId] = @ProductCategoryId, 
        [UserId] = @UserId, 
        [StatusId] = @StatusId, 
        [ModifiedAt] = GETDATE()
    WHERE [Id] = @Id;
END;
GO

-- Delete Product
CREATE PROCEDURE DeleteProduct
    @Id INT
AS
BEGIN
    DELETE FROM [dbo].[Product] WHERE [Id] = @Id;
END;
GO

-- --------PRODUCT--------
-- --------ORDER--------
-- Insert Order
CREATE PROCEDURE InsertOrder
    @FullName VARCHAR(MAX),
    @Address VARCHAR(MAX),
    @Phone VARCHAR(45),
    @Email VARCHAR(45),
    @DeliveryDate date,
    @Total FLOAT,
    @UserId INT,
    @StatusId INT
AS
BEGIN
    INSERT INTO [dbo].[Order] ([FullName], [Address], [Phone], [Email], [DeliveryDate], [Total], [UserId], [StatusId], [CreatedAt])
    VALUES (@FullName, @Address, @Phone, @Email, @DeliveryDate, @Total, @UserId, @StatusId, GETDATE());
END;
GO

-- Update Order
CREATE PROCEDURE UpdateOrder
    @Id INT,
    @FullName VARCHAR(MAX),
    @Address VARCHAR(MAX),
    @Phone VARCHAR(45),
    @Email VARCHAR(45),
    @DeliveryDate date,
    @Total FLOAT,
    @UserId INT,
    @StatusId INT
AS
BEGIN
    UPDATE [dbo].[Order]
    SET [FullName] = @FullName,
        [Address] = @Address,
        [Phone] = @Phone,
        [Email] = @Email,
        [DeliveryDate] = @DeliveryDate,
        [Total] = @Total,
        [UserId] = @UserId,
        [StatusId] = @StatusId,
        [ModifiedAt] = GETDATE()
    WHERE [Id] = @Id;
END;
GO

-- Delete Order
CREATE PROCEDURE DeleteOrder
    @Id INT
AS
BEGIN
    DELETE FROM [dbo].[Order] WHERE [Id] = @Id;
END;
GO

-- --------ORDER--------
-- --------ORDERDETAIL--------
-- Insert OrderDetail
CREATE PROCEDURE InsertOrderDetail
    @Qty FLOAT,
    @UnitPrice FLOAT,
    @SubTotal FLOAT,
    @OrderId INT,
    @ProductId INT
AS
BEGIN
    INSERT INTO [dbo].[OrderDetail] ([Qty], [UnitPrice], [SubTotal], [OrderId], [ProductId])
    VALUES (@Qty, @UnitPrice, @SubTotal, @OrderId, @ProductId);
END;
GO

-- Update OrderDetail
CREATE PROCEDURE UpdateOrderDetail
    @Id INT,
    @Qty FLOAT,
    @UnitPrice FLOAT,
    @SubTotal FLOAT,
    @OrderId INT,
    @ProductId INT
AS
BEGIN
    UPDATE [dbo].[OrderDetail]
    SET [Qty] = @Qty, 
        [UnitPrice] = @UnitPrice, 
        [SubTotal] = @SubTotal, 
        [OrderId] = @OrderId, 
        [ProductId] = @ProductId
    WHERE [Id] = @Id;
END;
GO

-- Delete OrderDetail
CREATE PROCEDURE DeleteOrderDetail
    @Id INT
AS
BEGIN
    DELETE FROM [dbo].[OrderDetail] WHERE [Id] = @Id;
END;
GO

-- --------ORDERDETAIL--------
-- --------STORED PROCEDURES--------
-- --------VIEWS--------
CREATE VIEW vw_ActiveProductsWithStock AS
SELECT COUNT(*) AS TotalActiveProducts
FROM [dbo].[Product]
WHERE [Stock] > 0 AND [StatusId] = (SELECT [Id] FROM [dbo].[Status] WHERE [Name] = 'Activo');
GO
CREATE VIEW vw_TotalOrdersAugust2024 AS
SELECT SUM([Total]) AS TotalQuetzales
FROM [dbo].[Order]
WHERE YEAR([CreatedAt]) = 2024 AND MONTH([CreatedAt]) = 8;
GO
CREATE VIEW vw_Top10ClientsWithHighestOrders AS
SELECT TOP 10
    C.[Id],
    C.[CompanyName],
    SUM(O.[Total]) AS TotalOrderConsumption
FROM [dbo].[Client] C
JOIN [dbo].[User] U ON C.[Id] = U.[ClientId]
JOIN [dbo].[Order] O ON U.[Id] = O.[UserId]
GROUP BY C.[Id], C.[CompanyName]
ORDER BY TotalOrderConsumption DESC;
GO
CREATE VIEW vw_Top10MostSoldProducts AS
SELECT TOP 10
    P.[Id],
    P.[Name],
    SUM(OD.[Qty]) AS TotalQuantitySold
FROM [dbo].[Product] P
JOIN [dbo].[OrderDetail] OD ON P.[Id] = OD.[ProductId]
GROUP BY P.[Id], P.[Name]
ORDER BY TotalQuantitySold ASC;
GO

-- --------VIEWS--------
-- --------DATA--------
-- --------ROLES--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

INSERT INTO [dbo].[Role]
           ([Name]
           ,[CreatedAt]
           ,[ModifiedAt])
     VALUES
           ('Admin'
           ,GETDATE()
           ,NULL)
GO

INSERT INTO [dbo].[Role]
           ([Name]
           ,[CreatedAt]
           ,[ModifiedAt])
     VALUES
           ('Client'
           ,GETDATE()
           ,NULL)
GO
-- --------ROLES--------

-- --------STATUS--------
USE [GDA0011_OT_Emanuel_Garcia]
GO

INSERT INTO [dbo].[Status]
           ([Name]
           ,[CreatedAt]
           ,[ModifiedAt])
     VALUES
           ('Active'
           ,GETDATE()
           ,NULL)
GO

USE [GDA0011_OT_Emanuel_Garcia]
GO

INSERT INTO [dbo].[Status]
           ([Name]
           ,[CreatedAt]
           ,[ModifiedAt])
     VALUES
           ('Inactive'
           ,GETDATE()
           ,NULL)
GO

-- --------STATUS--------
-- --------CLIENT--------
-- ADMIN CLIENT TO ADMIN USERS
-- TECHNICAL DEBT: CHANGE RELATIONS, USER SHOULD NOT DEPENDS OF CLIENT (EMANUEL GARCIA)
USE [GDA0011_OT_Emanuel_Garcia]
GO

INSERT INTO [dbo].[Client]
           ([CompanyName]
           ,[TradeName]
           ,[DeliveryAddress]
           ,[Phone]
           ,[Email]
           ,[CreatedAt]
           ,[ModifiedAt])
     VALUES
           ('Admin'
           ,'Admin'
           ,'Admin'
           ,'Admin'
           ,'admin'
           ,GETDATE()
           ,null)
GO
-- --------CLIENT--------

-- --------DATA--------