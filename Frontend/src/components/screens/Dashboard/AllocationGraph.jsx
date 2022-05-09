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

  const defaultMiddleDisplayLabel = `Value of ${props.activePortfolio}`;
  const defaultMiddleDisplayValue = `${parseFloat(props.portfolioData.value.toFixed(2)).toLocaleString()} €`;
  
  const assets = props.getAllAssets();

  const labels = (() => {
    let labels = []
    assets.forEach(element => {
      let label = element["name"];
      if (label.length > 50) {
        label = label.slice(0,50);
        label += "...";
      }
      labels.push(label);
    });
    return labels;
  })();

  const valueData = (() => {
    let valueData = []
    assets.forEach(element => {
      valueData.push((element["value"]).toFixed(2));
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
  activePortfolio: PropTypes.string,
  getAllAssets: PropTypes.func,
};

export default AllocationGraph;
