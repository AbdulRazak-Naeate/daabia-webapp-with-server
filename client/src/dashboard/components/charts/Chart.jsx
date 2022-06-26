import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Chart = ({title,data,datakey,grid}) => {
   
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="95%" aspect={4/1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <Line type="monotone" dataKey={datakey} stroke="#5550bd"/>
                    <Tooltip/>
                   {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
                     <Legend/>
                </LineChart>
               
            </ResponsiveContainer>
        </div>
    )
}
 