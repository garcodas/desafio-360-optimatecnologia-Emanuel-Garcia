import dayjs from "dayjs";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import sequelize from "../../../config/database";
import { InsertType } from "../../../types/InsertType";
import { QueryTypes } from "sequelize";
import { Product, ProductQueryResponse } from "../../../types/Product";
class ProductService {
  async createProduct(ProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = await sequelize.query<InsertType>(
        `EXEC InsertProduct
        @Name = :Name,
        @Brand = :Brand,
        @BarCode = :BarCode,
        @Stock = :Stock,
        @Price = :Price,
        @ImageUrl = :ImageUrl,
        @StatusId = :StatusId,
        @UserId = :UserId,
        @ProductCategoryId = :ProductCategoryId`,
        {
          replacements: {
            Name: ProductDto.Name,
            Brand: ProductDto.Brand,
            BarCode: ProductDto.BarCode,
            Stock: ProductDto.Stock,
            Price: ProductDto.Price,
            ImageUrl: ProductDto.ImageUrl,
            StatusId: ProductDto.StatusId,
            UserId: ProductDto.UserId,
            ProductCategoryId: ProductDto.ProductCategoryId,
          },
          type: QueryTypes.SELECT,
        }
      );

      return {
        Id: newProduct[0].InsertedId,
        Name: ProductDto.Name,
        Brand: ProductDto.Brand,
        BarCode: ProductDto.BarCode,
        Stock: ProductDto.Stock,
        Price: ProductDto.Price,
        ImageUrl: ProductDto.ImageUrl,
        StatusId: ProductDto.StatusId,
        UserId: ProductDto.UserId,
        ProductCategoryId: ProductDto.ProductCategoryId,
      };
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving product" + error.message);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const productsQueryResult = await sequelize.query<ProductQueryResponse>(
        `SELECT P.*,
          S.Id AS StatusId, 
          S.Name AS StatusName, 
          PC.Id AS ProductCategoryId, 
          PC.Name AS ProductCategoryName,
          PC.StatusId AS ProductCategoryStatusId,
          PC.UserId AS ProductCategoryUserId 
            FROM [Product] P 
		      INNER JOIN [Status] S ON S.Id = P.StatusId
		      INNER JOIN [ProductCategory] PC ON PC.Id = P.ProductCategoryId`,
        {
          type: QueryTypes.SELECT,
        }
      );

      const products: Product[] = productsQueryResult.map((product) => ({
        Id: product.Id,
        Name: product.Name,
        Brand: product.Name,
        BarCode: product.BarCode,
        Stock: product.Stock,
        Price: product.Price,
        ImageUrl: product.ImageUrl,
        StatusId: product.StatusId,
        ProductCategoryId: product.ProductCategoryId,
        UserId: product.UserId,
        Status: {
          Id: product.StatusId,
          Name: product.StatusName,
        },
        ProductCategory: {
          Id: product.ProductCategoryId,
          Name: product.ProductCategoryName,
          StatusId: product.ProductCategoryStatusId,
          UserId: product.ProductCategoryUserId,
        },
      }));
      return products;
    } catch (error: any) {
      throw new Error("Error getting product categories" + error.message);
    }
  }

  async getProductsByCategoryId(id: number): Promise<Product[]> {
    try {
      const productCategories = await sequelize.query<Product>(
        `SELECT * FROM Product WHERE ProductCategoryId = :ProductCategoryId`,
        {
          replacements: { ProductCategoryId: id },
          type: QueryTypes.SELECT,
        }
      );

      return productCategories;
    } catch (error: any) {
      throw new Error("Error getting product categories" + error.message);
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await sequelize.query<Product>(
        `SELECT * FROM Product WHERE Id = :Id`,
        {
          replacements: { Id: id },
          type: QueryTypes.SELECT,
        }
      );

      return product[0];
    } catch (error: any) {
      throw new Error("Error getting product category" + error.message);
    }
  }

  async updateProduct(
    id: number,
    ProductDto: UpdateProductDto
  ): Promise<Product | null> {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      await sequelize.query(
        `EXEC UpdateProduct
        @Id = :Id,
        @Name = :Name,
        @Brand = :Brand,
        @BarCode = :BarCode,
        @Stock = :Stock,
        @Price = :Price,
        @ImageUrl = :ImageUrl,
        @StatusId = :StatusId,
        @UserId = :UserId,
        @ProductCategoryId = :ProductCategoryId`,
        {
          replacements: {
            Id: id,
            Name:
              product.Name === ProductDto.Name ? product.Name : ProductDto.Name,
            Brand:
              product.Brand === ProductDto.Brand
                ? product.Brand
                : ProductDto.Brand,
            BarCode:
              product.BarCode === ProductDto.BarCode
                ? product.BarCode
                : ProductDto.BarCode,
            Stock:
              product.Stock === ProductDto.Stock
                ? product.Stock
                : ProductDto.Stock,
            Price:
              product.Price === ProductDto.Price
                ? product.Price
                : ProductDto.Price,
            ImageUrl:
              product.ImageUrl === ProductDto.ImageUrl
                ? product.ImageUrl
                : ProductDto.ImageUrl,
            StatusId:
              product.StatusId === ProductDto.StatusId
                ? product.StatusId
                : ProductDto.StatusId,
            UserId: product.UserId,
            ProductCategoryId:
              product.ProductCategoryId === ProductDto.ProductCategoryId
                ? product.ProductCategoryId
                : ProductDto.ProductCategoryId,
          },
          type: QueryTypes.SELECT,
        }
      );
      return product;
    } catch (error: any) {
      throw new Error("Error updating product" + error.message);
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      await sequelize.query(
        `EXEC DeleteProduct
        @Id = :Id`,
        {
          replacements: { Id: id },
          type: QueryTypes.SELECT,
        }
      );
      return true;
    } catch (error: any) {
      throw new Error("Error deleting product category" + error.message);
    }
  }
}

export default ProductService;
