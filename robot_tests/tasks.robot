*** Settings ***
Documentation     Template robot main suite.
Library     SeleniumLibrary

*** Variables ***
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome
${CHROMEDRIVER_PATH}        /usr/local/bin/chromedriver


*** Tasks ***
Insert the sales data for the week and export it as a PDF
    Open the intranet website

*** Keywords ***
Open the intranet website
    Open Browser    ${LOGIN URL}    ${BROWSER}  executable_path=${CHROMEDRIVER_PATH}

