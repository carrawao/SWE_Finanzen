*** Settings ***
Documentation     Template robot main suite.
Library     SeleniumLibrary     XvfbRobot

*** Variables ***
${LOGIN URL}      http://localhost:3000  
${BROWSER}    chrome


*** Tasks ***
Insert the sales data for the week and export it as a PDF
    Open the intranet website

*** Keywords ***
Open the intranet website
    Start Virtual Display   1920 1080
    Open Browser    ${LOGIN URL}  
    Set Windwos Size    1920 1080

