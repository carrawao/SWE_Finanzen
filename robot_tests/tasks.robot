*** Settings ***
Documentation     Test page buttons
Library     SeleniumLibrary    
Library     XvfbRobot

Test Setup      Open the intranet website

*** Variables ***
${LOGIN URL}      http://localhost:3000  
${BROWSER}    chrome

${URL_DASHBOARD}    http://localhost:3000/dashboard


${BUTTON_DASHBOARD}     xpath:/html/body/div[1]/div/nav/div/div/ul/a[2]


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
    Click Link    ${BUTTON_DASHBOARD}
    Location Should Be    ${URL_DASHBOARD} 
