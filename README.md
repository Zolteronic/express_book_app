An example of creating a server using express with middleware.

start met:

1: npm install

2: npm run dev
curl --request POST ^
--url https://dev-dxzfqx250lzkp7gk.us.auth0.com/oauth/token \
 --header 'content-type: application/json' \
 --data '{"client_id":"7XdoDewUijjYdzp4TjLKxHP1g5EglHGm","client_secret":"SoTiRa1p2jVVDImM0ZL2QCBe5gPeL6-1H--H0zVp8zU-U2_LVhNLYnRRtbcxecbV","audience":"https://book-store-api","grant_type":"client_credentials"}'
