import React from 'react';

const Loading = ({ fullScreen = false }) => {
    return (
        <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : 'h-40'}`}>
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
                <p className="text-gray-600 font-medium">Processing...</p>
            </div>
        </div>
    );
};

export default Loading;
