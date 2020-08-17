import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import Student from "./Student";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom').toString(),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe("student", () => {
    const renderComponent = () => render(<Student id="1234" name="suraj" age="12" roll="432"/>);

    it('should render component', () => {
        const {getByText} = renderComponent();
        expect(getByText('Name : suraj')).toBeInTheDocument();
    });

    it('should redirect to openStudent page', () => {
        const {getByText} = renderComponent();
        fireEvent.click(getByText('OPEN'));
        expect(mockHistoryPush).toHaveBeenCalledWith('/openStudent',{"id": "1234"})
    });

    it('should redirect to updateStudent page', () => {
        const {getByText} = renderComponent();
        fireEvent.click(getByText('UPDATE'));
        expect(mockHistoryPush).toHaveBeenCalledWith('/updateStudent',{"id": "1234"})
    });
})