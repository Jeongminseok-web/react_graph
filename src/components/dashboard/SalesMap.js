import React, { useEffect } from 'react';
import HeadTitle from './HeadTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapsData } from '../../assets/redux/slices/ApiSlice';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoUrl from '../../constants/world-50m.v1.json';
import { COLOR_MAP } from '../../constants/menuList';

const getFillColor = (fillCode) => COLOR_MAP[fillCode] || '#ececec';

const SalesMap = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.api.mapsData);

  useEffect(() => {
    dispatch(fetchMapsData());
  }, [dispatch]);

  // console.log(state);

  const findCountryId = (countryId) => {
    const matchedCountry = state?.find(
      (country) => country.country_id === countryId
    ); // Geography 컴포넌트는 map으로부터 가져오르모 객체 타입입니다. filter는 배열을 변환하므로 사용할 수 없고, find를 사용해야 합니다.
    return matchedCountry ? getFillColor(matchedCountry.fill_color) : '#ececec';
  };

  // console.log(getFillColor('violet'));

  return (
    <div className="w-[30%] px-[5px] py-2.5">
      <div className="block-cell">
        <div className="header-wrapper">
          <HeadTitle title="Sales Mapping By Country" />
        </div>

        <div className="map-chart">
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{
              rotate: [0, 0, 0],
              scale: 200,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={findCountryId(geo.id)}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default SalesMap;
