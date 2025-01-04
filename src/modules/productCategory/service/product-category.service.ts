import dayjs from "dayjs";
import { CreateCategoryProductDto } from "../dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "../dto/update-product-category.dto";
import {
  ProductCategory,
  ProductCategoryQueryResponse,
} from "../../../types/ProductCategory";
import sequelize from "../../../config/database";
import { QueryTypes } from "sequelize";
import { InsertType } from "../../../types/InsertType";
import ProductService from "../../product/service/product.service";
class ProductCategoryService {
  private productService = new ProductService();
  async createProductCategory(
    productCategoryDto: CreateCategoryProductDto
  ): Promise<ProductCategory> {
    try {
      const newProductCategory = await sequelize.query<InsertType>(
        `EXEC InsertProductCategory @Name = :Name , @StatusId = :StatusId , @UserId = :UserId`,
        {
          replacements: {
            Name: productCategoryDto.Name,
            StatusId: productCategoryDto.StatusId,
            UserId: productCategoryDto.UserId,
          },
          type: QueryTypes.SELECT,
        }
      );
      return {
        Id: newProductCategory[0].InsertedId,
        Name: productCategoryDto.Name,
        StatusId: productCategoryDto.StatusId,
        UserId: productCategoryDto.UserId,
      };
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving product category" + error.message);
    }
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    try {
      const productCategoriesQueryResult =
        await sequelize.query<ProductCategoryQueryResponse>(
          `SELECT 
            PC.Id,
            PC.Name,
            PC.StatusId,
            PC.CreatedAt,
            S.Id AS StatusId,
            S.Name AS StatusName, 
            PC.UserId  FROM [ProductCategory] PC
          INNER JOIN [Status] S ON PC.StatusId = S.Id`,
          {
            type: QueryTypes.SELECT,
          }
        );

      const productCategories: ProductCategory[] =
        productCategoriesQueryResult.map((category) => ({
          Id: category.Id,
          Name: category.Name,
          StatusId: category.StatusId,
          UserId: category.UserId,
          Status: {
            Id: category.StatusId,
            Name: category.StatusName,
          },
        }));

      return productCategories;
    } catch (error: any) {
      throw new Error("Error getting product categories" + error.message);
    }
  }

  async getProductCategoryById(id: number): Promise<ProductCategory | null> {
    try {
      const productCategory = await sequelize.query<ProductCategory>(
        `SELECT * FROM [ProductCategory] PC
          INNER JOIN [Status] S ON PC.StatusId = S.Id
          WHERE PC.Id = :Id`,
        {
          replacements: { Id: id },
          type: QueryTypes.SELECT,
        }
      );
      return productCategory[0];
    } catch (error: any) {
      throw new Error("Error getting product category" + error.message);
    }
  }

  async updateProductCategory(
    id: number,
    productCategoryDto: UpdateProductCategoryDto
  ): Promise<ProductCategory | null> {
    try {
      const productCategory = await this.getProductCategoryById(id);
      if (!productCategory) {
        throw new Error("Error updating product category");
      }

      await sequelize.query(
        `EXEC UpdateProductCategory @Id = :Id , @Name = :Name, @UserId = :UserId , @StatusId = :StatusId`,
        {
          replacements: {
            Id: id,
            Name:
              productCategoryDto.Name === productCategory.Name
                ? productCategory.Name
                : productCategoryDto.Name,
            StatusId:
              productCategoryDto.StatusId === productCategory.StatusId
                ? productCategory.StatusId
                : productCategoryDto.StatusId,
            UserId: productCategory.UserId,
          },
          type: QueryTypes.SELECT,
        }
      );

      if (productCategoryDto.StatusId !== productCategory.StatusId) {
        const products = await this.productService.getProductsByCategoryId(id);
        products.forEach(async (product) => {
          await this.productService.updateProduct(product.Id ?? 0, {
            ...product,
            StatusId: productCategoryDto.StatusId ?? 0,
          });
        });
      }

      return productCategory;
    } catch (error: any) {
      throw new Error("Error updating product category" + error.message);
    }
  }

  async deleteProductCategory(id: number): Promise<boolean> {
    try {
      const productCategory = await this.getProductCategoryById(id);
      if (!productCategory) {
        throw new Error("Error updating product category");
      }

      await sequelize.query(`EXEC DeleteProductCategory @Id = :Id`, {
        replacements: {
          Id: id,
        },
        type: QueryTypes.SELECT,
      });
      return true;
    } catch (error: any) {
      throw new Error("Error deleting product category" + error.message);
    }
  }
}

export default ProductCategoryService;
