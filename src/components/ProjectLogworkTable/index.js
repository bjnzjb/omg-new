import React, { useMemo, useState } from "react";
import moment from "moment";
import Timeline, {
  CustomMarker,
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import {
  faAngleDown,
  faCalendarDay,
  faChevronLeft,
  faCircleUser,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Tooltip } from "@mui/material";
import userDefaultLogo from "app/assets/images/user.png";
import { memberNames } from "../../services/fake-services/fake-data";
import { defaultDateFormat } from "../../constants";

const viewSize = 1078;

const timeLineShowModeOptions = [
  { value: "day", label: "Days" },
  { value: "week", label: "Weeks" },
  { value: "month", label: "Months" },
];

const generateFakeData = () => {
  let groups = [];
  let items = [];

  groups.push({
    id: `project-planed`,
    title: (
      <div className="w-full h-full px-1 flex items-center ">
        <p>Project planed</p>
      </div>
    ),
    rightTitle: "Project planed",
    bgColor: "#dddddd",
  });

  // Project
  items.push({
    id: "project-planed",
    group: "project-planed",
    title: (
      <Tooltip
        arrow
        followCursor={true}
        title={
          <div className="w-[200px] h-auto p-2">
            <p className="text-lg font-semibold text-gray-100">Project 1</p>
            <p>Project description: test test test test test test test </p>
            <p>Status: done</p>
          </div>
        }
        className="project-planed-schedule-content bg-green-500"
      >
        {`${moment().format(defaultDateFormat)} ~ ${moment().add(6, "M").format(defaultDateFormat)}`}
      </Tooltip>
    ),
    start: moment().hour(0).minute(0).second(0),
    end: moment().add(6, "M").hour(0).minute(0).second(0),
    className: "project-planed-schedule",
  });

  // Milestone List
  groups.push({
    id: `milestone-planed`,
    title: (
      <div className="w-full h-full px-1 flex items-center ">
        <p>Milestone planed</p>
      </div>
    ),
    rightTitle: "Milestone planed",
    bgColor: "#dddddd",
  });

  items.push({
    id: "milestone-planed-0",
    group: "milestone-planed",
    title: (
      <Tooltip
        arrow
        followCursor={true}
        title={
          <div className="w-[200px] h-auto p-2">
            <p className="text-lg font-semibold text-gray-100">Milestone 1</p>
            <p>Milestone description: test test test test test test test </p>
            <p>Status: done</p>
            <p>
              Timeline: {`${moment().format(defaultDateFormat)} ~ ${moment().add(1, "M").format(defaultDateFormat)}`}
            </p>
          </div>
        }
        className="milestone-planed-schedule-content bg-blue-500"
      >
        {`Milestone 1: ${moment().format(defaultDateFormat)} ~ ${moment().add(1, "M").format(defaultDateFormat)}`}
      </Tooltip>
    ),
    start: moment().hour(0).minute(0).second(0),
    end: moment().add(1, "M").hour(0).minute(0).second(0),
    className: "milestone-planed-schedule",
  });

  items.push({
    id: "milestone-planed-1",
    group: "milestone-planed",
    title: (
      <Tooltip
        arrow
        followCursor={true}
        title={
          <div className="w-[200px] h-auto p-2">
            <p className="text-lg font-semibold text-gray-100">Milestone 2</p>
            <p>Milestone description: milestone 2 description </p>
            <p>Status: done</p>
            <p>
              Timeline:{" "}
              {`${moment().add(1, "M").format(defaultDateFormat)} ~ ${moment().add(4, "M").format(defaultDateFormat)}`}
            </p>
          </div>
        }
        className="milestone-planed-schedule-content bg-blue-500"
      >
        {`Milestone 1: ${moment().add(1, "M").format(defaultDateFormat)} ~ ${moment()
          .add(4, "M")
          .format(defaultDateFormat)}`}
      </Tooltip>
    ),
    start: moment().add(1, "M").hour(0).minute(0).second(0),
    end: moment().add(4, "M").hour(0).minute(0).second(0),
    className: "milestone-planed-schedule",
  });

  items.push({
    id: "milestone-planed-2",
    group: "milestone-planed",
    title: (
      <Tooltip
        arrow
        followCursor={true}
        title={
          <div className="w-[200px] h-auto p-2">
            <p className="text-lg font-semibold text-gray-100">Milestone 1</p>
            <p>Milestone description: test test test test test test test </p>
            <p>Status: done</p>
            <p>
              Timeline:{" "}
              {`${moment().add(4, "M").format(defaultDateFormat)} ~ ${moment().add(6, "M").format(defaultDateFormat)}`}
            </p>
          </div>
        }
        className="milestone-planed-schedule-content bg-blue-500"
      >
        {`Milestone 1: ${moment().add(4, "M").format(defaultDateFormat)} ~ ${moment()
          .add(6, "M")
          .format(defaultDateFormat)}`}
      </Tooltip>
    ),
    start: moment().add(4, "M").hour(0).minute(0).second(0),
    end: moment().add(6, "M").hour(0).minute(0).second(0),
    className: "milestone-planed-schedule",
  });

  for (let i = 0; i < 4; i++) {
    const groupName = memberNames[i];
    groups.push({
      id: `${i}`,
      title: (
        <div className="w-full h-full px-1 flex items-center ">
          <img alt="" src={userDefaultLogo} className="w-6 h-6 rounded-full mr-3" />
          <p>{groupName}</p>
        </div>
      ),
      rightTitle: groupName,
      bgColor: "#dddddd",
    });

    switch (i) {
      case 0:
        items.push({
          id: `${i}`,
          group: `${i}`,
          title: (
            <Tooltip
              arrow
              followCursor={true}
              title={
                <div className="w-[200px] h-auto p-2">
                  <p className="text-lg font-semibold text-gray-100">{groupName}</p>
                  <p>{`${moment().format(defaultDateFormat)} ~ ${moment().add(1, "M").format(defaultDateFormat)}`}</p>
                  <p>Effort rate: 50%</p>
                  <p>Total Effort: 10 days</p>
                  <p>Role: Design</p>
                </div>
              }
              className="member-resource-allocation-content effort-50 bg-cyan-500"
            >
              {`Milestone 1: ${moment().format(defaultDateFormat)} ~ ${moment().add(1, "M").format(defaultDateFormat)}`}
            </Tooltip>
          ),
          start: moment().hour(0).minute(0).second(0),
          end: moment().add(1, "M").hour(0).minute(0).second(0),
          className: "member-resource-allocation",
        });

        const start = moment().hour(0).minute(0).second(0);
        const end = start.clone().add(1, "M");

        while (start.diff(end) < 0) {
          if (start.day() !== 0 && start.day() !== 6) {
            items.push({
              id: `logwork-item-${i}-${start.format(defaultDateFormat)}`,
              group: `${i}`,
              title: <p className="logwork-item-content half-time" />,
              start: start.clone(),
              end: start.clone().add(1, "d"),
              className: "logwork-item",
            });
          }

          start.add(1, "d");
        }

        break;
      case 1:
        items.push({
          id: `${i}`,
          group: `${i}`,
          title: (
            <Tooltip
              arrow
              followCursor={true}
              title={
                <div className="w-[200px] h-auto p-2">
                  <p className="text-lg font-semibold text-gray-100">{groupName}</p>
                  <p>{`${moment().format(defaultDateFormat)} ~ ${moment().add(1, "M").format(defaultDateFormat)}`}</p>
                  <p>Effort rate: 100%</p>
                  <p>Total Effort: 40 days</p>
                  <p>Role: Dev</p>
                </div>
              }
              className="member-resource-allocation-content bg-cyan-500"
            >
              {`Milestone 1: ${moment().add(1, "M").format(defaultDateFormat)} ~ ${moment()
                .add(4, "M")
                .format(defaultDateFormat)}`}
            </Tooltip>
          ),
          start: moment().add(1, "M").hour(0).minute(0).second(0),
          end: moment().add(4, "M").hour(0).minute(0).second(0),
          className: "member-resource-allocation",
        });

        items.push({
          id: `logwork-item-${i}`,
          group: `${i}`,
          title: <p className="logwork-item-content full-time" />,
          start: moment().hour(0).minute(0).second(0),
          end: moment().add(1, "d").hour(0).minute(0).second(0),
          className: "logwork-item",
        });

        break;
      case 2:
        items.push({
          id: `${i}`,
          group: `${i}`,
          title: (
            <Tooltip
              arrow
              followCursor={true}
              title={
                <div className="w-[200px] h-auto p-2">
                  <p className="text-lg font-semibold text-gray-100">{groupName}</p>
                  <p>{`${moment().format(defaultDateFormat)} ~ ${moment().add(1, "M").format(defaultDateFormat)}`}</p>
                  <p>Effort rate: 100%</p>
                  <p>Total Effort: 40 days</p>
                  <p>Role: Dev</p>
                </div>
              }
              className="member-resource-allocation-content bg-cyan-500"
            >
              {`Milestone 1: ${moment().add(1, "M").format(defaultDateFormat)} ~ ${moment()
                .add(4, "M")
                .format(defaultDateFormat)}`}
            </Tooltip>
          ),
          start: moment().add(1, "M").hour(0).minute(0).second(0),
          end: moment().add(4, "M").hour(0).minute(0).second(0),
          className: "member-resource-allocation",
        });

        items.push({
          id: `${i} i`,
          group: `${i}`,
          title: (
            <Tooltip
              arrow
              followCursor={true}
              title={
                <div className="w-[200px] h-auto p-2">
                  <p className="text-lg font-semibold text-gray-100">{groupName}</p>
                  <p>
                    {`${moment().add(4, "M").format(defaultDateFormat)} ~ ${moment()
                      .add(6, "M")
                      .format(defaultDateFormat)}`}
                  </p>
                  <p>Effort rate: 50%</p>
                  <p>Total Effort: 10 days</p>
                  <p>Role: Teser</p>
                </div>
              }
              className="member-resource-allocation-content effort-50 bg-cyan-500"
            >
              {`Milestone 2: ${groupName}`}
            </Tooltip>
          ),
          start: moment().add(4, "M").hour(0).minute(0).second(0),
          end: moment().add(6, "M").hour(0).minute(0).second(0),
          className: "member-resource-allocation",
        });

        items.push({
          id: `logwork-item-${i}`,
          group: `${i}`,
          title: <p className="logwork-item-content not-working" />,
          start: moment().hour(0).minute(0).second(0),
          end: moment().add(1, "d").hour(0).minute(0).second(0),
          className: "logwork-item",
        });

        break;
      case 3:
        items.push({
          id: `${i}`,
          group: `${i}`,
          title: (
            <Tooltip
              arrow
              followCursor={true}
              title={
                <div className="w-[200px] h-auto p-2">
                  <p className="text-lg font-semibold text-gray-100">{groupName}</p>
                  <p>
                    {`${moment().add(4, "M").format(defaultDateFormat)} ~ ${moment()
                      .add(6, "M")
                      .format(defaultDateFormat)}`}
                  </p>
                  <p>Effort rate: 50%</p>
                  <p>Total Effort: 10 days</p>
                  <p>Role: Teser</p>
                </div>
              }
              className="member-resource-allocation-content effort-50 bg-cyan-500"
            >
              {`Milestone 1: ${moment().add(4, "M").format(defaultDateFormat)} ~ ${moment()
                .add(6, "M")
                .format(defaultDateFormat)}`}
            </Tooltip>
          ),
          start: moment().add(4, "M").hour(0).minute(0).second(0),
          end: moment().add(6, "M").hour(0).minute(0).second(0),
          className: "member-resource-allocation",
        });
        break;
      default:
        break;
    }
  }

  return { groups, items };
};

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
};

function SelectTimeLineShowMode(props) {
  const { showMode, setShowMode } = props;
  const [showMenuEl, setShowMenuEl] = useState(null);

  const selectedLabel = useMemo(() => {
    const selectedObj = timeLineShowModeOptions.find((item) => item.value === showMode);
    return selectedObj?.label || "";
  }, [showMode]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => setShowMenuEl(e.target)}
        className="w-28 h-full rounded hover:bg-gray-200 text-gray-600 px-2.5 border border-gray-400"
      >
        <div className="w-full h-full flex items-center justify-between">
          <span>{selectedLabel}</span>

          <div className="text-gray-500">
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
      </button>

      <Popover
        open={Boolean(showMenuEl)}
        anchorEl={showMenuEl}
        onClose={() => setShowMenuEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              width: "112px",
              transform: "translateY(6px)",
              border: "1px solid #d0d4e3",
            },
          },
        }}
      >
        <div className="w-full h-auto flex flex-col py-1">
          {timeLineShowModeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setShowMode(option.value);
                setShowMenuEl(null);
              }}
              className={`w-full h-8 hover:bg-slate-200 my-0.5 font-bai-jamjuree ${
                showMode === option.value ? "!bg-blue-100" : ""
              } `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Popover>
    </>
  );
}

function ProjectLogworkTable(props) {
  const { setShowUpdateLogworkDialog } = props;
  const [switchTime, setSwitchTime] = useState(false);

  const [showModeTime, setShowModeTime] = useState(timeLineShowModeOptions[0].value);

  const [isExpanedSidebarHeader, setIsExpanedSidebarHeader] = useState(true);

  const [filterConditions, setFilterConditions] = useState({
    project: "1",
  });

  const { groups, items } = generateFakeData();

  return (
    <div className="w-full h-full overflow-auto flex flex-col">
      <div className="w-full h-auto border-b border-gray-400 shrink-0">
        <div className="w-full h-12 py-2 px-6 flex items-center justify-between">
          {/* search and filter */}
          <div className="w-auto h-full flex items-center justify-start">
            <div className="w-44 h-full flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-full bg-gray-50 border border-gray-400 focus:border-blue-500 rounded outline-none shadow-none pl-3 pr-8 py-1 text-base text-gray-700"
              />

              <button
                type="button"
                className="absolute top-1/2 right-1 w-6 h-6 -translate-y-1/2 rounded hover:bg-gray-300 flex items-center justify-center text-gray-500 active:scale-95"
              >
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  ariaHidden="true"
                  className="icon_e0d27df956 search-icon"
                  data-testid="icon"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.652 2.373a6.34 6.34 0 103.92 11.32l3.837 3.837a.75.75 0 101.06-1.06l-3.836-3.837a6.34 6.34 0 00-4.981-10.26zm3.439 9.744a4.84 4.84 0 10-6.879-6.81 4.84 4.84 0 006.879 6.81z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="w-[1px] h-full bg-gray-400 mx-3" />

            <button type="button" className="w-auto h-full rounded hover:bg-gray-200 text-gray-600 flex items-center">
              <div className="w-auto h-full flex items-center justify-center flex-nowrap gap-3 px-1.5">
                <svg width="16" height="16" fill="currentColor" ariaHidden="true" viewBox="0 0 20 20">
                  <path
                    d="M17.857 2.877a1.52 1.52 0 01-.211 1.619l-5.157 6.163v4.727c0 .633-.392 1.2-.984 1.422l-1.938.73a1.52 1.52 0 01-2.056-1.422v-5.457L2.354 4.496A1.52 1.52 0 013.52 2h12.96c.59 0 1.127.342 1.377.877zm-1.377.643H3.52l5.396 6.45c.074.088.115.2.115.315v5.83l1.938-.73v-5.1a.49.49 0 01.115-.315l5.396-6.45z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <span>Filter</span>
              </div>

              {!filterConditions || Object.keys(filterConditions).length === 0 ? (
                <div className="w-8 h-full flex items-center justify-center text-gray-600">
                  <FontAwesomeIcon icon={faAngleDown} size="sm" />
                </div>
              ) : (
                <>
                  <div className="w-[1px] h-full bg-white shrink-0" />

                  <button type="button" className="w-8 shrink-0 h-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faXmark} size="sm" />
                  </button>
                </>
              )}
            </button>
          </div>

          {/* Time Line Control */}
          <div className="w-auto h-full flex items-center justify-end">
            <button
              type="button"
              className="w-auto h-full rounded hover:bg-gray-200 text-gray-600 px-2.5 border border-gray-400 active:scale-95 mx-4"
            >
              <div className="w-full h-full flex items-center justify-center gap-2">
                <div className="text-gray-500">
                  <FontAwesomeIcon icon={faCalendarDay} />
                </div>

                <span>Today</span>
              </div>
            </button>
            <SelectTimeLineShowMode showMode={showModeTime} setShowMode={setShowModeTime} />

            <button
              type="button"
              onClick={() => setShowUpdateLogworkDialog(true)}
              className="w-auto h-8 rounded hover:bg-gray-200 text-gray-600 px-2.5 border border-gray-400 active:scale-95 ml-4"
            >
              <div className="w-full h-full flex items-center justify-center gap-2">
                <div className="text-gray-500">
                  <FontAwesomeIcon icon={faPlus} />
                </div>

                <span>Add logwork</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full grow relative">
        <div className="w-full h-full absolute inset-0 px-6 py-4">
          <div className="w-full h-full overflow-auto">
            <Timeline
              groups={groups}
              items={items}
              keys={keys}
              sidebarWidth={isExpanedSidebarHeader ? 250 : 40}
              canResize="right"
              defaultTimeStart={moment().hours(0).minutes(0).seconds(0)}
              defaultTimeEnd={
                window.innerWidth < viewSize
                  ? moment().add(7, "day").hours(0).minutes(0).seconds(0)
                  : moment().add(27, "day").hours(0).minutes(0).seconds(0)
              }
              canMove={false}
              itemTouchSendsClick={false}
              stackItems={true}
              // selected={selected}
              // onItemClick={handleItemClick}
              // onItemSelect={showModalPIC}
              // groupRenderer={groupRenderer}
              className="full-height-timeline"
            >
              <TimelineHeaders>
                <SidebarHeader>
                  {({ getRootProps }) => {
                    return (
                      <div {...getRootProps()} className="relative">
                        <div className="absolute inset-0 border border-[#bbbbbb] bg-[#f0f0f0]">
                          <div
                            className={`w-8 h-8 absolute top-1/2 -translate-y-1/2 ${
                              isExpanedSidebarHeader ? "right-4" : "right-1"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setIsExpanedSidebarHeader((oldState) => !oldState)}
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 hover:bg-slate-100 text-gray-400 hover:text-gray-700 hover:border-gray-700"
                            >
                              <div
                                className={`w-5 h-5 flex items-center justify-center ${
                                  !isExpanedSidebarHeader ? "rotate-180" : ""
                                }`}
                              >
                                <FontAwesomeIcon icon={faChevronLeft} />
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </SidebarHeader>
                <DateHeader
                  unit="month"
                  labelFormat={window.innerWidth < viewSize ? "DD-MM" : "YYYY-MM"}
                  style={{ height: 50 }}
                />
                {switchTime && (
                  <>
                    <DateHeader unit="week" labelFormat="DD" style={{ height: 50 }} />
                    <DateHeader
                      unit="week"
                      labelFormat={([startTime, endTime]) => {
                        const firstDayOfMonth = moment(startTime).toDate().getDay();
                        const dayOfMonth = moment(startTime).toDate().getDate();
                        const weekNumber = Math.ceil((dayOfMonth + firstDayOfMonth) / 7);

                        return `W${weekNumber}`;
                      }}
                      style={{ height: 50 }}
                    />
                  </>
                )}
                {!switchTime && (
                  <>
                    <DateHeader unit="day" labelFormat="DD" style={{ height: 50 }} />
                    <DateHeader
                      unit="day"
                      labelFormat={([startTime, endTime]) => {
                        return moment(startTime).locale("ja").format("dd");
                      }}
                      style={{ height: 50 }}
                    />
                  </>
                )}
              </TimelineHeaders>

              <TimelineMarkers>
                <CustomMarker date={moment().add(0, "day").valueOf()}>
                  {({ styles }) => {
                    const newStyles = {
                      ...styles,
                      backgroundColor: "#ed4747",
                    };

                    return <div style={newStyles} />;
                  }}
                </CustomMarker>

                <CustomMarker
                  date={
                    window.innerWidth < viewSize ? moment().add(5, "day").valueOf() : moment().add(25, "day").valueOf()
                  }
                >
                  {({ styles }) => {
                    const newStyles = {
                      ...styles,
                      backgroundColor: "transparent",
                    };

                    return <div style={newStyles} />;
                  }}
                </CustomMarker>
              </TimelineMarkers>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectLogworkTable;
