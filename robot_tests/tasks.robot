*** Settings ***
Documentation     Test page buttons
Library     SeleniumLibrary    
Library     XvfbRobot

*** Variables ***
${LOGIN URL}      http://localhost:3000  
${BROWSER}    chrome

${URL_DASHBOARD}    https://dhbw-webshop.42b.in/index.php/shop-male/


${BUTTON_DASHBOARD}     xpath://*[@id="root"]/div/nav/div/div/ul/a[2]


*** Test Cases ***
Open Localhost
    Open the intranet website

Open Dashboard 
    Navigate to Dashboard


*** Keywords ***
Open the intranet website
    Start Virtual Display   1920    1080
    Open Browser    ${LOGIN URL}  
    Set Window Size    1920     1080

Navigate to Dashboard
    Click Link    ${BUTTON_DASHBOARD}
    Location Should Be    ${URL_DASHBOARD} 
