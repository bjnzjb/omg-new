import React from "react";
import CommonDialog from "../CommonDialog";
import {
  Avatar,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function ReportDetailDialog(props) {
  const { open, setOpen } = props;

  return (
    <CommonDialog
      open={open}
      handleClose={() => setOpen(false)}
      dialogProps={{ maxWidth: "xl" }}
    >
      <DialogTitle
        style={{
          padding: "12px 24px 12px 24px",
          borderBottom: "1px solid #d1d5db",
        }}
        id="scroll-dialog-title"
      >
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <h2 className="w-full h-12 text-[32px] font-medium text-start">
            Weekly report (01-07 ~ 01-14)
          </h2>

          <div className="w-full h-32 flex flex-col items-center justify-end">
            <div className="w-auto h-auto flex flex-col items-center">
              <div className="w-14 h-14">
                <Avatar
                  sx={{ bgcolor: "#22c55e", width: "56px", height: "56px" }}
                  variant="rounded"
                >
                  N
                </Avatar>
              </div>

              <p className="text-lg font-semibold">
                project name
                <span className="text-gray-700">
                  {"("}project code{")"}
                </span>
              </p>
            </div>

            <div className="w-full h-7 pt-1 flex items-center justify-center gap-10 text-base">
              <p className="w-auto px-1 truncate">
                <span className="font-semibold">Unit: </span>BU2
              </p>
              <p className="w-auto px-1 truncate">
                <span className="font-semibold">PM: </span>TuanPA
              </p>
              <p className="w-auto px-1 truncate">
                <span className="font-semibold">SM: </span>VuPB
              </p>
            </div>
          </div>
        </div>
      </DialogTitle>
      <DialogContent
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{
          padding: "0px",
          borderBottom: "1px solid #d1d5db",
        }}
      >
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <div className="">
            {/* Cost Schedule */}
            <div className="w-full h-auto">
              <div className="w-full h-8 bg-blue-500 px-4 py-1">
                <h2 className="text-white font-semibold">Overall Schedule</h2>
              </div>
              <div className="w-full h-auto">
                <div className="w-full h-8 flex bg-blue-200 text-gray-800 text-sm font-semibold">
                  <div className="w-9 h-full flex-shrink-0 text-center py.15">
                    #
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-center">Item</div>

                    <div className="w-2/12 px-2 text-center">Value</div>

                    <div className="w-2/12 px-2 text-center">Unit</div>

                    <div className="w-4/12 px-2 text-center  ">Note</div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    1
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Mục tiêu công việc (đến tuần này)
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      2
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      Task
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      WR với KH vào thứ 3 hàng tuần (16h - 17h)
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    2
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Kết quả hoàn thành công việc (đến tuần này)
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      2
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      Task
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    3
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Tỷ lệ hoàn thành công việc
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      100.00%
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800"></div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost */}
            <div className="w-full h-auto">
              <div className="w-full h-8 bg-blue-500 px-4 py-1">
                <h2 className="text-white font-semibold">Cost</h2>
              </div>
              <div className="w-full h-auto">
                <div className="w-full h-8 flex bg-blue-200 text-gray-800 text-sm font-semibold">
                  <div className="w-9 h-full flex-shrink-0 text-center py.15">
                    #
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-center">Item</div>

                    <div className="w-2/12 px-2 text-center">Value</div>

                    <div className="w-2/12 px-2 text-center">Unit</div>

                    <div className="w-4/12 px-2 text-center  ">Note</div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    1
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Tổng số MM dự án
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      85
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      MM
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Plan năm 2023
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    2
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Billable Effort
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      74.97
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      MM
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Đến hết tháng 9
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    3
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Plan MM dự án hiện tại
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      70
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      MM
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Đến hết tháng 9
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    4
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Actual MM dự án hiện tại
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      61.25
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      MM
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Đến hết tháng 9
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    5
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      114%
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800"></div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality */}
            <div className="w-full h-auto">
              <div className="w-full h-8 bg-blue-500 px-4 py-1">
                <h2 className="text-white font-semibold">Quality</h2>
              </div>
              <div className="w-full h-auto">
                <div className="w-full h-8 flex bg-blue-200 text-gray-800 text-sm font-semibold">
                  <div className="w-9 h-full flex-shrink-0 text-center py.15">
                    #
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-center">Item</div>

                    <div className="w-2/12 px-2 text-center">Value</div>

                    <div className="w-2/12 px-2 text-center">Unit</div>

                    <div className="w-4/12 px-2 text-center  ">Note</div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    1
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Tổng số bug dự án hiện tại
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      0
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      bug
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    2
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Tổng số leakage dự án hiện tại
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      0
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      leakage
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    3
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Bug rate dự án hiện tại (Số bug/MM)
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      0.00
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      0.00
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    4
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Leakage rate dự án hiện tại (Số leakage/MM)
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      0.00
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      0.00
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="w-full h-auto">
              <div className="w-full h-8 bg-blue-500 px-4 py-1">
                <h2 className="text-white font-semibold">Delivery</h2>
              </div>
              <div className="w-full h-auto">
                <div className="w-full h-8 flex bg-blue-200 text-gray-800 text-sm font-semibold">
                  <div className="w-9 h-full flex-shrink-0 text-center py.15">
                    #
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-center">
                      Delivery milestone
                    </div>

                    <div className="w-2/12 px-2 text-center">
                      Delivery status
                    </div>

                    <div className="w-2/12 px-2 text-center">
                      Plan delivery date
                    </div>

                    <div className="w-4/12 px-2 text-center  ">Note</div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    1
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Mốc delivery 1
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      Done
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      8/28/2023
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Actual: Done
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    2
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Mốc delivery 2
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      Done
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      9/8/2023
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Actual: Done
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    3
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Mốc delivery 3
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      Done
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800">
                      9/22/2023
                    </div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Actual: Done
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Issue */}
            <div className="w-full h-auto">
              <div className="w-full h-8 bg-blue-500 px-4 py-1">
                <h2 className="text-white font-semibold">Issue</h2>
              </div>
              <div className="w-full h-auto">
                <div className="w-full h-8 flex bg-blue-200 text-gray-800 text-sm font-semibold">
                  <div className="w-9 h-full flex-shrink-0 text-center py.15">
                    #
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-center">Issue</div>

                    <div className="w-2/12 px-2 text-center">Status</div>

                    <div className="w-2/12 px-2 text-center">PIC</div>

                    <div className="w-4/12 px-2 text-center">Action</div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    1
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Issue1
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      Done
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800"></div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    2
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Issue2
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      Done
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800"></div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    3
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Issue3
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      Done
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800"></div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Request or Discussion */}
            <div className="w-full h-auto">
              <div className="w-full h-8 bg-blue-500 px-4 py-1">
                <h2 className="text-white font-semibold">
                  Request or Discussion
                </h2>
              </div>
              <div className="w-full h-auto">
                <div className="w-full h-8 flex bg-blue-200 text-gray-800 text-sm font-semibold">
                  <div className="w-9 h-full flex-shrink-0 text-center py.15">
                    #
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-center">
                      Request/Discussion
                    </div>

                    <div className="w-2/12 px-2 text-center">Status</div>

                    <div className="w-2/12 px-2 text-center">PIC</div>

                    <div className="w-4/12 px-2 text-center">
                      Department Leader confirmation
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex text-gray-800 text-sm font-normal border-t border-gray-800">
                  <div className="w-9 h-full flex-shrink-0 text-center py-1.5">
                    1
                  </div>
                  <div className="w-full h-auto flex text-sm py-1.5">
                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Dự án yêu cầu/mong muốn tăng thêm nhân sự ....
                    </div>

                    <div className="w-2/12 px-2 text-end border-l border-gray-800">
                      Submitted
                    </div>

                    <div className="w-2/12 px-2 text-start border-l border-gray-800"></div>

                    <div className="w-4/12 px-2 text-start border-l border-gray-800">
                      Leader của phòng ban quản lý dự án xác nhận/phản hồi các
                      yêu cầu ...{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{
          padding: "12px 24px",
          borderTop: "1px solid #c8c8c8",
        }}
      >
        <button
          type="button"
          className="text-base px-4 py-2 rounded text-gray-800 bg-white hover:bg-gray-200 mr-4"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => {}}
          className="text-base px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          OK
        </button>
      </DialogActions>
    </CommonDialog>
  );
}

export default ReportDetailDialog;
