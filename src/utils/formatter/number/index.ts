import BigNumber from 'bignumber.js';

export const useNumberFormatter = () => {

  const checkValidNumber = (num?: string | number) => {
    if (!num) {
      return false;
    }

    return `${num}`.match(/^\d+$/i);
  };

  const shorthanded = (num?: number, options?: { digits?: number, largeNumberDigits?: number, separate?: boolean }) => {
    // const value = `${num ?? 0}`;
    if (!num) {
      return String(0);
    }
    const largeNumberDigits = options?.largeNumberDigits ? options.largeNumberDigits : 2;
    const digits = options?.digits ? options.digits : 0;

    if (num === 0) {
      return String(num);
    }
    if (num < 1) {
      return String(parseFloat(new BigNumber(num).toFixed(digits, BigNumber.ROUND_FLOOR)));
    }


    // const units = ['0', 'kwei', 'mwei', 'nano', 'micro', 'milli', 'ether', 'kether'];
    //
    // const e = Math.floor(value.length / 3);
    // const f = e > 0 ? e - 1 : e;
    // return Web3.utils.fromWei(units[f]).toLocaleString();


    const si = [
      { value: 1, symbol: '', memo: 'Normal Number' },
      { value: 1e6, symbol: 'M', memo: 'Million' },
      { value: 1e9, symbol: 'B', memo: 'Billion' },
      { value: 1e12, symbol: 'T', memo: 'Trillion' },
      { value: 1e15, symbol: 'Q', memo: 'Quadrillion' },
    ];
    // 퍼포먼스 향상을 위해 큰 자릿수부터 비교하는 For 문 사용
    let i;
    const count = si.length - 1;
    for (i = count; i > 0; i -= 1) {
      if (num >= si[i].value) {
        break;
      }
    }
    const selectedDigits = i > 0 ? largeNumberDigits : digits;
    const slicedValue = new BigNumber(num / si[i].value).toFixed(selectedDigits, BigNumber.ROUND_FLOOR);
    const formattedSlicedValue = new BigNumber(slicedValue).toFormat();
    return `${formattedSlicedValue}${si[i].symbol}`;
  };

  return {
    isValidNumber: checkValidNumber,
    shorthanded,
  };
};
