# Tweeter Project

Tweeter is a simple single-page application, a clone of Twitter.

This app uses HTML, CSS, JS, jQuery and AJAX on the front-end and Node, Express and MongoDB on the back-end. The client-side app communicates with a server via AJAX. Tweets are persisted to MongoDB and survive server restart.

## Dependencies

- Node 5.10.x or above
- Express
- body-parser
- chance
- md5
- mongodb

## Getting Started

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
3. Go to <http://localhost:8080/> in your browser.

## Screenshots

Tweeter Home Page -

![Tweeter Home Page](https://github.com/vishnuchen/Twitter-New/blob/master/docs/1-home-page.png "Tweeter Home Page")

Compose Button hover -

![Compose Button hover](https://github.com/vishnuchen/Twitter-New/blob/master/docs/2-on-hover-compose-button.png "Compose Button hover")


Compose Tweet Page -

![Compose Tweet Page](https://github.com/vishnuchen/Twitter-New/blob/master/docs/3-compose-tweet.png "Compose Tweet Page")


No Tweet Error Page -

![No Tweet Error Page](https://github.com/vishnuchen/Twitter-New/blob/master/docs/4-empty-text-submit.png "No Tweet Error Page")


Long Tweet Error Page -

![Long Tweet Error Page](https://github.com/vishnuchen/Twitter-New/blob/master/docs/5-more-than-140.png "Long Tweet Error Page")

Correct length tweet -

![Correct length tweet](https://github.com/vishnuchen/Twitter-New/blob/master/docs/6-correct-length.png "Correct length tweet")

successful tweet submission-

![successful tweet submission](https://github.com/vishnuchen/Twitter-New/blob/master/docs/7-tweet-submitted.png "successful tweet submission")
