import React from 'react';

class Editor extends React.Component {
  private _utils: typeof import('@utils/index');
  componentDidMount(): void {
    import('@utils/index').then(utils => {
      this._utils = utils;
    });
  }

  render(): React.ReactNode {
    return (
      <div className="editor">
        <div className="toolbar">
          <div className="toolbar-item">
            <input type="file" id="imageFileInput" />
          </div>
          <div className="toolbar-item">
            <label className="tool-label" htmlFor="brightness">
              Brightness
            </label>
            <input className="tool-input" type="range" id="brightness" min="0" max="200" />
          </div>
          <div className="toolbar-item">
            <label className="tool-label" htmlFor="saturation">
              Saturation
            </label>
            <input className="tool-input" type="range" id="saturation" min="0" max="200" />
          </div>
          <div className="toolbar-item">
            <label className="tool-label" htmlFor="blur">
              Blur
            </label>
            <input className="tool-input" type="range" id="blur" min="0" max="25" />
          </div>
          <div className="toolbar-item">
            <label className="tool-label" htmlFor="inversion">
              Inversion
            </label>
            <input className="tool-input" type="range" id="inversion" min="0" max="100" />
          </div>
        </div>
        <div className="image-area">
          <canvas id="canvas" height="500" width="500"></canvas>
        </div>
      </div>
    );
  }
}

export default Editor;
export { Editor as Component };
