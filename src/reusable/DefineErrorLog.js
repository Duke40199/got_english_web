const DefineErrorLog = (errorResponse) => {
    let definedErrorLog = "";
    if (errorResponse != null) {
        if (errorResponse.response != null) {
            if (errorResponse.response.data != null) {
                const errorLogMessage = errorResponse.response.data;
                if (errorLogMessage.includes("Account is already suspended.")) {
                    definedErrorLog = "Tài khoản này đã bị khóa!";
                } else if (errorLogMessage.includes("account unavailable")) {
                    definedErrorLog = "Email đã được sử dụng!";
                } else if (errorLogMessage.includes("'username'")) {
                    definedErrorLog = "Tên tài khoản đã được sử dụng!";
                } else if (errorLogMessage.includes("Account is currently in a messaging session")) {
                    definedErrorLog = "Tài khoản này hiện đang sử dụng dịch vụ Phiên nhắn tin! Chưa thể khóa...";
                } else if (errorLogMessage.includes("Account is currently in a live call session")) {
                    definedErrorLog = "Tài khoản này hiện đang sử dụng dịch vụ Phiên gọi trực tuyến! Chưa thể khóa...";
                } else if (errorLogMessage.includes("Account is currently in a translation session")) {
                    definedErrorLog = "Tài khoản này hiện đang sử dụng dịch vụ Phòng phiên dịch! Chưa thể khóa...";
                } else if (errorLogMessage.includes("Account is not yet suspended.")) {
                    definedErrorLog = "Tài khoản này đã được mở khóa!";
                } else if (errorLogMessage.includes("You don't have permission")) {
                    definedErrorLog = "Tài khoản của bạn không có quyền để thực hiện thao tác này!";
                } else {
                    definedErrorLog = "Đã có lỗi xảy ra!";
                }
            }
        }
    }
    return definedErrorLog;
}

export default DefineErrorLog