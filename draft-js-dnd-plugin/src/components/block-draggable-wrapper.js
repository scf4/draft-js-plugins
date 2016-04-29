import React, { Component } from 'react';
import { DRAFTJS_BLOCK_KEY } from '../constants';

// Export
export default function WrapComponent(WrappedComponent, options) {
  const { useDiv } = options || {};

  class Wrapper extends Component {
    static pluginOptions = WrappedComponent.pluginOptions;
    static WrappedComponent = WrappedComponent;
    static defaultProps = {
      draggable: true,
      readOnly: false,
    };

    // Handle start-drag and setData with blockKey
    startDrag(event) {
      const allow = this.props.draggable && !this.props.readOnly;
      if (!allow) return;

      event.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign

      // Declare data and give info that its an existing key and a block needs to be moved
      event.dataTransfer.setData('text', `${DRAFTJS_BLOCK_KEY}:${this.props.block.key}`);
    }

    render() {
      const { draggable } = this.props;
      if (true) {
        return (
          <div onDragStart={::this.startDrag} draggable={draggable}>
            <WrappedComponent {...this.props} />
          </div>
        );
      }

      return <WrappedComponent {...this.props} onDragStart={::this.startDrag} draggable={draggable} />;
    }
  }

  return Wrapper;
}
