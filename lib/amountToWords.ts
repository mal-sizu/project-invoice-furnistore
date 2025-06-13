const ones = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const tens = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

function convertHundreds(num: number): string {
  let result = '';
  
  if (num > 99) {
    result += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  
  if (num > 19) {
    result += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  }
  
  if (num > 0) {
    result += ones[num] + ' ';
  }
  
  return result;
}

export function amountToWords(amount: number): string {
  if (amount === 0) return 'Zero Sri Lankan Rupees';
  
  let numStr = Math.floor(amount).toString();
  let words = '';
  let scaleIndex = 0;
  
  while (numStr.length > 0) {
    let chunk = '';
    if (numStr.length >= 3) {
      chunk = numStr.slice(-3);
      numStr = numStr.slice(0, -3);
    } else {
      chunk = numStr;
      numStr = '';
    }
    
    let chunkNum = parseInt(chunk);
    if (chunkNum > 0) {
      let chunkWords = convertHundreds(chunkNum);
      if (scales[scaleIndex]) {
        chunkWords += scales[scaleIndex] + ' ';
      }
      words = chunkWords + words;
    }
    
    scaleIndex++;
  }
  
  // Handle cents
  const cents = Math.round((amount - Math.floor(amount)) * 100);
  let result = words.trim() + ' Sri Lankan Rupees';
  
  if (cents > 0) {
    result += ' and ' + convertHundreds(cents).trim() + ' Cents';
  }
  
  return result;
}