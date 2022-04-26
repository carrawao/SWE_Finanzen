import React from 'react';
import ReactDom from 'react-dom';
import AnalysisScreen from '../AnalysisList';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow, render, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
// React 16 Enzyme adapter
configure({ adapter: new Adapter() });



it("AnalysisScreen renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
        <BrowserRouter>
            <AnalysisScreen></AnalysisScreen>
        </BrowserRouter>
    , div);
});

it('Snapshot Test AnalysisScreen', () => {

        const tree = shallow(<AnalysisScreen />);
        expect(toJson(tree)).toMatchSnapshot();
});