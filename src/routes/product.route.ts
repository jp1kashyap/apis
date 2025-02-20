import { Request, Response, Router } from "express";
import authenticate from "../middleware/auth";
import { getProducts } from "../controller/product.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { products, total } = await getProducts(page, limit);
      return res.status(200).json({
        status: 200,
        success: true,
        data: products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1,
        },
      });
    } catch (error) {
      console.log(`Get products error`, error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error occurred, please check logs";
      return res.status(400).json({
        status: 400,
        success: false,
        message: errorMessage,
        data: [],
        pagination: null,
      });
    }
  }
);

export default router;
