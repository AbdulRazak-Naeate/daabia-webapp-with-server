const formatWithCurrencySymbol =(amount,currency)=>{
  // Create GH Cedi currency symbol.
var formatter = new Intl.NumberFormat('en-GH', {
    style: 'currency', 
    currency: currency, //   currency: 'GHS',
  });
  return formatter.format(amount)
}

const formarttoCurrency = (amount ,symbol)=>{

  const getDigitsAfterPeriod =(amount)=>{

    var stringvalue=amount.toString().split('');//convert to Array
    var periodIndex=stringvalue.indexOf('.');//get period index number
    var stringval=amount.toString();
     
      if (periodIndex >=1){ //check for NaN values if non exist continue
        if (periodIndex!==-1){ //if period exist in value start extraction from its index
   
         var extract=stringval.slice(stringval.length - (stringval.length-2))
         // console.log(extract)
          return extract.toString().split('');
      
        }
      }else{
        //console.log(amount)
         return ['0'];
      }

    
  }
  console.log();

   function isDigitContainNonZeroz(arr){
    
    for(var i=0;i<arr.length;i++){
      var bool=false
      if (arr[i]!==0){

        bool= true
      }
    }     
     return bool

   }
if (amount!==undefined){

  //if (amount>=1){
   var arr=getDigitsAfterPeriod(amount);
   var bool=isDigitContainNonZeroz(arr);
     //  console.log(bool)
       if (bool===true){
       
        return symbol + amount.toFixed(arr.length).replace(/\d(?=(\d{3})+\.)/g,"$&,");
       }else if(bool===false){
       // console.log(amount)
        return symbol + amount;
       }
  /*     
  }else{
    console.log(amount)

   return  symbol +amount.toFixed(8).replace(/\d(?=(\d{3})+\.)/g,"$&,");
   } */
}
  }

  const convertValueFromExponent = (value)=>{
    if (value >=1){
      return value
    }else{
      return value.toFixed(8)
    }
  }
  
  const formarttoPiCurrency = (amount)=>{
    var value=0;
    var symbol='π'
  if (amount!==undefined){
    if (amount>=1){
  
      value = symbol +amount.toFixed(3).replace(/\d(?=(\d{3})+\.)/g,"$&,");
    }else{
      value =symbol +amount.toFixed(8).replace(/\d(?=(\d{3})+\.)/g,"$&,");
     }
  }
    return value
    }
    
    
const truncateString=(str, num) => {
  try{
    if (str!==''){
      if(str.length>num){
        return str.slice(0,num)+"...";
      }else{
        return str;
      }
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

//Fiat Currency Crypto conversion
const convertFiatCurrencyToCrypto = ()=>{
  var localFiatCurrency=1;
  var foreignFiatCurrency=localFiatCurrency/7;
  console.log(foreignFiatCurrency)
  var crypto=2199113;

 return  foreignFiatCurrency/crypto

}
const converCryptoFiatCurrency= ()=>{
  var localFiatCurrency=0;
  //var foreignFiatCurrency=0;
  var crypto=0.00000000;

 return  crypto/localFiatCurrency

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
  module.exports.formarttoCurrency  = formarttoCurrency
  module.exports.formarttoPiCurrency= formarttoPiCurrency
  module.exports.convertFiatCurrencyToCrypto=convertFiatCurrencyToCrypto
  module.exports.converCryptoFiatCurrency=converCryptoFiatCurrency
  module.exports.truncateString     = truncateString
  module.exports.randNumber          = randNumber
  module.exports.convertValueFromExponent=convertValueFromExponent