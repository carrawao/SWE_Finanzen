import React from 'react';
import PropTypes from 'prop-types';

/**
 * Spinning Benchmarket Logo for displaying while loading
 * @returns {JSX.Element}
 * @constructor
 */
 const Loading = props => {
  
  return (
    <img 
      width={props.size ? `${props.size}rem` : '50rem'}
      height={props.size ? `${props.size}rem` : '50rem'}
      style={{
        animationName: 'spin',
        animationDuration: '800ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
      }}  
      src={`${process.env.PUBLIC_URL}/assets/images/swe-finance-logo.png`}
    />
  );
 }

 
Loading.propTypes = {
  size: PropTypes.number
};

export default Loading;
