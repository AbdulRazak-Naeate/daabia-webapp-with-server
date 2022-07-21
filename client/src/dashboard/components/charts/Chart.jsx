import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Grid} from '@mui/material'

export const Chart = ({title,data,datakey,grid}) => {
   
    return (
        <div className="chart">
             <Grid container sx={12} sm={12} md={12} lg={12}>
             <Grid item xs={11} sm={11} md={12} lg={12}>
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
                 </Grid>
                 </Grid>
           
        </div>
    )
}
 