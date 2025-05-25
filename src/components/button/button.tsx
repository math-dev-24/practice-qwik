import { component$, useStylesScoped$, Slot } from "@builder.io/qwik";

export interface ButtonProps {
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "outline" | "danger" | "success";
    label: string;
    disabled?: boolean;
    loading?: boolean;
    onClick$?: () => void;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
}

export const Button = component$<ButtonProps>(({
                                                   size = "medium",
                                                   variant = "primary",
                                                   label,
                                                   disabled = false,
                                                   loading = false,
                                                   onClick$,
                                                   type = "button",
                                                   fullWidth = false
                                               }) => {
    useStylesScoped$(`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.2s ease;
      border: 2px solid transparent;
      position: relative;
      overflow: hidden;
      text-decoration: none;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .btn:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    .btn:not(:disabled):hover {
      transform: translateY(-1px);
    }

    .btn:not(:disabled):active {
      transform: translateY(0);
    }

    /* Sizes */
    .size-small {
      font-size: 12px;
      padding: 8px 16px;
      min-height: 32px;
    }

    .size-medium {
      font-size: 14px;
      padding: 12px 24px;
      min-height: 40px;
    }

    .size-large {
      font-size: 16px;
      padding: 16px 32px;
      min-height: 48px;
    }

    /* Variants */
    .variant-primary {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
    }

    .variant-primary:not(:disabled):hover {
      background: linear-gradient(135deg, #2563eb, #1e40af);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }

    .variant-secondary {
      background: linear-gradient(135deg, #6b7280, #4b5563);
      color: white;
      box-shadow: 0 4px 14px rgba(107, 114, 128, 0.3);
    }

    .variant-secondary:not(:disabled):hover {
      background: linear-gradient(135deg, #4b5563, #374151);
      box-shadow: 0 6px 20px rgba(107, 114, 128, 0.4);
    }

    .variant-outline {
      background: transparent;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .variant-outline:not(:disabled):hover {
      background: #3b82f6;
      color: white;
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
    }

    .variant-danger {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
    }

    .variant-danger:not(:disabled):hover {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    }

    .variant-success {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
    }

    .variant-success:not(:disabled):hover {
      background: linear-gradient(135deg, #059669, #047857);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }

    .full-width {
      width: 100%;
    }

    /* Loading spinner */
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Ripple effect */
    .btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s;
    }

    .btn:not(:disabled):active::before {
      width: 300px;
      height: 300px;
    }
  `);

    return (
        <button
            class={{
                btn: true,
                [`size-${size}`]: true,
                [`variant-${variant}`]: true,
                "full-width": fullWidth,
            }}
            disabled={disabled || loading}
            type={type}
            onClick$={onClick$}
        >
            {loading && <div class="spinner"></div>}
            {label}
        </button>
    );
});