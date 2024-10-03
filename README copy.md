This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Let's dive into deploying your Next.js 14 application on a Hostinger VPS running Ubuntu 22.04 with CloudPanel. I'll guide you through every step, from setting up the environment to automating deployments with GitHub.

1. Initial VPS Setup
   1.1. Accessing Your VPS
   Login to Hostinger Cloud Panel:

Go to Hostinger Cloud Panel and log in.
Access Your VPS via SSH:

Once your VPS is set up, you should have an IP address, username, and password.
Open a terminal (on Linux/Mac) or use an SSH client like PuTTY (on Windows).
SSH into your VPS using the following command:
bash
Copy code
ssh username@your-vps-ip
Replace username with your VPS username and your-vps-ip with your VPS IP address.
Expected Output:

bash
Copy code
username@your-vps-ip's password:
After entering your password, you should be logged into your VPS.

1.2. Update Your Server
Ensure your server is up to date:

bash
Copy code
sudo apt update && sudo apt upgrade -y
Expected Output:

The terminal will show a list of packages being upgraded, and after completion, your server will be up to date. 2. Install Node.js and PM2
2.1. Install Node.js
Install Node.js from Nodesource:

Add NodeSource PPA (Personal Package Archive) to get the latest version of Node.js.
bash
Copy code
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
Confirm the installation:
bash
Copy code
node -v
npm -v
Expected Output:

You should see the version numbers for Node.js and npm, confirming they are installed.
2.2. Install PM2
PM2 is a process manager that keeps your Node.js application running:

bash
Copy code
sudo npm install -g pm2
Expected Output:

Installation logs will appear, and you can verify PM2 by running:
bash
Copy code
pm2 -v 3. Deploy Your Next.js Application
3.1. Upload Your Project to the VPS
Clone Your Repository from GitHub:

Navigate to the directory where you want to place your project.
bash
Copy code
cd /var/www
Clone your Next.js project:
bash
Copy code
git clone https://github.com/your-username/your-repo.git
Replace your-username and your-repo with your actual GitHub username and repository name.
Expected Output:

The terminal will show the cloning process, and your project directory will be created.
Navigate to Your Project Directory:

bash
Copy code
cd your-repo
3.2. Install Dependencies and Build
Install all the necessary Node.js packages:

bash
Copy code
npm install
Expected Output:

You’ll see a list of packages being installed.
Build your Next.js project:

bash
Copy code
npm run build
Expected Output:

Your Next.js project will compile, and a .next folder will be created.
3.3. Start the Application with PM2
Start your Next.js application using PM2:

bash
Copy code
pm2 start npm --name "nextjs-app" -- start
Expected Output:

PM2 will start your application, and you’ll see logs indicating that it’s running.
Save the PM2 process list and set it to start on boot:

bash
Copy code
pm2 save
pm2 startup
Expected Output:

PM2 will configure your server to start the application automatically on reboot. 4. Set Up Nginx as a Reverse Proxy
4.1. Install Nginx
Install Nginx to manage incoming HTTP requests:

bash
Copy code
sudo apt install nginx -y
Expected Output:

Nginx will be installed and should start automatically. You can check its status with:
bash
Copy code
sudo systemctl status nginx
4.2. Configure Nginx
Create a New Configuration File:

bash
Copy code
sudo nano /etc/nginx/sites-available/nextjs-app
Add the Following Configuration:

nginx
Copy code
server {
listen 80;
server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}
Replace your-domain.com with your actual domain name.

Enable the Configuration:

bash
Copy code
sudo ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled/
Test the Configuration and Restart Nginx:

bash
Copy code
sudo nginx -t
sudo systemctl restart nginx
Expected Output:

Nginx should restart without errors, and your application should now be accessible via your domain. 5. Set Up Automatic Deployment from GitHub
5.1. Install GitHub Webhooks
You can set up a webhook in your GitHub repository to trigger deployments automatically.
Install Node Packages for Deployment Automation:

Navigate to your project directory and install pm2-deploy:
bash
Copy code
npm install pm2 pm2-deploy --save-dev
Create a Deployment Script:

In your project root, create a ecosystem.config.js file:
javascript
Copy code
module.exports = {
apps: [{
name: "nextjs-app",
script: "npm",
args: "start"
}],
deploy: {
production: {
user: "your-username",
host: "your-vps-ip",
ref: "origin/main",
repo: "git@github.com:your-username/your-repo.git",
path: "/var/www/your-repo",
"post-deploy": "npm install && npm run build && pm2 reload ecosystem.config.js --env production"
}
}
}
Replace your-username, your-vps-ip, and your-repo with your details.

5.2. Set Up GitHub Webhook
Go to Your GitHub Repository:

Navigate to the "Settings" of your GitHub repository.
Click on "Webhooks" and "Add webhook".
Configure Webhook:

Set the payload URL to your server (e.g., http://your-domain.com/webhook-url).
Choose application/json as the content type.
Select the events you want to trigger the deployment, typically "push".
Set Up a Webhook Listener:

Use a service like ngrok to expose your local server to receive webhooks, or directly set up the webhook listener on your server.
Expected Output:

After setting this up, any push to the main branch of your GitHub repository will trigger the deployment script. 6. Final Checks
Verify Deployment:

Push a change to your GitHub repository and check if it triggers the deployment automatically.
Visit your domain to ensure the changes are reflected.
Monitor Logs:

bash
Copy code
pm2 logs
Check the logs to ensure everything is running smoothly.
Summary
Set Up VPS: Install Node.js and PM2.
Deploy Application: Upload, build, and run your Next.js application.
Configure Nginx: Set up a reverse proxy for your application.
Automate Deployments: Use GitHub webhooks for automatic updates.
This guide should cover all the necessary steps to get your Next.js 14 application running on a Hostinger VPS with Ubuntu 22.04 and automated deployment from GitHub. Let me know if you need any further details or run into any issues!
