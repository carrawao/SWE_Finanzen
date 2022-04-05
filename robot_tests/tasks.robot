*** Settings ***
Documentation     Template robot main suite.
Library     SeleniumLibrary 

*** Variables ***
${LOGIN URL}      http://localhost:3000  
${BROWSER}    chrome


*** Tasks ***
Insert the sales data for the week and export it as a PDF
    Open the intranet website

*** Keywords ***
Open the intranet website
    Open Browser    ${LOGIN URL}    ${BROWSER}  

