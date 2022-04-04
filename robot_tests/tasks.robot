*** Settings ***
Documentation     Template robot main suite.
Library    RPA.Browser.Selenium


*** Tasks ***
Insert the sales data for the week and export it as a PDF
    Open the intranet website

*** Keywords ***
Open the intranet website
    Open Available Browser    http://localhost:3000/


