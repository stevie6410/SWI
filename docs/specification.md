# Work Instruction App Specification

B/E Aerospace require a replacment application for creating standard work instructions on mobile devices. 
Previously the iOS application "Inflowchart" was used to createthe documents. The generated files in both .pdf
 .inflowchart and .pages format are uploaded to a WebDAV server which has a WI App search web application over the top.
 This enables the uses with permmisions to search the repository in a basic fassion.

 Due to the discontinuation of Inflowchart and its lack of support in recent iOS vesions, a new cross platform, 
 mobile ready application is required.

# Acronyms

- SWI = Standard Work Instruction 


# Technology
## Server
- Hosting 
    - Windows Server 2008 R2
    - IIS 7
- Database
    - SQL Server 2008 R2
- Web Data Service
    - ASP.Net Web Api 2
    - REST compliant 

## Client (Web App)
- Angular 2
- Bootstrap 3 for styling

# Required Screens

## Login 
Login using B/E Aerospace Active Directory. We should not have to maintain seperate authentication details in this application. 

## Dashboard
- My Recently Created SWIs
    - Show the last 5 work instructions created by the logged in user
- My Approval Queue
    - Show the SWIs

