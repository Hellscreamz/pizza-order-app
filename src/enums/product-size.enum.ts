import { registerEnumType } from '@nestjs/graphql';

export enum ProductSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
}

registerEnumType(ProductSize, {
  name: 'ProductSize',
});

export default ProductSize;
