import { z, ZodTypeAny } from 'zod';
import { UserEmailValidation } from 'src/validation/global/user-email-validation';
import ProductSize from 'src/enums/product-size.enum';

export const CreateOrderInputType = z.object({
  product_name: z.string().max(50),
  size: z.nativeEnum(ProductSize),
  email: z.string().email(),
  amount: z.number().int(),
});

export const DeleteOrderInputType = z.object({
  order_id: z.string().uuid(),
});

export const CreateUserInput = z.object({
  first_name: z.string().max(20),
  last_name: z.string().max(20),
  mobile_phone: z.string().max(100),
  email: z.string().email(),
  address: z.string().max(100),
  password: z.string().max(100),
});

export const UpdateUserInputType = z.object({
  first_name: z.string().max(20).optional(),
  last_name: z.string().max(20).optional(),
  mobile_phone: z.string().max(100).optional(),
  email: z.string().email(),
  address: z.string().max(100).optional(),
  password: z.string().max(100).optional(),
});

export const CreateProductInputType = z.object({
  name: z.string().max(100),
  price: z.number().positive(),
  description: z.string().max(255),
  size: z.nativeEnum(ProductSize),
  amount: z.number().int(),
});

export const UpdateProductInputType = z.object({
  id: z.string().uuid(),
  name: z.string().max(100).optional(),
  price: z.number().positive().optional(),
  description: z.string().max(255).optional(),
  size: z.nativeEnum(ProductSize),
  amount: z.number().int().optional(),
});

export const DeleteProductInputType = z.object({
  id: z.string().uuid(),
});

export const FindProductByNameType = z.object({
  name: z.string().max(100),
});

// *IMPORTANT*
// The properties in validationSchemas MUST
// be equal to the actual class names responsible for input types in the type files

export const validationSchemas: Record<string, ZodTypeAny> = {
  CreateOrderInput: CreateOrderInputType,
  DeleteOrderInput: DeleteOrderInputType,
  CreateUserInput: CreateUserInput,
  UpdateUserInput: UpdateUserInputType,
  DeleteUserByEmailInput: UserEmailValidation,
  CreateProductInput: CreateProductInputType,
  UpdateProductInput: UpdateProductInputType,
  DeleteProductInput: DeleteProductInputType,
  FindProductByName: FindProductByNameType,
  FindUserByEmailInput: UserEmailValidation,
};
