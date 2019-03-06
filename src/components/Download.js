import React, { PureComponent } from "react";

class Download extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    const { downloadContent, clearDownload } = this.props;
    if (downloadContent) {
      this.ref.current.click();
      clearDownload();
    }
  }

  render() {
    const { downloadContent } = this.props;
    return (
      <>
        {downloadContent && (
          <a
            download="file.csv"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              downloadContent,
            )}`}
            ref={this.ref}
          >
            &nbsp;
          </a>
        )}
      </>
    );
  }
}

export default Download;
