//  This file contains everything that can help with authenticating the database
// npm i express-session
//  import the express session module
import session from "express-session";


export const sessionModule = session({
    secret: "your secret key", /* secret string used to verify cookie data*/
    resave: false,
    saveUninitialized: true, /* middleware should create sesssion even if there is no data after logging in*/
    cookie: {secure: false}
});



//  import the sessionModule created here since it will be called
// import session from "express-session";

/// creating a function that will check if a user is authenticated


export const requireAuth = (req, res, next) => {
    try {
        if (req.sessionModule && req.sessionModule.userId) { /*change from session module to ession if it doesnt work*/
            next();
        } else{
            res.status(401).json({message: "Unauthorized"});
        }
    } catch (err) {
        console.error("Error in your requireAuth middleware:", err);
    // send a response to the user
    res.status(500).json({message: "Internal Server Error!"});
    }
}; /* await and async are not needed here cos they are used for callings (db and api calls). use try catch instead*/


// export default requireAuth




// creating a function that will check if a user is authenticated before allowing them to access certain routes 






/***************NOTES ON SESSION.JS (SESSION MANAGEMENT) ************** 

1. The first part (import session from 'express-session';) imports the express-session middleware, 
which helps manage user sessions in your Express app. Sessions allow you to track 
user state (like whether they're logged in) across different requests.

2. The next line (export const session = session({ ... })); configures the session 
middleware and and export in order to apply it to all routes in your 
app using app.use(session), ie after you import the newly created exported session. 
The configuration object defines various settings for session behavior:

    a. secret: 'your_secret_key': This is a crucial security measure. It's a secret string used to sign and verify session data stored in cookies. Never share this key publicly!

    b. resave: false: This option tells the session middleware to not automatically save the session even if it hasn't been modified. This can improve performance.

    c. saveUninitialized: true: This option instructs the middleware to create a session even if there's no data in it yet (e.g., right after a user logs in).

    d. cookie: { secure: false }: This configures the session cookie. By default, the secure flag is set to false. This means the cookie will be sent over HTTP connections (not secure) as well as HTTPS.  In a production environment, you should set secure: true to ensure cookies are only sent over HTTPS connections, which is more secure.




*/