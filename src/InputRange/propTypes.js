import { isNumber, objectOf } from './util';

// Functions
function maxMinValuePropType(props) {
  const maxValue = props.maxValue;
  const minValue = props.minValue;
  const value = props.value;
  const values = props.values;
  const defaultValue = props.defaultValue;
  const defaultValues = props.defaultValues;

  if (!values &&
      !defaultValues &&
      !isNumber(value) &&
      !isNumber(defaultValue)) {
    return new Error('`value` or `defaultValue` must be a number');
  }

  if (!isNumber(value) &&
      !isNumber(defaultValue) &&
      !objectOf(values, isNumber) &&
      !objectOf(defaultValues, isNumber)) {
    return new Error('`values` or `defaultValues` must be an object of numbers');
  }

  if (minValue >= maxValue) {
    return new Error('`minValue` must be smaller than `maxValue`');
  }

  if (maxValue <= minValue) {
    return new Error('`maxValue` must be larger than `minValue`');
  }

  if (value < minValue || value > maxValue) {
    return new Error('`value` must be within `minValue` and `maxValue`');
  }
}

export { maxMinValuePropType as maxMinValuePropType };
