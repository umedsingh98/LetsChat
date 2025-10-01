# LetsChat Setup Guide

## Environment Variables Setup

### Backend (.env file in `LetsChat/backend/`)

Create a `.env` file in the `LetsChat/backend/` directory with the following content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/letschat
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env file in `LetsChat/letschat/`)

Create a `.env` file in the `LetsChat/letschat/` directory with the following content:

```
VITE_BACKEND_URL=http://localhost:5000
```

## Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/) and create a free account
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Replace the placeholder values in the backend .env file

## MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update the MONGODB_URI in the backend .env file accordingly

## Running the Application

1. **Backend**: 
   ```bash
   cd LetsChat/backend
   npm install
   npm run server
   ```

2. **Frontend**:
   ```bash
   cd LetsChat/letschat
   npm install
   npm run dev
   ```

## Profile Update Issues Fixed

The following issues have been resolved:

1. **Better Error Handling**: Added proper error handling in both frontend and backend
2. **Input Validation**: Added validation for required fields (fullname and bio)
3. **Duplicate Toast Messages**: Removed duplicate success messages
4. **FileReader Variable**: Fixed typo in FileReader variable name
5. **Error Response Handling**: Improved error response handling in AuthContext

## Troubleshooting

If profile updates still don't work:

1. Check browser console for errors
2. Check backend console for errors
3. Verify environment variables are set correctly
4. Ensure MongoDB is running
5. Verify Cloudinary credentials are correct
