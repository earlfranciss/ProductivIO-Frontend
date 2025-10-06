import React, { useState } from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export function Alert({ type = 'info', title, message, onClose, showCloseButton = true }) {
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
    <div className={`${alertConfig.bgColor} ${alertConfig.borderColor} border rounded-lg p-3 flex items-start gap-2.5 w-80 shadow-lg mr-4`}>
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