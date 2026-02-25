# Vercel Deployment Guide

## Prerequisites
- A [Vercel account](https://vercel.com/sign-up) (free)
- Your project pushed to GitHub, GitLab, or Bitbucket
- All required environment variables prepared

## Step 1: Prepare Environment Variables

Copy `.env.example` to `.env.local` for local development:
```bash
cp .env.example .env.local
```

Fill in all required values in `.env.local` with your actual credentials:
- **Supabase**: Get from your Supabase project settings
- **EmailJS**: Get from your EmailJS account
- **Cal.com**: Get from your Cal.com account
- **Admin Credentials**: Set secure username and password

## Step 2: Push to Git Repository

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 3: Deploy on Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub/GitLab/Bitbucket repository
4. Click "Import"
5. **Important**: Add Environment Variables:
   - Click "Environment Variables" section
   - Add each variable from `.env.example`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_EMAIL_JS_SERVICE_ID`
     - `NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID`
     - `NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY`
     - `NEXT_PUBLIC_CAL_USERNAME`
     - `NEXT_PUBLIC_CAL_CURRENT_EVENT`
     - `ADMIN_USERNAME`
     - `ADMIN_PASSWORD`
6. Click "Deploy"

### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to link your project and add environment variables

## Step 4: Configure Environment Variables on Vercel

After deployment, add all environment variables in Vercel Dashboard:

1. Go to your project on Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable as described in Step 3
4. **Important**: For sensitive variables (ADMIN_PASSWORD, service keys), ensure they are set for both Production and Preview environments

## Step 5: Redeploy (if needed)

After adding environment variables:
```bash
vercel --prod
```

Or use the "Redeploy" button in the Vercel Dashboard

## Common Issues & Solutions

### Issue: Build fails with missing environment variables
**Solution**: Make sure all variables starting with `NEXT_PUBLIC_` are added to Vercel environment variables. These are accessible in the browser.

### Issue: Admin panel returns 401 Unauthorized
**Solution**: Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set correctly in Vercel environment variables.

### Issue: Database connection errors
**Solution**: 
- Verify Supabase credentials are correct
- Check if Supabase project allows connections from Vercel IP addresses
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct

### Issue: EmailJS not sending emails
**Solution**:
- Verify all EmailJS credentials (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`)
- Check EmailJS account has active service plan
- Verify template ID is correct in your EmailJS dashboard

### Issue: Cal.com embed not loading
**Solution**:
- Verify `NEXT_PUBLIC_CAL_USERNAME` is correct
- Verify `NEXT_PUBLIC_CAL_CURRENT_EVENT` exists in your Cal.com account
- Check Cal.com account has embedding enabled

## Useful Vercel Commands

```bash
# View deployment logs
vercel logs <project-url>

# List all deployments
vercel list

# Remove environment variable
vercel env rm <variable-name>

# View project info
vercel inspect <deployment-url>
```

## Domain Configuration

1. Go to your Vercel project Settings
2. Click "Domains"
3. Add your custom domain (e.g., aceframe.pro)
4. Update your domain's DNS records to point to Vercel
5. Vercel will provide DNS configuration instructions

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Homepage loads without errors
- [ ] Contact form sends emails
- [ ] Admin panel requires authentication
- [ ] Cal.com booking widget loads
- [ ] All images and assets load correctly
- [ ] Responsive design works on mobile
- [ ] Analytics (if configured) is tracking

## Support

For more information, visit:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/learn/basics/deploying-nextjs-app)
