# API Planning

- Food (food items& their details)
- Resturant (Resturant & their details)
- Menu (Menu and their details)
- Order (Order details)
- Image (store all the images related to the food items)
- Review (store all the review details)
- user (user details username, email, pass)

JWT - Json Web Token
Session Based Application

> tokens
> For the 1st sime when we visit the app (login/sign up)
> at this point of time -> a new unique JWT token will be generated
> if we revisit the app afetr certain time period we dont need to pass the credentials
> instead while making the request the generated JWT joken will be sent to the server
> JWT will be stored in the client/end user pc (cookies,localstorage)
> JWT also have expiration, it depends on business perspective
