export function UnitConversion (num, unit = 1, dotNum) {
  num = num || 0
  const numStr = num.toString()
  const strArr = numStr.split('.')
  if (strArr.length > 1) {
    const len = strArr[1].length
    if (dotNum) {
      let resNum = parseInt(num * Math.pow(10, len)) / (unit * Math.pow(10, len))
      resNum = resNum.toString()
      let numArr = resNum.split('.')
      if (numArr[1] && numArr[1].length > dotNum) {
        numArr[1] = numArr[1].substring(0, dotNum)
      }
      resNum = numArr[0] + (numArr[1] ? '.' + numArr[1] : '')
      return Number(resNum)
    } else {
      return parseInt(num * Math.pow(10, len)) / (unit * Math.pow(10, len))
    }
  } else {
    return (num / unit).toFixed(0)
  }

}

export function UnitConversion1 (num, unit = 1) {
  num = num || 0
  const numStr = num.toString()
  const strArr = numStr.split('.')
  if (strArr.length > 1) {
    const len = strArr[1].length
    return parseInt(num * Math.pow(10, len)) / (unit * Math.pow(10, len))
  } else {
    return (num / unit).toFixed(2)
  }

}
//金钱千分位转换
export function splitK (num, int, retain = 2, toFixed = false) {
  if (num === '' || num === undefined || num === null) return undefined;
  if (Number (num) || num === 0) {
    num = Number(num)
    const regx = new RegExp (
      `^(\-)?\\d+.\\d{${retain > 1 ? '1,' + retain : retain}}`
    );
    if (toFixed) {
      num = num.toFixed(retain)
    } else {
      num = num.toString();
    }

    if (/\./gim.test (num)) {
      num = num;
    } else {
      num = `${num}.00`;
    }
    const str = num.match (regx);
    num = Array.isArray (str) && str.length > 0 ? Number (str[0]) : 0;

    let fh = '';
    num = String (num);

    if (num.indexOf ('-') > -1) {
      fh = '-';
      num = num.slice (1);
    }

    let smallDecimal = String (num).split ('.')[1] || '';
  const len = retain - smallDecimal.length
  if (len > 0) {
   for (let key = 0; key < len; key++) {
     smallDecimal += '0';
   } 
  }
    let decimal = smallDecimal; //小数部分
    let tempArr = [];
    let revNumArr = String (num).split ('.')[0].split ('').reverse (); //倒序

    for (let i in revNumArr) {
      tempArr.push (revNumArr[i]);
      if ((i + 1) % 3 === 0 && i != revNumArr.length - 1) {
        tempArr.push (',');
      }
    }

    let zs = tempArr.reverse ().join (''); //整数部分

    if (!int) return decimal ? fh + zs + '.' + decimal : fh + zs;
    if (int) return fh + zs;
  }
  return '0.00';
}