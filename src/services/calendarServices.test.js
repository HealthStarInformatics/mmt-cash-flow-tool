import { shallow } from "enzyme";
import React from "react";
import {
  createWeekRows,
  defaultMonthlyDataEntry,
  getMonthNumber,
  initializeMonthlyData,
  getMonthInfo
} from "./calendarServices";

/**
 * createWeekRows
 */
describe("createWeekRows", () => {
  it("returns empty array given an empty array", () => {
    expect(createWeekRows([])).toEqual([]);
  });

  it("pads an array of length 1 with CalendarDayPlaceholders", () => {
    createWeekRows([0])
      .slice(1)
      .forEach(i => expect(i.key).toContain("placeholder"));
  });

  it("pads an array of length 8 with CalendarDayPlaceholders", () => {
    const result = createWeekRows([0, 1, 2, 3, 4, 5, 6, 7]);
    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6]);
    result[1].slice(1).forEach(i => expect(i.key).toContain("placeholder"));
  });

  it("does not pad an array of length 7", () => {
    const result = createWeekRows([0, 1, 2, 3, 4, 5, 6]);
    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(result[1]).toEqual(undefined);
  });
});

/**
 * getMonthInfo
 */
describe("getMonthInfo", () => {
  it("works for October 2019", () => {
    expect(getMonthInfo("October 2019")).toEqual({
      daysInMonth: 31,
      firstWeekday: 2
    });
  });

  it("works for October 2020", () => {
    expect(getMonthInfo("October 2020")).toEqual({
      daysInMonth: 31,
      firstWeekday: 4
    });
  });

  it("works for December 2019", () => {
    expect(getMonthInfo("December 2019")).toEqual({
      daysInMonth: 31,
      firstWeekday: 0
    });
  });

  it("works for February 2020", () => {
    expect(getMonthInfo("February 2020")).toEqual({
      daysInMonth: 29,
      firstWeekday: 6
    });
  });
});

/**
 * getMonthNumber
 */
describe("getMonthNumber", () => {
  it("works for January", () => {
    expect(getMonthNumber("January")).toBe(0);
  });

  it("works for March", () => {
    expect(getMonthNumber("March")).toBe(2);
  });

  it("works for December", () => {
    expect(getMonthNumber("December")).toBe(11);
  });

  it("return -1 for non-month", () => {
    expect(getMonthNumber("Novembruary")).toBe(-1);
  });
});

/**
 * initializeMonthlyData
 */
describe("initializeMonthlyData", () => {
  class Dummy extends React.Component {
    state = {
      monthlyData: { existing: { hasData: true } }
    };

    render() {
      return null;
    }
  }

  it("creates new entry without overwriting existing data", () => {
    const wrapper = shallow(<Dummy />);
    const setState = wrapper.instance().setState;

    initializeMonthlyData("October 2019", setState);

    expect(wrapper.state("monthlyData")).toEqual({
      existing: { hasData: true },
      "October 2019": { ...defaultMonthlyDataEntry }
    });
  });
});
