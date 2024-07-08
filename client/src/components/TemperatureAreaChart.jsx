import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const TemperatureAreaChart = ({ data, fillColor, strokeColor }) => {
  return (
    <ResponsiveContainer width="100%" height={80}>
      <AreaChart data={data}>
        <Area type="monotone" dataKey="temp" stroke={strokeColor} fill={fillColor} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TemperatureAreaChart;
