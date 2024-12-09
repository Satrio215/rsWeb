import { Head } from '@inertiajs/react';
import AuthenticatedDoctor from '@/Layouts/AuthenticatedDoctor';

const Dashboard = ({ doctor }) => {
    return (
        <AuthenticatedDoctor
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Welcome, {doctor.name}
                </h2>
            }
        >
            <div>
                <Head title="Doctor Dashboard" />
            </div>
        </AuthenticatedDoctor>
    );
};

export default Dashboard;
