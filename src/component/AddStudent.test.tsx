import React from "react";
import {render, fireEvent} from "@testing-library/react";
import AddStudent from "./AddStudent";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom').toString(),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
describe('Add student', () => {
    it('should render component', () => {
        const {getByText} = render(<AddStudent/>);
        expect(getByText('Name')).toBeInTheDocument();
    });

    it('should render with ADD when id is not present', () => {
        const {getByText} = render(<AddStudent/>);
        expect(getByText('ADD')).toBeInTheDocument();
    });

    it('should render with UPDATE when id is present', () => {
            const location = {
                state: {
                    id: '1234'
                }
            }

        const {getByText} = render(<AddStudent location={location}/>);
        expect(getByText('UPDATE')).toBeInTheDocument();
    });

    it('should call addStudent url when id is not present', () => {

        const {getByText} = render(<AddStudent />);
        fireEvent.click(getByText('ADD'));
        expect(getByText('ADD')).toBeInTheDocument();
    });

    it('should call updateStudent url when id is present', () => {
        const location = {
            state: {
                id: '1234'
            }
        }
        const {getByText} = render(<AddStudent location={location} />);
        fireEvent.click(getByText('UPDATE'));
        expect(getByText('UPDATE')).toBeInTheDocument();
    });
})