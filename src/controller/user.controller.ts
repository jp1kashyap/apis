import { User } from "../model/user.model";
import IUser from "../interface/user.interface";

const checkUser = async (email: string): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ email: email });
    return user as IUser;
  } catch (error) {
    console.log(`Check User with error`, error);
    return null;
  }
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const newUser = await User.create(user);
    return newUser as IUser;
  } catch (error) {
    console.log(`User creation error`, error);
    return null;
  }
};

export { checkUser, createUser };
