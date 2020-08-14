import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import Student from "./Student";

describe("student", () => {
    it('should render component', () => {
        const historyMock = { push: jest.fn() };
        const {getByText} = render(<Student id="1234" name="suraj" age="12" roll="432"/>)
        expect(getByText('Name : suraj')).toBeInTheDocument();
        fireEvent.click(getByText('OPEN'));
        expect(historyMock.push.mock.calls[0]).toEqual([ "/openStudent", {id: "1234"} ]);
    });
})