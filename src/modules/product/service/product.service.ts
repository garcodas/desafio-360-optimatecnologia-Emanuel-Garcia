import dayjs from "dayjs";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../model/product.model";
class ProductService {
  async createProduct(ProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = await Product.create({
        Name: ProductDto.Name,
        Brand: ProductDto.Brand,
        Barcode: ProductDto.Barcode,
        Stock: ProductDto.Stock,
        Price: ProductDto.Price,
        ImageUrl: ProductDto.ImageUrl,
        ProductCategoryId: ProductDto.ProductCategoryId,
        UserId: ProductDto.UserId,
        StatusId: ProductDto.StatusId,
      });
      return newProduct;
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving product category" + error.message);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const productCategories = await Product.findAll();
      return productCategories;
    } catch (error: any) {
      throw new Error("Error getting product categories" + error.message);
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await Product.findOne({
        where: {
          Id: id,
        },
      });
      return product;
    } catch (error: any) {
      throw new Error("Error getting product category" + error.message);
    }
  }

  async updateProduct(
    id: number,
    ProductDto: UpdateProductDto
  ): Promise<Product | null> {
    try {
      const product = await Product.findOne({
        where: { Id: id },
      });
      if (product) {
        product.Name = ProductDto.Name ?? product.Name;
        product.Brand = ProductDto.Brand ?? product.Brand;
        product.Barcode = ProductDto.Barcode ?? product.Barcode;
        product.Stock = ProductDto.Stock ?? product.Stock;
        product.Price = ProductDto.Price ?? product.Price;
        product.ImageUrl = ProductDto.ImageUrl ?? product.ImageUrl;
        product.StatusId = ProductDto.StatusId ?? product.StatusId;
        product.ModifiedAt = dayjs().toDate();
        await product.save();
      }
      return product;
    } catch (error: any) {
      throw new Error("Error updating product category" + error.message);
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const product = await Product.findOne({
        where: { Id: id },
      });
      if (!product) {
        throw new Error("Product not found");
      }
      await product.destroy();
      return true;
    } catch (error: any) {
      throw new Error("Error deleting product category" + error.message);
    }
  }
}

export default ProductService;
