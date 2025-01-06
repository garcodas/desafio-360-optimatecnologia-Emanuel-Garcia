import { Request, Response } from "express";
import ProductService from "../service/product.service";

export class ProductController {
  private productService = new ProductService();

  async createProduct(req: Request, res: Response) {
    try {
      const createProductDto = req.body;
      const productCategory = await this.productService.createProduct(
        createProductDto
      );
      res.status(201).json(productCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.getProducts();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductsStore(req: Request, res: Response) {
    try {
      const products = await this.productService.getProductsStore();
      res.status(200).json(products);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const product = await this.productService.getProductById(+productId);
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const updateProductDto = req.body;
      const productCategory = await this.productService.updateProduct(
        +productId,
        updateProductDto
      );
      res.status(200).json(productCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      await this.productService.deleteProduct(+productId);
      res.status(200).json({ message: "Product category deleted" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
