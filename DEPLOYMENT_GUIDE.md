# 🚀 Aurex Exteriors Website Deployment Guide

## Overview
Your Aurex Exteriors website will be deployed using:
- **Frontend**: Vercel (Free tier, perfect for React apps)
- **Backend**: Railway (Starter plan ~$5/month, includes database)
- **Domain**: aurexexteriors.com.au (your existing domain)

## Step-by-Step Deployment

### Step 1: Prepare GitHub Repository
1. **Create a GitHub account** (if you don't have one): https://github.com
2. **Create a new repository** named `aurex-exteriors-website`
3. **Upload your website code** to GitHub

### Step 2: Deploy Backend to Railway
1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Create New Project** → **Deploy from GitHub repo**
4. **Select**: `aurex-exteriors-website` repository
5. **Choose**: `/backend` folder
6. **Environment Variables** to add:
   ```
   MONGO_URL=mongodb://mongo:27017
   DB_NAME=aurex_exteriors
   PORT=8000
   ```
7. **Deploy** - Railway will provide you with a backend URL like:
   `https://your-backend-xyz.railway.app`

### Step 3: Deploy Frontend to Vercel
1. **Go to**: https://vercel.com
2. **Sign up** with GitHub
3. **Import Project** → Select `aurex-exteriors-website`
4. **Root Directory**: Set to `frontend`
5. **Environment Variable** to add:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-xyz.railway.app
   ```
6. **Deploy** - Vercel will give you a URL like:
   `https://aurex-exteriors-xyz.vercel.app`

### Step 4: Connect Your Domain (aurexexteriors.com.au)
1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add custom domain: `aurexexteriors.com.au`
   - Add www subdomain: `www.aurexexteriors.com.au`

2. **Update DNS Settings** (at your domain registrar):
   ```
   Type: A Record
   Name: @
   Value: 76.76.19.61

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Step 5: Test Your Live Website
- Visit: https://aurexexteriors.com.au
- Test contact form, navigation, mobile responsiveness

## Important Notes

### Free Tier Limitations
- **Vercel**: 100GB bandwidth/month (plenty for small business)
- **Railway**: $5/month after free trial for backend + database

### Domain Propagation
- DNS changes can take 24-48 hours to propagate worldwide
- Your website might not be immediately accessible

### Monitoring
- Check Railway dashboard for backend health
- Check Vercel dashboard for frontend performance

## Troubleshooting

### Common Issues
1. **Backend not connecting**: Check Railway environment variables
2. **Frontend not loading**: Check REACT_APP_BACKEND_URL in Vercel
3. **Domain not working**: Wait for DNS propagation or check DNS settings

### Support
- **Railway**: https://railway.app/help
- **Vercel**: https://vercel.com/support
- **DNS Issues**: Contact your domain registrar

## Costs Summary
- **Domain**: ~$20/year (already owned)
- **Vercel Frontend**: Free
- **Railway Backend**: ~$5-10/month
- **Total**: ~$5-10/month

Your professional Aurex Exteriors website will be live at aurexexteriors.com.au!