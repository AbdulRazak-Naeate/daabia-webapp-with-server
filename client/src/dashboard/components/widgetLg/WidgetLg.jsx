import { formatWithCurrencySymbol } from "../../../utils/Utils"
import "./widgetLg.css"
 function WidgetLg({transactions}) {
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
                          <img src="https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?cs=srgb&dl=pexels-cottonbro-4620866.jpg&fm=jpg" alt="user" className="widgetLgImg" />
                          <span className="widgetLgName">{transaction.customer.firstname}</span>
                      </td>
                      <td className="widgetLgDate">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="widgetLgAmount">{formatWithCurrencySymbol(transaction.totalPrice,'GHS')}</td>
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
 