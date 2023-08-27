import ChartBar from './ChartBar';
import './Chart.css';

const Chart = (props) => {
   const dataPointValues = props.dataPoints.map((data) => data.value);
   return (
      <div className="chart">
         {props.dataPoints.map((data) => (
            <ChartBar
               key={data.label}
               value={data.value}
               maxValue={Math.max(...dataPointValues)}
               label={data.label}
            />
         ))}
      </div>
   );
};

export default Chart;
