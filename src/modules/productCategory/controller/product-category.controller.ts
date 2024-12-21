import { Request, Response } from "express";
import ProductCategoryService from "../service/product-category.service";

export class ProductCategoryController {
  private productCategoryService = new ProductCategoryService();

  async createProductCategory(req: Request, res: Response) {
    try {
      const createProductCategoryDto = req.body;
      const productCategory =
        await this.productCategoryService.createProductCategory(
          createProductCategoryDto
        );
      res.status(201).json(productCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductCategories(req: Request, res: Response) {
    try {
      const productCategories =
        await this.productCategoryService.getProductCategories();
      res.status(200).json(productCategories);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductCategoryById(req: Request, res: Response) {
    try {
      const productCategoryId = req.params.id;
      const productCategory =
        await this.productCategoryService.getProductCategoryById(
          +productCategoryId
        );
      res.status(200).json(productCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProductCategory(req: Request, res: Response) {
    try {
      const productCategoryId = req.params.id;
      const updateProductCategoryDto = req.body;
      const productCategory =
        await this.productCategoryService.updateProductCategory(
          +productCategoryId,
          updateProductCategoryDto
        );
      res.status(200).json(productCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProductCategory(req: Request, res: Response) {
    try {
      const productCategoryId = req.params.id;
      await this.productCategoryService.deleteProductCategory(
        +productCategoryId
      );
      res.status(200).json({ message: "Product category deleted" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
