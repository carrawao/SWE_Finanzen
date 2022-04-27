import React from 'react';
import ReactDom from 'react-dom';
import AnalysisScreen from '../AnalysisList';
import AnalysisDetailItem from '../AnalysisDetailitem';
import AnalysisStockSplitDetailitem from '../AnalysisStockSplitDetailitem';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow, render, mount, configure,  toequal} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { CollectionsBookmarkOutlined } from '@mui/icons-material';
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

it('Snapshot Test AnalysisDetailItem', () => {
    const share ={
        "assettype": "share", //,crypto oder cash
        "asset": "IBM", //symbol des assets
        "percantage": "32"}
    
    const index = 0;

    const tree = shallow(
         <AnalysisDetailItem props={share} key={`activity_${index}`}         
        ></AnalysisDetailItem>
    );

    expect(toJson(tree)).toMatchSnapshot();
});

it('Snapshot Test AnalysisStockSplitDetailItem', () => {
    const share ={
        "propertie" : "Germany", //Asset category
        "percantage" : 30   //Percentage of category
    }
    
    const index = 0;

    const tree = shallow(
         <AnalysisStockSplitDetailitem props={share} key={`activity_${index}`}         
        ></AnalysisStockSplitDetailitem>
    );

    expect(toJson(tree)).toMatchSnapshot();
});



it('Hover Test AnalysisDetailItem', () => {
    const share ={
        "propertie" : "Germany", //Asset category
        "percantage" : 30   //Percentage of category
    }
    
    const index = 0;

    const tree = mount(
         <AnalysisDetailItem props={share} key={`activity_${index}`}         
        ></AnalysisDetailItem>
    );

    expect(tree.find(".hoverElement").first().hasClass('hovered')).toEqual(false);
    
    tree.find(".hoverElement").first().simulate("mouseenter");

    expect(tree.find(".hoverElement").first().hasClass('hovered')).toEqual(true);    
});