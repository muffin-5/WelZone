import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBirthdayCake, FaEnvelope, FaPhone, FaStar, FaUser, FaBook, FaCalendarCheck, FaCalendarPlus, FaBriefcase } from "react-icons/fa";

const convertArrayToDate = (dateArray) => {
    const [year, month, day, hour, minute] = dateArray;
    return new Date(year, month - 1, day, hour, minute);
};

const CounselorProfile = () => {
    const [counselor, setCounselor] = useState(null);
    const [error, setError] = useState("");
    const counselorId = localStorage.getItem("Id"); // Assuming the counselorId is stored in local storage

    useEffect(() => {
        const fetchCounselorProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/counselors/id/${counselorId}`);
                setCounselor(response.data);
            } catch (error) {
                setError("Failed to load profile. Please try again later.");
            }
        };

        fetchCounselorProfile();
    }, [counselorId]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!counselor) return <p>Loading profile...</p>;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Counselor Profile</h2>
            <div className="space-y-4">
                <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-2" />
                    <span className="font-semibold">Username:</span>
                    <span className="ml-2">{counselor.username}</span>
                </div>
                <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-2" />
                    <span className="font-semibold">Email:</span>
                    <span className="ml-2">{counselor.email}</span>
                </div>
                <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-2" />
                    <span className="font-semibold">Phone Number:</span>
                    <span className="ml-2">{counselor.phone}</span>
                </div>
                <div className="flex items-center">
                    <FaBirthdayCake className="text-blue-500 mr-2" />
                    <span className="font-semibold">Date of Birth:</span>
                    <span className="ml-2">{new Date(convertArrayToDate(counselor.dateOfBirth)).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                    <FaBook className="text-blue-500 mr-2" />
                    <span className="font-semibold">Specialization:</span>
                    <span className="ml-2">{counselor.specialization}</span>
                </div>
                <div className="flex items-center">
                    <FaStar className="text-blue-500 mr-2" />
                    <span className="font-semibold">Rating:</span>
                    <span className="ml-2">{counselor.rating} / 5</span>
                </div>
                <div className="flex items-center">
                    <FaBriefcase className="text-blue-500 mr-2" />
                    <span className="font-semibold">Experience:</span>
                    <span className="ml-2">{counselor.experience} years</span>
                </div>
                <div className="flex items-center">
                    <FaCalendarCheck className="text-blue-500 mr-2" />
                    <span className="font-semibold">Account Created At:</span>
                    <span className="ml-2">{new Date(convertArrayToDate(counselor.createdAt)).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                    <FaCalendarPlus className="text-blue-500 mr-2" />
                    <span className="font-semibold">Last Updated At:</span>
                    <span className="ml-2">{new Date(convertArrayToDate(counselor.updatedAt)).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default CounselorProfile;
