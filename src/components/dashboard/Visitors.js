import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVisitorsData } from '../../assets/redux/slices/ApiSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Visitors = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.api.visitorsData);

  useEffect(() => {
    dispatch(fetchVisitorsData());
  }, [dispatch]);

  // console.log(state);

  return (
    <div className="w-[40%] px-[5px] py-2.5">
      <div className="block-cell">
        <div className="header-srapper">
          <HeadTitle title="Visitor's Insights" />
        </div>

        <div className="line-chart w-full h-[280px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={state}
              margin={{
                top: 10,
                right: 5,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 0"
                horizontal={true}
                vertical={false}
                stroke="#333"
              />
              <XAxis dataKey="month" />
              <YAxis ticks={[0, 100, 200, 300, 400]} />
              <Tooltip />
              <Legend />
              <Line
                type="basis"
                dataKey="loyal_customer"
                stroke="red"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="basis"
                dataKey="new_customer"
                stroke="blue"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="basis"
                dataKey="unique_customer"
                stroke="green"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Visitors;
