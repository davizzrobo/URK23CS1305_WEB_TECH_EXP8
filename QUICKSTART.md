# Quick Start Guide

## 🚀 MongoDB Atlas Setup (3 minutes)

### Step 1: Create Free Database
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Click "Build a Database" → Choose **M0 FREE**
4. Select region (closest to you) → Click "Create Cluster"

### Step 2: Create User & Allow Access
1. Go to "Database Access" → Add New User
   - Username: `newsadmin`
   - Password: Click "Autogenerate" → **COPY IT**
2. Go to "Network Access" → Add IP Address
   - Click "Allow Access from Anywhere" → Confirm

### Step 3: Get Connection String
1. Go to "Database" → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your password from Step 2
5. Add `/newsdb` after `.net`:
   ```
   mongodb+srv://newsadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/newsdb?retryWrites=true&w=majority
   ```
6. **Save this!** You'll need it for Render

---

## 🌐 Render Deployment (2 minutes)

### Step 1: Create Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Deploy
1. Click "New +" → "Web Service"
2. Connect repository: `davizzrobo/URK23CS1305_WEB_TECH_EXP8`
3. Settings:
   - **Name**: `news-portal`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables
Click "Add Environment Variable" and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your connection string from MongoDB Step 3 |
| `PORT` | `5000` |

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes
3. Your app is live! 🎉

---

## ✅ Test Your App

1. Open your Render URL (looks like: `https://news-portal-xxxx.onrender.com`)
2. Click "Seed Demo Data" to add sample articles
3. Try filtering by language (English/Hindi)
4. Add a new article
5. Delete an article

---

## 📝 Auto-Deploy

Every time you push to GitHub, Render automatically deploys:

```bash
cd /home/david/HTML/WEB_TECH_EXP/WEB_TECH_EXP_8
# Make changes...
git add .
git commit -m "your update"
git push
# ✅ Live in 2-3 minutes!
```

---

## 🆘 Troubleshooting

**Can't connect to MongoDB?**
- Go to MongoDB Atlas → Network Access
- Make sure `0.0.0.0/0` is listed (Allow from Anywhere)
- Check password in `MONGODB_URI` (no extra spaces)

**Render shows error?**
- Click "Logs" in Render dashboard
- Check if `MONGODB_URI` is correct
- Verify MongoDB user password

**Frontend loads but API doesn't work?**
- Check Render logs for errors
- Verify environment variables are set

---

## 📚 Full Guide

For detailed instructions with explanations, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Total time: ~5 minutes** ⏱️  
**Cost: $0** 💰
