import Link from "next/link";

const Homepage = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-lg w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to SchoolSync</h1>
                <p className="text-gray-600 mb-8 text-lg">
                    The ultimate school management platform for teachers, students, and parents.
                </p>
                <Link
                    href="/admin"
                    className="inline-block bg-lamaSky text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-lamaSkyLight hover:text-lamaSky transition-all duration-300 transform hover:-translate-y-1"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Homepage;
