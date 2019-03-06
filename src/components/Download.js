import React, { PureComponent } from "react";

class Download extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidUpdate() {
    if (this.props.downloadContent) {
      this.ref.click();
      this.props.clearDownload();
    }
  }
  render() {
    return (
      <>
        {this.props.downloadContent && (
          <a
            download="file.csv"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              this.props.downloadContent
            )}`}
            ref={ref => (this.ref = ref)}
          >
            &nbsp;
          </a>
        )}
      </>
    );
  }
}

export default Download;
