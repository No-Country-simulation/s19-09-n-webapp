import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class FileSize implements ValidatorConstraintInterface {
  validate(file: Express.Multer.File, args: ValidationArguments) {
    return file.size < args.constraints[0] * 1048576; //convert to bytes
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.targetName} debe ser menor a ${args.constraints[0]}Mb`;
  }
}

@ValidatorConstraint({ name: 'customText', async: false })
export class IsImgType implements ValidatorConstraintInterface {
  validate(file: Express.Multer.File) {
    return file.mimetype.includes('jpg') || file.mimetype.includes('png');
  }

  defaultMessage() {
    return 'Imagen debe ser jpg* o png';
  }
}
