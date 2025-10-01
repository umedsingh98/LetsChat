import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullname || "" );
  const [bio, setBio] = useState(authUser.bio || "" );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(!selectedImage){
        await updateProfile({fullname: name, bio: bio});
        navigate("/");
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = async () => {
        try {
          const base64Image = reader.result;
          await updateProfile({fullname: name, bio, profilePic: base64Image});
          navigate("/");
        } catch (error) {
          console.error("Error updating profile with image:", error);
          // Error is already handled in updateProfile function
        }
      };
    } catch (error) {
      console.error("Error updating profile:", error);
      // Error is already handled in updateProfile function
    }     
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h1 className="text-lg">Profile Details</h1>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
              }}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage) 
                  : authUser?.profilePic || assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${selectedImage || authUser?.profilePic && "rounded-full"}`}
            />
            Upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder="Write your bio"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-md cursor-pointer"
          >
            Save
          </button>
        </form>
        <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImage && 'rounded-full'}`} src={authUser?.profilePic || assets.logo_icon} alt="" />
      </div>
    </div>
  );
};

export default ProfilePage;
