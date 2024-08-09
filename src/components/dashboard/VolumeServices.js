import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicesData } from '../../assets/redux/slices/ApiSlice';

const VolumeServices = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.api.servicesData);

  useEffect(() => {
    dispatch(fetchServicesData());
  }, [dispatch]);

  // console.log(state);

  return (
    <div className="w-[30%] px-[5px] py-2.5">
      <div className="block-cell">
        <div className="header-wrapper">
          <HeadTitle title="Volume vs Services Level" />
        </div>

        <div className="stack-bar-chart w-full h-[280px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={state}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 0"
                horizontal={true}
                vertical={false}
                stroke="#333"
              />
              <XAxis dataKey="name" />
              <YAxis dataKey="" />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar
                dataKey="volume"
                stackId="a"
                fill="#0095ff"
                barSize={18}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="services"
                stackId="a"
                fill="#00e096"
                barSize={18}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VolumeServices;
