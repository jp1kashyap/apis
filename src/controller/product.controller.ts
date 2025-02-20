import { Product } from "../model/product.model";
import IProduct from "../interface/product.interface";

const getProducts = async (
  page: number = 1,
  limit: number = 10
): Promise<{ products: IProduct[]; total: number }> => {
  try {
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);
    return { products, total };
  } catch (error) {
    console.log(`Check User with error`, error);
    return { products: [], total: 0 };
  }
};

export { getProducts };
