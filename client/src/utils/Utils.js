const formatWithCurrencySymbol =(amount,currency)=>{
  // Create GH Cedi currency symbol.
var formatter = new Intl.NumberFormat('en-GH', {
    style: 'currency', 
    currency: currency, //   currency: 'GHS',
  });
  return formatter.format(amount)
}

const formarttoCurrency = (amount ,symbol)=>{
  return symbol +amount.toFixed(8).replace(/\d(?=(\d{3})+\.)/g,"$&,");
}

const truncateString=(str, num) => {
  try{
 if(str.length>num){
    return str.slice(0,num)+"...";
  }else{
    return str;
  }
  }catch(err ){
     console.log(err)
  }
 
}
const randNumber= (count)=> {//Unique Identifier
  var result           = '';
 // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var characters       = '0123456789';

  var charactersLength = characters.length;
  for ( var i = 0; i < count; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 // console.log(result);
  return result;
}
/* function toDate(date) {
    if (date === void 0) {
      return new Date(0);
    }
    if (isDate(date)) {
      return date;
    } else {
      return new Date(parseFloat(date.toString()));
    }
  }
   //TEST
  //var ms = '1519073776000';
  //var dateFormat = "Y-m-d H:i:s.v";
 // var formatted = FormatDate(ms, dateFormat);

  function isDate(date) {
    return (date instanceof Date);
  }
  
   export  function FormatDate(date, format) {
    var d = toDate(date);
    return format
      .replace(/Y/gm, d.getFullYear().toString())
      .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
      .replace(/d/gm, ('0' + (d.getDate() + 1)).substr(-2))
      .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
      .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
      .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
      .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
  } */
 
  module.exports.formatWithCurrencySymbol = formatWithCurrencySymbol
  module.exports.formarttoCurrency = formarttoCurrency
  module.exports.truncateString           = truncateString
 module.exports.randNumber               = randNumber