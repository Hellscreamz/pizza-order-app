import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

import { validationSchemas } from 'src/validation/schemas/request.schemas';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    // Here we take the name of the class thats our actual input type
    const schema = validationSchemas[metadata.metatype.name];

    if (!schema) {
      throw new Error('No validation schema (class name) found!');
    }

    try {
      schema.parse(value);
      return value;
    } catch (error) {
      throw new BadRequestException(`Bad request: ${error.message}`);
    }
  }
}
