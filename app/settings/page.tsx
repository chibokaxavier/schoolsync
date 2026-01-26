import Link from "next/link";
import React from "react";

const SettingsPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-md m-4 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
            <p className="text-gray-500 mb-8">Manage configuration and preferences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-lamaSkyLight">
                    <h2 className="text-xl font-semibold mb-2">School Information</h2>
                    <p className="text-sm text-gray-600">Update school details, logo, and address.</p>
                </div>
                <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-lamaPurpleLight">
                    <h2 className="text-xl font-semibold mb-2">Roles & Permissions</h2>
                    <p className="text-sm text-gray-600">Manage user access and authorization levels.</p>
                </div>
                <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-lamaYellowLight">
                    <h2 className="text-xl font-semibold mb-2">Theme & Appearance</h2>
                    <p className="text-sm text-gray-600">Customize the application look and feel.</p>
                </div>
                <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-gray-50">
                    <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                    <p className="text-sm text-gray-600">Configure email and push notification settings.</p>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;
