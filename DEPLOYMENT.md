# Deployment Guide

Complete step-by-step guide to deploy the Multi-Language News Portal to production.

## Part 1: MongoDB Atlas Setup (Free Tier)

### Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google account
3. Complete the registration form

### Step 2: Create a New Cluster
1. After login, click **"Build a Database"** or **"Create"**
2. Choose **"M0 FREE"** tier (shared cluster, free forever)
3. Select a cloud provider and region (choose one closest to your users):
   - **AWS**, **Google Cloud**, or **Azure**
   - Region: e.g., `Mumbai (ap-south-1)` or `US East (us-east-1)`
4. Click **"Create Cluster"** (takes 3-5 minutes to provision)

### Step 3: Create Database User
1. In the left sidebar, click **"Database Access"** under Security
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - Username: `newsadmin` (or any username you prefer)
   - Password: Click **"Autogenerate Secure Password"** and **copy it** (save it somewhere safe)
5. Set **Database User Privileges** to **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Whitelist IP Address (Network Access)
1. In the left sidebar, click **"Network Access"** under Security
2. Click **"Add IP Address"**
3. For development/testing, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - ⚠️ For production, add only your server's IP or use Render's IP range
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster (M0 cluster)
3. Choose **"Connect your application"**
4. Select:
   - Driver: **Node.js**
   - Version: **5.5 or later**
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://newsadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>`** with the password you copied in Step 3
7. Add your database name after `.net/`:
   ```
   mongodb+srv://newsadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/newsdb?retryWrites=true&w=majority
   ```
8. **Save this complete connection string** — you'll need it for Render

---

## Part 2: Render Deployment

### Step 1: Push Code to GitHub
✅ **Already done!** Your code is at:
```
https://github.com/davizzrobo/URK23CS1305_WEB_TECH_EXP8
```

### Step 2: Create Render Account
1. Go to [https://render.com/](https://render.com/)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended) or email

### Step 3: Create New Web Service
1. After login, click **"New +"** in the top right
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Find and select your repository:
   ```
   davizzrobo/URK23CS1305_WEB_TECH_EXP8
   ```
5. Click **"Connect"**

### Step 4: Configure Web Service
Fill in the following settings:

**Basic Settings:**
- **Name**: `news-portal` (or any unique name you prefer)
- **Region**: Choose closest to your users (e.g., `Singapore` or `Frankfurt`)
- **Branch**: `main`
- **Root Directory**: (leave blank)
- **Runtime**: **Node**
- **Build Command**: 
  ```
  npm install
  ```
- **Start Command**:
  ```
  npm start
  ```

**Instance Type:**
- Select **"Free"** (this gives you 750 hours/month free)

### Step 5: Add Environment Variables
Scroll down to **"Environment Variables"** section and click **"Add Environment Variable"**

Add these two variables:

1. **First Variable:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://newsadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/newsdb?retryWrites=true&w=majority`
     (paste the connection string from MongoDB Atlas Step 5)

2. **Second Variable:**
   - Key: `PORT`
   - Value: `5000`

3. **Third Variable (optional but recommended):**
   - Key: `NODE_ENV`
   - Value: `production`

### Step 6: Deploy
1. Click **"Create Web Service"** at the bottom
2. Render will:
   - Clone your GitHub repo
   - Run `npm install`
   - Run `npm start`
   - Deploy your app
3. Wait 2-3 minutes for deployment to complete
4. You'll see build logs in real-time

### Step 7: Access Your App
1. Once deployment succeeds, you'll see:
   ```
   Your service is live 🎉
   ```
2. Click on the URL shown (looks like):
   ```
   https://news-portal-xxxx.onrender.com
   ```
3. Your app is now live! The frontend will load at the root URL

### Step 8: Test Your Deployed App
1. Open your Render URL in a browser
2. Click **"Seed Demo Data"** to add sample news articles
3. Try filtering by language (English/Hindi)
4. Test adding a new article via the admin form
5. Test deleting an article

---

## Part 3: Continuous Deployment (Automatic Updates)

Your app is now configured for **auto-deploy**! Every time you push to the `main` branch on GitHub:

1. Render automatically detects the push
2. Rebuilds and redeploys your app
3. Your changes go live in 2-3 minutes

**To deploy updates:**
```bash
cd /home/david/HTML/WEB_TECH_EXP/WEB_TECH_EXP_8
# Make your changes...
git add .
git commit -m "your update message"
git push
# Wait 2-3 minutes and your changes are live!
```

---

## Troubleshooting

### Issue: "Application failed to respond"
- Check **Logs** in Render dashboard
- Verify `MONGODB_URI` is correct (no extra spaces, correct password)
- Make sure MongoDB Network Access allows `0.0.0.0/0`

### Issue: "MongoServerError: bad auth"
- Password in `MONGODB_URI` is incorrect
- Go to MongoDB Atlas → Database Access → Edit user → Reset password
- Update `MONGODB_URI` in Render environment variables

### Issue: "Cannot connect to MongoDB"
- Check Network Access in MongoDB Atlas
- Ensure `0.0.0.0/0` is whitelisted
- Verify connection string format is correct

### Issue: Frontend shows but API doesn't work
- Check Render logs for errors
- Verify environment variables are set
- Make sure `PORT` is set to `5000` or removed (Render sets it automatically)

---

## Local Development vs Production

**Local (Development):**
```bash
# Uses local MongoDB or .env file
MONGODB_URI=mongodb://127.0.0.1:27017/newsdb
PORT=5000

# Start server
npm run dev
# Access: http://localhost:5000
```

**Production (Render):**
- Uses MongoDB Atlas (cloud database)
- Environment variables set in Render dashboard
- Auto-deploys on git push
- Access via: `https://your-app-name.onrender.com`

---

## MongoDB Atlas Tips

1. **Free tier limits**: 512 MB storage (enough for thousands of articles)
2. **Cluster pauses**: After 60 days of inactivity (just connect again to resume)
3. **Backup**: Automatic backups not included in free tier
4. **Monitoring**: View metrics in Atlas dashboard (connections, operations, etc.)

## Render Free Tier Limits

1. **750 hours/month** (enough for one always-on service)
2. **Service sleeps after 15 min of inactivity** (wakes up on first request in ~30 sec)
3. **512 MB RAM**
4. **100 GB bandwidth/month**

---

## Next Steps

- [ ] Add your Render URL to the README
- [ ] Test all CRUD operations on production
- [ ] Record a demo video showing the live app
- [ ] (Optional) Add custom domain in Render settings
- [ ] (Optional) Add SSL certificate (free with Render)

---

## Useful Links

- **Your GitHub Repo**: https://github.com/davizzrobo/URK23CS1305_WEB_TECH_EXP8
- **MongoDB Atlas**: https://cloud.mongodb.com/
- **Render Dashboard**: https://dashboard.render.com/
- **MongoDB Docs**: https://www.mongodb.com/docs/
- **Render Docs**: https://render.com/docs

---

**🎉 Congratulations! Your full-stack app is now live!**
