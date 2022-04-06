*** Settings ***
Documentation     Test page buttons
Library     SeleniumLibrary    
Library     XvfbRobot

Default Tags    positive

Test Setup      Open the intranet website
Test Teardown      Close Browser

*** Variables ***
${LOGIN URL}      http://localhost:3000/watchlists 
${BROWSER}    chrome

${URL_DASHBOARD}    http://localhost:3000/dashboard


${BUTTON_DASHBOARD}     xpath:/html/body/div[1]/div/main/div[2]/div[1]/div/div[1]/button


*** Test Cases ***
Open Dashboard 
    Navigate to Dashboard


*** Keywords ***
Open the intranet website
    Start Virtual Display   1920    1080
    Open Browser    ${LOGIN URL}  
    Set Window Size    1920     1080

#Open the intranet website
#    Open Browser    ${LOGIN URL}    ${BROWSER}  

Navigate to Dashboard
    Wait Until Element Is Visible   ${BUTTON_DASHBOARD}
    Click Element    ${BUTTON_DASHBOARD}
