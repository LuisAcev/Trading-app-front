import { isPositiveNumber } from '../../../../commons/utils/utils';
import { BLUE_COLOR, RED_COLOR } from '../../../../commons/theme/colors';
import isNumber from 'lodash/isNumber';

//TODO: Review when the date class is implemented.
export const getDate = (date) => {
	const actualDate = new Date(date);
	const day = actualDate.getFullYear();
	const month = actualDate.getMonth() + 1;
	const year = actualDate.getDate();
	const finallDate = `${year}/${month}/${day}`;
	return finallDate;
};

//label´s Color

export const labelColor = (number) => {
	return {
		color: isNumber(number)
			? isPositiveNumber(number)
				? BLUE_COLOR
				: RED_COLOR
			: '#FFFFFF',
	};
};
