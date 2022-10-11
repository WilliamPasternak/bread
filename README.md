# bread
bread is a free resource for reviewing and sharing salary information for the hospitality industry. It is completely anonymous and crowd-sourced.

**Link to project:** http://www.86bread.com
  <p align = 'center'>
<img align="center" src="https://github.com/WilliamPasternak/bread/blob/main/bread.gif" alt="bread project website">
</p>

## How It's Made:

**Tech used:** Bootstrap, EJS, CSS, JavaScript, Node.js, Express, Mongoose, Cloudinary 

This is a full stack web application in which the user can
- Create an account which is handled by Passport.js 
- Submit a Pay form which is stored on our servers.
- Logged in users can edit and delete their own posts.
- Upload salary verification documentation. Their image is temporarily stored on Cloudinary and a link to that image is stored in a MongoDB collection.
- Review salaries in a dynamic table populated by EJS
- Report questionable salaries with PUT

## Optimizations

**Design:**
- Implement stylized alert on 
- Ensure all screen sizes work
- International locations & dates
- Spanish and French native translations
- User Profile page

**Functionality:**
- Calculate & Track your weekly earnings 
- Signup with other methods
- Ability to reset password
- Give admin account ability to edit DB documents in app
- Limit 'Flags' to one per user, per post
- Clean up user data on form submit
- Edit post should pre-fill with selected drop down option


**Efficiency:**
- Remove unused styling
- Reduce unneeded data passed into ejs

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
<a target="_blank" href="https://github.com/WilliamPasternak/MovieNight">Movie Night</a>
        <br />
        <a target="_blank" href="https://github.com/WilliamPasternak/MovieNight">
          <img src="https://github.com/WilliamPasternak/MovieNight/blob/main/MovieNight%20Walkthrough.gif" width="100%" alt="Portfolio"/>
        </a>
    </td>
  </tr>
</table>



