import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBirthdayCake, FaCalendarCheck, FaCalendarPlus, FaEnvelope, FaPhone, FaTransgender, FaUser } from "react-icons/fa";

const convertArrayToDate = (dateArray) => {
    const [year, month, day, hour, minute] = dateArray;
    return new Date(year, month - 1, day, hour, minute);
};

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const userId = localStorage.getItem("Id"); // Assuming the userId is stored in local storage


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/id/${userId}`);
                setUser(response.data);
            } catch (error) {
                setError("Failed to load profile. Please try again later.");
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>
            <div className="space-y-4">
                <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-2" />
                    <span className="font-semibold">Username:</span>
                    <span className="ml-2">{user.username}</span>
                </div>
                <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-2" />
                    <span className="font-semibold">Email:</span>
                    <span className="ml-2">{user.email}</span>
                </div>
                <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-2" />
                    <span className="font-semibold">Phone Number:</span>
                    <span className="ml-2">{user.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                    <FaBirthdayCake className="text-blue-500 mr-2" />
                    <span className="font-semibold">Date of Birth:</span>
                    <span className="ml-2">{new Date(convertArrayToDate(user.dateOfBirth)).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                    <FaTransgender className="text-blue-500 mr-2" />
                    <span className="font-semibold">Gender:</span>
                    <span className="ml-2">{user.gender}</span>
                </div>
                <div className="flex items-center">
                    <FaCalendarPlus className="text-blue-500 mr-2" />
                    <span className="font-semibold">Account Created At:</span>
                    <span className="ml-2">{new Date(convertArrayToDate(user.createdAt)).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                    <FaCalendarCheck className="text-blue-500 mr-2" />
                    <span className="font-semibold">Last Updated At:</span>
                    <span className="ml-2">{new Date(convertArrayToDate(user.updatedAt)).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
