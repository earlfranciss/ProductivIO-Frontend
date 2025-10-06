import React, { useState } from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

// Alert Component
function Alert({ type = 'info', title, message, onClose, showCloseButton = true }) {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-emerald-900/50',
      borderColor: 'border-emerald-500/50',
      iconColor: 'text-emerald-500',
      titleColor: 'text-emerald-100',
      messageColor: 'text-emerald-200'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-900/50',
      borderColor: 'border-blue-500/50',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-100',
      messageColor: 'text-blue-200'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-900/50',
      borderColor: 'border-yellow-500/50',
      iconColor: 'text-yellow-500',
      titleColor: 'text-yellow-100',
      messageColor: 'text-yellow-200'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-900/50',
      borderColor: 'border-red-500/50',
      iconColor: 'text-red-500',
      titleColor: 'text-red-100',
      messageColor: 'text-red-200'
    },
    danger: {
      icon: XCircle,
      bgColor: 'bg-red-900/50',
      borderColor: 'border-red-500/50',
      iconColor: 'text-red-500',
      titleColor: 'text-red-100',
      messageColor: 'text-red-200'
    }
  };

  const alertConfig = config[type] || config.info;
  const Icon = alertConfig.icon;

  return (
    <div className={`${alertConfig.bgColor} ${alertConfig.borderColor} border rounded-lg p-3 flex items-start gap-2.5 w-80 shadow-lg`}>
      <Icon className={`w-5 h-5 ${alertConfig.iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        {title && <div className={`font-semibold text-sm mb-0.5 ${alertConfig.titleColor}`}>{title}</div>}
        {message && <div className={`text-xs ${alertConfig.messageColor}`}>{message}</div>}
      </div>
      {showCloseButton && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Toast Container Component
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="animate-fade-in">
          <Alert
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}








































// Demo Component
export default function AlertDemo() {
  const [alerts, setAlerts] = useState({
    success: true,
    info: true,
    warning: true,
    error: true,
    danger: true
  });

  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, message, duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, type, title, message };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showMultipleToasts = () => {
    addToast('success', 'First Alert', 'This is the first notification');
    setTimeout(() => addToast('info', 'Second Alert', 'This is the second notification'), 500);
    setTimeout(() => addToast('warning', 'Third Alert', 'This is the third notification'), 1000);
    setTimeout(() => addToast('error', 'Fourth Alert', 'This is the fourth notification'), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Alert Component System</h1>
        <p className="text-slate-400 mb-8">Reusable alert component with queued toast notifications</p>

        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold mb-4">Inline Alert Examples</h2>

          {alerts.success && (
            <Alert
              type="success"
              title="Success! Your changes have been saved"
              message="This is an alert with icon, title and description."
              onClose={() => setAlerts({ ...alerts, success: false })}
            />
          )}

          {alerts.info && (
            <Alert
              type="info"
              title="Information"
              message="Here is some important information you should know about."
              onClose={() => setAlerts({ ...alerts, info: false })}
            />
          )}

          {alerts.warning && (
            <Alert
              type="warning"
              title="Warning"
              message="Please review this warning message before proceeding."
              onClose={() => setAlerts({ ...alerts, warning: false })}
            />
          )}

          {alerts.error && (
            <Alert
              type="error"
              title="Error"
              message="An error occurred while processing your request. Please try again."
              onClose={() => setAlerts({ ...alerts, error: false })}
            />
          )}

          {alerts.danger && (
            <Alert
              type="danger"
              title="Danger Zone"
              message="This action cannot be undone. Please proceed with caution."
              onClose={() => setAlerts({ ...alerts, danger: false })}
            />
          )}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Toast Notifications (Bottom-Right, Queued)</h2>
          <div className="flex gap-3 flex-wrap mb-4">
            <button
              onClick={() => addToast('success', 'Success!', 'Your action was completed successfully')}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Show Success Toast
            </button>
            <button
              onClick={() => addToast('info', 'Information', 'Here is some helpful information')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Show Info Toast
            </button>
            <button
              onClick={() => addToast('warning', 'Warning', 'Please be careful with this action')}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Show Warning Toast
            </button>
            <button
              onClick={() => addToast('error', 'Error', 'Something went wrong. Please try again')}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Show Error Toast
            </button>
          </div>
          <button
            onClick={showMultipleToasts}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Show Multiple Toasts (Queue Demo)
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-emerald-500 mb-2">1. Set up Toast State:</h3>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs">
{`const [toasts, setToasts] = useState([]);

const addToast = (type, title, message, duration = 3000) => {
  const id = Date.now() + Math.random();
  setToasts(prev => [...prev, { id, type, title, message }]);
  
  setTimeout(() => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, duration);
};

const removeToast = (id) => {
  setToasts(prev => prev.filter(toast => toast.id !== id));
};`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-blue-500 mb-2">2. Add Toast Container to JSX:</h3>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs">
{`<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
  {toasts.map((toast) => (
    <div key={toast.id} className="animate-fade-in">
      <Alert
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => removeToast(toast.id)}
      />
    </div>
  ))}
</div>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-purple-500 mb-2">3. Show Toast:</h3>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs">
{`// Success toast
addToast('success', 'Saved!', 'Your changes have been saved');

// Error toast with custom duration (5 seconds)
addToast('error', 'Error', 'Something went wrong', 5000);

// Multiple toasts will queue in order
addToast('info', 'First', 'First message');
addToast('warning', 'Second', 'Second message');
addToast('success', 'Third', 'Third message');`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-pink-500 mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Toasts appear in bottom-right corner</li>
                <li>Queue system: toasts appear in order from top to bottom</li>
                <li>Auto-dismiss after 3 seconds (customizable)</li>
                <li>Manual close with X button</li>
                <li>Smooth fade-in animation</li>
                <li>Compact size for better screen real estate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}