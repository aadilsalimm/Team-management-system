# Team Management System

This project is a simple team management system designed to demonstrate the workings of a Database Management System (DBMS). It provides a web-based interface for a sports franchise to manage its teams, players, and staff.

---
## Features

* **Public Website:** A public-facing site where users can view information about the franchise's teams and players. ⚽
* **Admin Portal:** A secure admin portal with a login system. 🔐
* **Team Management:** Admins can create, read, update, and delete team information.
* **Player Management:** Admins can add, edit, and remove player details from each team.
* **Staff Management:** Admins can manage the information of supporting staff members.

---
## Technologies Used

This project is built with the following technologies:

* **Backend:** Node.js with the Express.js framework.
* **Database:** SQLite
* **Frontend:** HTML and CSS
* **Template Engine:** Handlebars

---
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/aadilsalimm/Team-management-system
    ```
2.  Navigate to the project directory
    ```sh
    cd Team-management-system
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Start the server
    ```sh
    npm start
    ```

---
## Usage

Navigate to `http://localhost:3000` (or your configured port) in your web browser. You will be met with a page showing two options - User and admin.
Select User to view the team informations as a normal user.
If selected 'admin', 
1.  Enter your admin credentials to log in.
2.  Once logged in, you will be redirected to the admin dashboard.
3.  From the dashboard, you can:
    * Add a new team.
    * Edit the details of an existing team.
    * Add or remove players and staff from a team.

---
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
