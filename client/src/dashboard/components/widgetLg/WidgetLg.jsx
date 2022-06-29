import "./widgetLg.css"
import {Person} from '@material-ui/icons'
import {  formarttoCurrency} from "../../../utils/Utils"

 function WidgetLg({transactions}) {
    console.log(transactions)
     const Button=({type})=>{
         return <button className={"widgetLgButton "+type}>{type}</button>
     }
    return (
        <div className="widgetLg">
            <h3 className="wdigetLgTitle">Latest Transactions</h3>
            <table className="widgetLgTable">
              <tbody>
              <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
               
              {  
                  transactions.map((transaction,index)=>{
                      return(
                      
                      <tr className="widgetLgTr" key={index}>
                      <td className="widgetLgUser">
                          <div className="customerIcon"> <Person/></div>
                          <span className="widgetLgName">{transaction.customer.firstname}</span>
                      </td>
                      <td className="widgetLgDate">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="widgetLgAmount">{formarttoCurrency(transaction.totalPrice,'π')}</td>
                      <td className="widgetLgStatus"><Button type={`${transaction.status}`}/></td>
                  </tr>)
                  })
              }
              </tbody>
            </table>
        </div>
    )
}
export default WidgetLg
 