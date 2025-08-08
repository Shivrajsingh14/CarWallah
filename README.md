# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/592daa45-d241-41a8-bc36-363b6636dd5a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/592daa45-d241-41a8-bc36-363b6636dd5a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/592daa45-d241-41a8-bc36-363b6636dd5a) and click on Share -> Publish.

## Car Rental Admin Panel

This project includes a complete admin panel for managing the car rental website. Here's how to set it up and use it:

### Setup

1. Make sure you have MongoDB installed and running
2. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
3. Install dependencies and start the server:
   ```sh
   npm install
   npm run start
   ```
4. Create the initial admin user:
   ```sh
   npm run create-admin
   ```
   This will create an admin user with the following credentials:
   - Email: admin@carwallah.com
   - Password: admin123

### Admin Panel Features

The admin panel is accessible at `/admin` and includes:

1. **Dashboard** - Overview of bookings, revenue, and car statistics
2. **Cars** - Manage car listings (add, edit, delete cars)
3. **Bookings** - View and manage bookings
4. **Admin Users** - Manage admin access
5. **Profile** - Update your admin profile
6. **Settings** - Configure system settings

### Security

- The admin panel uses JWT authentication for secure access
- Role-based authorization ensures only admin users can access the panel
- All API routes are protected with authentication middleware

### File Uploads

Car images are stored in the `public/lovable-uploads` directory. The directory is automatically created when the server starts.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
