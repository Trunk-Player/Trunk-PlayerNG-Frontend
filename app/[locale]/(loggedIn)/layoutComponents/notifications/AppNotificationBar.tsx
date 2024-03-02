import { useMemo } from "react";
import { classNames } from "@/utils/classNames";

import {
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  BeakerIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import type { AppNotification } from "@/types/AppNotification";

interface StylesObj {
  borderColor: string;
  backgroundColor: string;
  // eslint-disable-next-line no-unused-vars
  Icon?: any;
  iconColor: string;
  titleColor: string;
  descriptionColor: string;
  closeButtonColor: string;
  closeButtonHoverColor: string;
  closeButtonRingColor: string;
  closeButtonRingOffsetColor: string;
}

const AppNotificationBar = ({
  notificationType,
  hasBorder,
  hasIcon,
  titleBold,
  title,
  description,
  extraInformation,
}: AppNotification) => {
  const styling = useMemo(() => {
    const styles: StylesObj = {
      borderColor: "",
      backgroundColor: "",
      Icon: undefined,
      iconColor: "",
      titleColor: "",
      descriptionColor: "",
      closeButtonColor: "",
      closeButtonHoverColor: "",
      closeButtonRingColor: "",
      closeButtonRingOffsetColor: "",
    };

    switch (notificationType) {
      case "Error":
        styles.borderColor = "border-red-400";
        styles.backgroundColor = "bg-red-100 bg-opacity-70";
        styles.Icon = XCircleIcon;
        styles.iconColor = "text-red-400";
        styles.titleColor = "text-red-800";
        styles.descriptionColor = "text-red-700";
        styles.closeButtonColor = "text-red-500";
        styles.closeButtonHoverColor = "hover:bg-red-100";
        styles.closeButtonRingColor = "focus:ring-red-600";
        styles.closeButtonRingOffsetColor = "focus:ring-offset-red-50";
        break;
      case "Warning":
        styles.borderColor = "border-yellow-400";
        styles.backgroundColor = "bg-yellow-50";
        styles.Icon = ExclamationCircleIcon;
        styles.iconColor = "text-yellow-400";
        styles.titleColor = "text-yellow-800";
        styles.descriptionColor = "text-yellow-700";
        styles.closeButtonColor = "text-yellow-500";
        styles.closeButtonHoverColor = "hover:bg-yellow-100";
        styles.closeButtonRingColor = "focus:ring-yellow-600";
        styles.closeButtonRingOffsetColor = "focus:ring-offset-yellow-50";
        break;
      case "Informational":
        styles.borderColor = "border-cyan-400";
        styles.backgroundColor = "bg-cyan-50";
        styles.Icon = InformationCircleIcon;
        styles.iconColor = "text-cyan-400";
        styles.titleColor = "text-cyan-800";
        styles.descriptionColor = "text-cyan-700";
        styles.closeButtonColor = "text-cyan-500";
        styles.closeButtonHoverColor = "hover:bg-cyan-100";
        styles.closeButtonRingColor = "focus:ring-cyan-600";
        styles.closeButtonRingOffsetColor = "focus:ring-offset-cyan-50";
        break;
      case "Success":
        styles.borderColor = "border-green-400";
        styles.backgroundColor = "bg-green-50";
        styles.Icon = CheckCircleIcon;
        styles.iconColor = "text-green-400";
        styles.titleColor = "text-green-800";
        styles.descriptionColor = "text-green-700";
        styles.closeButtonColor = "text-green-500";
        styles.closeButtonHoverColor = "hover:bg-green-100";
        styles.closeButtonRingColor = "focus:ring-green-600";
        styles.closeButtonRingOffsetColor = "focus:ring-offset-green-50";
        break;
      case "Debug":
        styles.borderColor = "border-gray-900";
        styles.backgroundColor = "bg-white";
        styles.Icon = BeakerIcon;
        styles.iconColor = "text-black";
        styles.titleColor = "text-black";
        styles.descriptionColor = "text-black";
        styles.closeButtonColor = "text-black";
        styles.closeButtonHoverColor = "hover:bg-gray-100";
        styles.closeButtonRingColor = "focus:ring-black";
        styles.closeButtonRingOffsetColor = "focus:ring-offset-black";
        break;
    }

    return styles;
  }, [notificationType]);

  return (
    <div
      className={classNames(
        `${styling.backgroundColor} p-4 rounded-md`,
        hasBorder
          ? `border-l-4 border-t border-r border-b ${styling.borderColor}`
          : ""
      )}
    >
      <div className="flex">
        {hasIcon && styling.Icon && (
          <div className="flex-shrink-0">
            <styling.Icon
              className={`h-5 w-5 ${styling.iconColor}`}
              aria-hidden="true"
            />
          </div>
        )}
        <div className="ml-3">
          <h3
            className={classNames(
              titleBold ? "font-medium" : "",
              `text-sm ${styling.titleColor}`
            )}
          >
            {title}
          </h3>
          {description && (
            <div className={`mt-2 text-sm ${styling.descriptionColor}`}>
              <div>{description}</div>
              {extraInformation && (
                <div className="mt-1">{extraInformation}</div>
              )}
            </div>
          )}
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 ${styling.closeButtonColor} ${styling.closeButtonHoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${styling.closeButtonRingOffsetColor} ${styling.closeButtonRingColor}`}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNotificationBar;
