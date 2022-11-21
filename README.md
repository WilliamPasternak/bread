# bread
bread is a free resource for reviewing and sharing salary information for the hospitality industry. It is completely anonymous and crowd-sourced.

**Link to project:** http://www.86bread.com
  <p align = 'center'>
<img align="center" src="https://github.com/WilliamPasternak/bread/blob/main/bread.gif" alt="bread project website">
</p>

## How It's Made:

**Tech used:** Bootstrap, EJS, CSS, JavaScript, Node.js, Express, Mongoose, Cloudinary, Passport.js 

This is a full stack web application in which the user can
- Create an account which is handled by Passport.js 
- Submit a Pay form which is stored on our servers.
- Track their earnings and determine their average daily earnings.
- Logged in users can edit and delete their own posts.
- Upload salary verification documentation. Their image is temporarily stored on Cloudinary and a link to that image is stored in a MongoDB collection.
- Review salaries in a dynamic table populated by EJS
- Report questionable salaries with PUT

## Optimizations

**Design:**
- Implement stylized alerts after form submissions
- Native translations implemented (Spanish Complete, French: In Progress)

**Functionality / Usability:**
- Calculate & Track your weekly earnings (Complete - refactor code)
- Signup with other methods
- Give admin account ability to edit DB documents in app
- Limit 'Flags' to one per user, per post
- Clean up user data on form submit
- Edit post should pre-fill with selected drop down option
- Fix date/day formatting issue using date HTML5 input type
- Add Companies to a watchlist
- More info on shift feed (e.g. link to company)
- Add Event Work, Brand Work and Consulting option to share
- Create pages for each business in db
- Add filters to Salaries Table
- Auto suggest or complete form data
- Make image upload optional in Salaries form (combine verified and share form)

**Efficiency / Code Improvement:**
- Remove unused styling
- Reduce unneeded data passed into ejs
- Change Post Model name and data types

## More Projects
<table bordercolor="#66b2b2">
  <tr>
    <td width="33.3%"  style="align:center;" valign="top">
<a target="_blank" href="https://github.com/WilliamPasternak/busboy">Busboy</a>
        <br />
      <a target="_blank" href="https://github.com/WilliamPasternak/busboy">
            <img src="https://github.com/WilliamPasternak/busboy/blob/main/busyboy.gif" width="100%"  alt="Busbo.co"/>
        </a>
    </td>
    <td width="33.3%" valign="top">
<a target="_blank" href="https://github.com/WilliamPasternak/Dilution-Calculator">Dilution Calculator</a> 
      <br />
        <a target="_blank" href="https://github.com/WilliamPasternak/Dilution-Calculator">
          <img src="https://github.com/WilliamPasternak/Dilution-Calculator/raw/main/Dilution.gif" width="100%" alt="Matching Card Game"/>
        </a>
    </td>
    <td width="33.3%" valign="top">
<a target="_blank" href="https://github.com/WilliamPasternak/Theophilio">Theophilio</a> 
      <br />
        <a target="_blank" href="https://github.com/WilliamPasternak/Theophilio">
          <img src="https://github.com/WilliamPasternak/Theophilio/blob/main/Theophilio.png" width="100%" alt="Matching Card Game"/>
        </a>
    </td>


</table>



