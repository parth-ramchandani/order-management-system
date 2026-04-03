import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onClear }) => {
    if (!message) return null;

    return (
        <div className="flex items-center justify-between p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 fade-in" role="alert">
            <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{message}</span>
            </div>
            {onClear && (
                <button 
                  onClick={onClear}
                  className="ml-4 -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-100 inline-flex items-center justify-center h-8 w-8"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
