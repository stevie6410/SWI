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

- Browser Compatibility
    - Internet Explorer 11
    - Google Chrome
    - iOS Safari

# Application Security

The application would have the following roles:
- Basic User
    - Can read public SWIs and SWIs in their own company
- Author
    - Can create SWIs in their own company
- Approver
    - Can approve SWIs in their own company 
- Manager
    - Can manage users permissions within their company
    - Can make SWIs in their own company public to all B/E

# Screens

## Login 
Login using B/E Aerospace Active Directory. We should not have to maintain seperate authentication details in this application. 

## Dashboard (Home Page)
The dashboard will act as the application home page and provide top level access to the menus and user specific information.
The dashboard will be built up from "modules" which can show summary or basic detail information. 

- My Recently Created SWIs
    - Show the last 5 SWIs created by the logged in user
- My Approval Queue (Approvers Only)
    - Show the SWIs which are waiting for the logged in users approval
- My Work In Progress (Authors Only)
    - Show the WIP / draft documents which have been started but not published by the logged in user.
- My Recently Trashed SWIs (Authors Only)
    - Show the last 5 SWIs trashed by the logged in user 

## Search
This screen would be the primary screen for searching all SWIs in the system. 
You will only find the SWIs for which you have the permissions (see Application Security section).

The following fields can be searched. The search screen criteria would build cumulatively. 

- Document Title (Text)
- Company (Drop down list based on permissions)
- Author (Text - possible lookup)
- Tags (Text)
- Document Category (Drop down list)
- Keyword (Text)
    - This would be based on the text inside all of the stages and would have to be a full wildcard.
- Created On (Date Range)
- Last Modified On (Date Range)

Search results would be displayed in a grid with basic metadata including, Document Title, SWI#, Author, 
Last Modified By and Created On. Also there would be a button to open the SWI edit screen and SWI viewer. 



