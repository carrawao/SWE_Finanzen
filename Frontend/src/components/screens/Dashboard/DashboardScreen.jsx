import React from 'react';
import ScreensTemplate from '../ScreensTemplate';
import { SearchField } from '../common/index';

const Dashboard = () => {
    const renderHeader = () => (
        <SearchField />
    );

    const renderBody = () => (
        <h1>Welcome to Dashboard!</h1>
    );

    return (
        <React.Fragment>
            <ScreensTemplate
                headerComponent={renderHeader}
                bodyComponent={renderBody}
                searchBar
            />
        </React.Fragment>

    );
}

export default Dashboard;