# Backend API for Hashtag Fetching

This project is a Node.js backend application that fetches trending hashtags from Twitter using Selenium WebDriver and stores them in a MongoDB database. It also uses the rotating IPs using ProxyMesh.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Fetch Hashtags](#fetch-hashtags)
  - [Get Hashtags](#get-hashtags)
- [Proxy Settings](#proxy-settings)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Ensure you have MongoDB running and accessible.

## Proxy Settings

To configure proxy settings, you need to modify the `background.js` file located in the `extension` directory. Here are the steps:

1. Open `extension/background.js`.
2. Update the `host` and `port` in the `config` object to match your proxy server details:

   ```javascript
   var config = {
     mode: "fixed_servers",
     rules: {
       singleProxy: {
         scheme: "http",
         host: "your-proxy-host",
         port: "your-proxy-port",
       },
       bypassList: ["localhost"],
     },
   };
   ```

3. Add your proxy username and password in the `callbackFn` function:

   ```javascript
   function callbackFn(details) {
     return {
       authCredentials: {
         username: "your-username", // Replace with your proxy username
         password: "your-password", // Replace with your proxy password
       },
     };
   }
   ```

4. Save the changes.

## Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```
MONGODB_SRV=<your_mongodb_connection_string>
TWITTER_AUTH_TOKEN=<your_twitter_auth_token>
TWITTER_CT0=<your_twitter_ct0_value>
TWITTER_PERSONALIZED_ID=<your_twitter_personalized_id>
TWITTER_TWID=<your_twitter_twid>
```

Replace `<your_mongodb_connection_string>` and other placeholders with your actual values.
You can get your twitter credentials from cookies tab at x.com.

## API Endpoints

### Fetch Hashtags

- **Endpoint:** `POST /fetch-hashtags`
- **Description:** Fetches trending hashtags from Twitter and stores them in the database.
- **Request Body:** None
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Hashtags fetched and stored successfully",
      "data": {
        "unique_id": "some-unique-id",
        "AllTrends": [
          {
            "title": "Trend Title",
            "region": "Region Name"
          },
          ...
        ],
        "date_time": "2023-10-01T12:00:00Z",
        "ip_address": "192.168.1.1"
      }
    }
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "message": "Error fetching hashtags",
      "error": "Error message"
    }
    ```

### Get Hashtags

- **Endpoint:** `GET /get-hashtags`
- **Description:** Retrieves all stored hashtags from the database.
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Data retrieved successfully",
      "data": [
        {
          "unique_id": "some-unique-id",
          "AllTrends": [...],
          "date_time": "2023-10-01T12:00:00Z",
          "ip_address": "192.168.1.1"
        },
        ...
      ]
    }
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "message": "Error retrieving data",
      "error": "Error message"
    }
    ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Use a tool like Postman or cURL to interact with the API endpoints.

3. To fetch hashtags, send a `POST` request to `http://localhost:<your_port>/fetch-hashtags`.

4. To retrieve stored hashtags, send a `GET` request to `http://localhost:<your_port>/get-hashtags`.

## License

This project is licensed under the MIT License.
