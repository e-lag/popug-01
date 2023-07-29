import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function Match(property: string, validationOptions: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-types
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      /**
       * Target object to be validated.
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target: object.constructor,
      /**
       * Target object's property name to be validated.
       */
      propertyName,
      /**
       * Name of the validation that is being registered.
       */
      // name?: string;
      /**
       * Indicates if this decorator will perform async validation.
       */
      // async?: boolean;
      /**
       * Validator options.
       */
      options: validationOptions,
      /**
       * Array of validation constraints.
       */
      // constraints?: any[];
      /**
       * Validator that performs validation.
       */
      // validator: ValidatorConstraintInterface | Function;

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  public validate(value: unknown, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const relatedValue = args.object[relatedPropertyName];
    return value === relatedValue;
  }
}
