import "../configuration";
import React from "react";
import { mount } from "enzyme";
import Row from "../../components/Table/Row";

describe("<Row /> . ", () => {
  test("Missing props", () => {
    const content = mount(
      <table>
        <tbody>
          <Row />
        </tbody>
      </table>
    );
    expect(content.find("tr").length).toBe(1);
    expect(content.find("tr > *").html()).toBe(null);
  });

  test("Render row", () => {
    const row = [{ value: "cell1" }, { value: "cell22" }];
    const content = mount(
      <table>
        <tbody>
          <Row row={row} onDelete={() => {}} />
        </tbody>
      </table>
    );
    expect(content.find("tr td").length).toBe(2);
    expect(content.find("tr td h6").length).toBe(2);
  });
  test("Render row with editable", () => {
    const row = [{ value: "cell1", editable: true }, { value: "cell22" }];
    const content = mount(
      <table>
        <tbody>
          <Row row={row} onDelete={() => {}} onRowChangeHandler={() => {}}/>
        </tbody>
      </table>
    );
    expect(content.find("tr td").length).toBe(2);
    expect(content.find("tr td h6").length).toBe(1);
    expect(content.find("tr td input").length).toBe(1);
  });
});
