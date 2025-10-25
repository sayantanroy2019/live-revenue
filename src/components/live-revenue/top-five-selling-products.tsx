'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const colors = ['#14B8A6', '#3B82F6', '#EC4899', '#F59E0B', '#FACC15'];

const data = [
  { name: 'WATER', value: 6400, color: colors[0], label: '6400' },
  { name: 'RED BULL - ENERGY DRINK/SUGARFREE/YELLOW EDITION', value: 944, color: colors[1] },
  { name: 'SOFT DRINKS', value: 1380, color: colors[2], label: '925' },
  { name: 'TUBORG GREEN', value: 4000, color: colors[3], label: '805' },
  { name: 'TUBORG CLASSIC', value: 2400, color: colors[4], label: '508' },
];

export const TopSellingProducts = () => {
  return (
    <div className="dark:bg-[#1F1F1F] p-5 rounded-xl xl:min-w-[49%] 2xl:min-w-[49%] lg:min-w-[49%] md:w-full sm:w-full max-sm:w-full flex flex-col items-center text-white  shadow-2xl border-none w-full max-w-md">
      <h2 className="text-lg font-semibold w-full">Top 5 Selling Products</h2>

      <div className="w-full h-[300px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              label // enables default labels
              labelLine // enables lines to label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F1F1F',
                border: 'none',
                borderRadius: '8px',
              }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-col gap-2 text-sm w-full px-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
            <span className="flex-1 text-gray-300 uppercase">{item.name}</span>
            <span className="text-gray-400">
              {item.value.toLocaleString()} ({item.label || item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
