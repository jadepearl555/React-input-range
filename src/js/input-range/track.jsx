import React from 'react';
import { autobind } from '../utils';

/**
 * @ignore
 * Track React component
 */
export default class Track extends React.Component {
  /**
   * Accepted propTypes of Track
   * @override
   * @return {Object}
   * @property {Function} children
   * @property {Function} classNames
   * @property {Function} onTrackMouseDown
   * @property {Function} percentages
   */
  static get propTypes() {
    return {
      children: React.PropTypes.node.isRequired,
      classNames: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
      onTrackMouseDown: React.PropTypes.func.isRequired,
      percentages: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
    };
  }

  /**
   * Track constructor
   * @param {Object} props - React component props
   */
  constructor(props) {
    super(props);

    /**
     * @private
     * @type {?Component}
     */
    this.node = null;

    autobind([
      'handleMouseDown',
      'handleTouchStart',
    ], this);
  }

  /**
   * Return the clientRect of the component
   * @private
   * @return {ClientRect}
   */
  getClientRect() {
    return this.node.getBoundingClientRect();
  }

  /**
   * Get the CSS styles for an active track
   * @private
   * @return {Object} CSS styles
   */
  getActiveTrackStyle() {
    const width = `${(this.props.percentages.max - this.props.percentages.min) * 100}%`;
    const left = `${this.props.percentages.min * 100}%`;

    return { left, width };
  }

  /**
   * Handle any mousedown event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   */
  handleMouseDown(event) {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const trackClientRect = this.getClientRect();
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    this.props.onTrackMouseDown(event, position);
  }

  /**
   * Handle any touchstart event received by the component
   * @private
   * @param {SyntheticEvent} event - User event
   */
  handleTouchStart(event) {
    event.preventDefault();

    this.handleMouseDown(event);
  }

  /**
   * Render method of the component
   * @override
   * @return {string} Component JSX
   */
  render() {
    const activeTrackStyle = this.getActiveTrackStyle();

    return (
      <div
        className={this.props.classNames.track}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        ref={(node) => { this.node = node; }}>
        <div
          style={activeTrackStyle}
          className={this.props.classNames.activeTrack} />
        {this.props.children}
      </div>
    );
  }
}
