import React from 'react';
import PropTypes from 'prop-types';
import {DoughnutChart} from '../../common';

/**
 * Shows the allocation of the portfolio
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AllocationGraph = props => {
  const defaultMiddleDisplayLabel = 'Total Value';
  const defaultMiddleDisplayValue = props.portfolioData.value;

  const assets = props.getAllAssets();

  const labels = (() => {
    let labels = []
    assets.forEach(element => {
      labels.push(element['name']);
    });
    return labels;
  })();

  const valueData = (() => {
    let valueData = []
    assets.forEach(element => {
      valueData.push(element['value'] * element['quantity']);
    });
    return valueData;
  })();

  return (
    <DoughnutChart
      data={valueData}
      labels={labels}
      defaultMiddleDisplayValue={defaultMiddleDisplayValue}
      defaultMiddleDisplayLabel={defaultMiddleDisplayLabel}
    />
  );
}

AllocationGraph.propTypes = {
  portfolioData: PropTypes.object,
  getAllAssets: PropTypes.func,
};

export default AllocationGraph;
