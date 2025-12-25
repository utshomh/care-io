import Swal from "sweetalert2";

const baseConfig = {
  customClass: {
    popup:
      "bg-base-100 text-base-content border border-base-300 rounded-xl shadow-xl",
    title: "text-lg font-semibold text-base-content",
    htmlContainer: "text-sm text-base-content/90",
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-error",
    actions: "flex items-center justify-center gap-3",
  },
  buttonsStyling: false,
  confirmButtonText: "Okay",
  cancelButtonText: "Cancel",
  allowOutsideClick: true,
  scrollbarPadding: false,
};

const alert = {
  success: (title: string, text: string) =>
    Swal.fire({ ...baseConfig, icon: "success", title, text }),

  error: (title: string, text: string) =>
    Swal.fire({ ...baseConfig, icon: "error", title, text }),

  info: (title: string, text: string) =>
    Swal.fire({ ...baseConfig, icon: "info", title, text }),

  warning: (title: string, text: string) =>
    Swal.fire({ ...baseConfig, icon: "warning", title, text }),

  confirm: (title: string, text: string, onConfirm: () => Promise<void>) =>
    Swal.fire({
      ...baseConfig,
      icon: "question",
      title,
      text,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) await onConfirm();
    }),
};

export default alert;
