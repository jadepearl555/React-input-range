import React from 'react';
import { autobind, extend } from 'InputRangeUtil';

// Enable touch
React.initializeTouchEvents(true);

class InputRangeTrack extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {};

    // Auto-bind
    autobind([
      'handleMouseDown',
      'handleTouchStart',
    ], this);
  }

  // Life cycle
  componentDidMount() {
    this.setActiveTrackWidth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setActiveTrackWidth(nextProps);
  }

  // Getters / Setters
  get clientRect() {
    const track = React.findDOMNode(this);
    const clientRect = track.getClientRects()[0];

    return clientRect;
  }

  // Methods
  setActiveTrackWidth(props) {
    const width = `${(props.percentages.max - props.percentages.min) * 100}%`;
    const left = `${props.percentages.min * 100}%`;

    const newActiveTrackStyle = {
      left,
      width,
    };

    const activeTrackStyle = extend({}, this.state.activeTrackStyle, newActiveTrackStyle);

    this.setState({ activeTrackStyle });
  }

  // Handlers
  handleMouseDown(event) {
    const trackClientRect = this.clientRect;
    const { clientX } = event.touches ? event.touches[0] : event;
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    this.props.onTrackMouseDown(this, position);
  }

  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  // Render
  render() {
    const activeTrackStyle = this.state.activeTrackStyle || {};

    return (
      <div
        onMouseDown={ this.handleMouseDown }
        onTouchStart={ this.handleTouchStart }
        className="InputRange-track InputRange-track--container">
        <div
          style={ activeTrackStyle }
          className="InputRange-track InputRange-track--active">
        </div>
        { this.props.children }
      </div>
    );
  }
}

InputRangeTrack.propTypes = {
  children: React.PropTypes.node,
  onTrackMouseDown: React.PropTypes.func.isRequired,
  percentages: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
};

export default InputRangeTrack;
