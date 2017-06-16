// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NGR from 'nagrand';

import mapType from './types/map';
import childrenType from './types/children';
import styles from './Shadowmoon.css';

function noop() {}

const PROP_TYPES = {
  // The id of map container
  id: PropTypes.string,
  // The class name of map container
  className: PropTypes.string,
  // The CSS styles will be attached to container element
  style: PropTypes.object,
  // The elements will be rendered as container's childNodes.
  children: childrenType,
  // Nagrand API access token, see https://www.ipalmap.com/docs/index.php/js-key/ for detail.
  appKey: PropTypes.string.isRequired,
  // Map style template object or url
  styleTemplate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  // data source server
  server: PropTypes.string,
  // The rotation angle of map initialization
  initRotationAngle: PropTypes.number,
  // The skew angle of map initialization
  initSkewAngle: PropTypes.number,
  // The background color of map
  clearColor: PropTypes.string,
  // The url of map background image
  clearImage: PropTypes.string,
  // Highest fsp
  fps: PropTypes.number,
  // Default displaying floor id
  defaultFloorId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  // Floor height, only work on multi-floor mode
  floorHeight: PropTypes.number,
  // Options of navigation
  navi: PropTypes.shape({
    // Enable navigation or not
    enable: PropTypes.bool,
  }),
  // Options of location
  location: PropTypes.shape({
    type: PropTypes.oneOf(['Wi-Fi', 'bluetooth'])
  }),
  // Options of dynamic navigation
  dynamicNavi: PropTypes.shape({
    // Enable dynamic navigation or not
    enable: PropTypes.bool,
  }),
  // The width of map view port
  width: PropTypes.number,
  // The height of map view port
  height: PropTypes.number,
  // Device pixel ratio
  devicePixelRatio: PropTypes.number,
  // The `onLoad` callback would be called when all dependencies have been loaded and the map is ready
  onLoad: PropTypes.func,
  // The `onClick` callback would be called when 
}

const DEFAULT_PROPS = {
  id: 'ngr-webgl',
}

// disable nagrand default controls
const DISABLE_CONTROL_PROPS = {
  floorControl: {
    enable: false,
  },
  zoomControl: {
    enable: false,
  },
  compassControl: {
    enable: false,
  },
  scaleControl: {
    enable: false,
  },
  dimensionControl: {
    enable: false,
  },
  multiFloorControl: {
    enable: false,
  },
  buildingControl: {
    enable: false,
  },
}

export default class Shadowmoon extends Component {
  static PropTypes = PROP_TYPES;

  static defaultProps = DEFAULT_PROPS;

  static childContextTypes = {
    map: mapType,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      map: null,
    };
  }

  getChildContext() {
    return {
      map: this._map,
    };
  }

  componentDidMount() {
    const map = new NGR.map.Map({
      ...this.props,
      target: this.props.id,
      ...DISABLE_CONTROL_PROPS,
    });

    map.render();

    this._map = map;

    this.setState({
      map: this._map,
    });
  }

  render() {
    const { id, className, width, height, style, ...rest } = this.props;
    const children = this.map ? React.Children.map(this.props.children, (child) => {
      return child ? React.cloneElement(child, { map: this._map }) : null;
    }) : null;

    return (
      <div
        ref="map"
        id={id}
        className={className}
        style={{ ...style, width, height }}
      />
    )
  }
}
