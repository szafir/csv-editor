import "./configuration";
import React from "react";
import { mount } from "enzyme";
import Download from "../components/Download";


describe("<Download /> . ", () => {
  test("Missing props", () => {
    const content = mount(<Download downloadContent={false} />);
    expect(content.html()).toBe(null);
  });
  test("component renders properly", () => {
    const content = mount(<Download downloadContent="col1,col2" />);
    expect(content.find("a").length).toEqual(1);
  });
});
