import { Head, useForm } from '@inertiajs/react';

const Dashboard = ({ doctor }) => {
    // Use the useForm hook to manage the logout request
    const { post } = useForm();

    // Define the handleLogout function
    const handleLogout = () => {
        post('/doctor/logout');  // Use the post method from useForm to send the logout request
    };

    return (
        <div>
            <Head title="Doctor Dashboard" />
            <h1 className="text-3xl font-bold">Welcome, {doctor.name}</h1>
            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded mt-4"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
