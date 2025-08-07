# Movie App 🎬

A responsive, client-side movie browsing application built with HTML, CSS, and jQuery. This app uses The Movie Database (TMDb) API to allow users to discover popular movies, search for specific titles, view detailed information, and manage a list of their favorite films.

---

## Features

- **Browse Popular Movies:** The homepage displays a grid of currently popular movies.
- **Search Functionality:** Instantly search for any movie title using the search bar.
- **Detailed Movie Page:** Click on any movie to view comprehensive details, including synopsis, cast, runtime, budget, revenue, and similar movies.
- **Favorites System:** Add or remove movies from a personal favorites list, which is saved in the browser's local storage.
- **Dedicated Favorites Page:** View all your favorited movies on a separate page.
- **Responsive Design:** The layout is fully responsive and works seamlessly on desktop, tablet, and mobile devices.
- **Interactive UI:** Features like a click-and-drag scroller for "Similar Movies" provide a modern, app-like experience.

---

## 🚀 Setup and Configuration

To run this project, you need a TMDb API key. The project will not work without it.

### Step 1: Get Your TMDb API Key

1.  Go to [The Movie Database (TMDb)](https://www.themoviedb.org/) and create a free account.
2.  After logging in, go to your account **Settings**.
3.  In the left sidebar, click on the **API** section.
4.  Under the "Request an API Key" section, click to apply for a **Developer** key.
5.  Fill out the required information. For the application URL, you can use `http://localhost`.
6.  Once approved, you will be given an **API Read Access Token (v4 auth)**. This is the key you need. It will look something like `eyJhbGciOiJIUzI1NiJ9...`.

### Step 2: Add the API Key to the Project

In the project files, the API key has been replaced with the placeholder text `replace-api-token`. You need to replace all instances of this placeholder with your actual key, prefixed with `Bearer `.

**The Easiest Way to Do This in VS Code:**

1.  Open the project folder in Visual Studio Code.
2.  Open the "Search" panel on the left sidebar (or press `Ctrl+Shift+F`).
3.  In the **"Search"** input field, type:
    ```
    replace-api-token
    ```
4.  In the **"Replace"** input field, type:
    ```
    Bearer YOUR_API_TOKEN_HERE
    ```
    (Replace `YOUR_API_TOKEN_HERE` with the key you got from TMDb).
5.  Click the **"Replace All"** button (the icon next to the replace field). This will update all files in the project instantly.

![VS Code Find and Replace](https://i.imgur.com/gq6bJ2g.png)

---

## How to Run

This is a pure client-side project. You can run it by simply opening the `index.html` file in your web browser.

For the best experience and to avoid potential CORS issues with local file access, it is recommended to use a simple local server. If you have VS Code, the easiest way is with the **Live Server** extension.

1.  Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) from the VS Code marketplace.
2.  Right-click on the `index.html` file in the file explorer.
3.  Select **"Open with Live Server"**.

This will open the application in your default browser, and it will automatically reload whenever you save a file.
