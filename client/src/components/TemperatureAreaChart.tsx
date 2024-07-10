import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ChartDataHourly, ChartDataDaily } from '../Types';

interface TemperatureAreaChartProps {
  data: ChartDataHourly[] | ChartDataDaily[],
  fillColor: string,
  strokeColor: string
}

const TemperatureAreaChart: React.FC<TemperatureAreaChartProps> = ({ data, fillColor, strokeColor }) => {
  return (
    <ResponsiveContainer width="100%" height={80}>
      <AreaChart data={data}>
        <Area type="monotone" dataKey="temp" stroke={strokeColor} fill={fillColor} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TemperatureAreaChart;
