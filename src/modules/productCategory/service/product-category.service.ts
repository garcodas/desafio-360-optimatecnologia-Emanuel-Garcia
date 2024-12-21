import dayjs from "dayjs";
import { CreateCategoryProductDto } from "../dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "../dto/update-product-category.dto";
import { ProductCategory } from "./../model/product-category.model";
class ProductCategoryService {
  async createProductCategory(
    productCategoryDto: CreateCategoryProductDto
  ): Promise<ProductCategory> {
    try {
      const newProductCategory = await ProductCategory.create({
        Name: productCategoryDto.Name,
        UserId: productCategoryDto.UserId,
        StatusId: productCategoryDto.StatusId,
      });
      return newProductCategory;
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving product category" + error.message);
    }
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    try {
      const productCategories = await ProductCategory.findAll();
      return productCategories;
    } catch (error: any) {
      throw new Error("Error getting product categories" + error.message);
    }
  }

  async getProductCategoryById(id: number): Promise<ProductCategory | null> {
    try {
      const productCategory = await ProductCategory.findOne({
        where: {
          Id: id,
        },
      });
      return productCategory;
    } catch (error: any) {
      throw new Error("Error getting product category" + error.message);
    }
  }

  async updateProductCategory(
    id: number,
    productCategoryDto: UpdateProductCategoryDto
  ): Promise<ProductCategory | null> {
    try {
      const productCategory = await ProductCategory.findOne({
        where: { Id: id },
      });
      if (productCategory) {
        productCategory.Name = productCategoryDto.Name ?? productCategory.Name;
        productCategory.StatusId =
          productCategoryDto.StatusId ?? productCategory.StatusId;
        productCategory.ModifiedAt = dayjs().toDate().toISOString();
        await productCategory.save();
      }
      return productCategory;
    } catch (error: any) {
      throw new Error("Error updating product category" + error.message);
    }
  }

  async deleteProductCategory(id: number): Promise<boolean> {
    try {
      const productCategory = await ProductCategory.findOne({
        where: { Id: id },
      });
      if (productCategory) {
        await productCategory.destroy();
        return true;
      }
      return false;
    } catch (error: any) {
      throw new Error("Error deleting product category" + error.message);
    }
  }
}

export default ProductCategoryService;
