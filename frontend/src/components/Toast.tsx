import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    type: ToastType;
    message: string;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
    const icons = {
        success: <CheckCircle className="text-green-500" size={20} />,
        error: <XCircle className="text-red-500" size={20} />,
        warning: <AlertCircle className="text-yellow-500" size={20} />,
        info: <Info className="text-blue-500" size={20} />,
    };

    const styles = {
        success: 'border-green-100 bg-green-50 text-green-800',
        error: 'border-red-100 bg-red-50 text-red-800',
        warning: 'border-yellow-100 bg-yellow-50 text-yellow-800',
        info: 'border-blue-100 bg-blue-50 text-blue-800',
    };

    return (
        <div className={cn(
            "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-in fade-in slide-in-from-right-4 duration-300",
            styles[type]
        )}>
            {icons[type]}
            <p className="text-sm font-medium">{message}</p>
            <button
                onClick={onClose}
                className="ml-auto p-1 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Close"
            >
                <X size={16} className="opacity-50" />
            </button>
        </div>
    );
};
