const moment = require("moment-timezone");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createTimeSlots = (req, res, next) => {
  try {
    const { startDate, endDate, interval, breakStart, breakEnd } = req.body;

    if (!startDate || !endDate || !interval || !breakStart || !breakEnd) {
      return res.status(400).json({
        status: "fail",
        message:
          "Missing required fields: startDate, endDate, interval, breakStart, breakEnd",
      });
    }

    // Parse dates and times
    const start = moment.tz(startDate, "YYYY-MM-DD HH:mm a", "Asia/Kolkata");
    const end = moment.tz(endDate, "YYYY-MM-DD HH:mm a", "Asia/Kolkata");
    const breakStartTime = moment(breakStart, "HH:mm a");
    const breakEndTime = moment(breakEnd, "HH:mm a");

    if (
      !start.isValid() ||
      !end.isValid() ||
      !breakStartTime.isValid() ||
      !breakEndTime.isValid()
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid date or time format",
      });
    }

    if (start.isAfter(end)) {
      return res.status(400).json({
        status: "fail",
        message: "startDate must be before endDate",
      });
    }

    const timeSlots = [];
    let current = moment.tz(start, "Asia/Kolkata");

    // Generate time slots day by day
    while (current.isBefore(end)) {
      const dayStart = current.clone().startOf("day");
      const dayEnd = current.clone().endOf("day");
      //   console.log(dayStart, dayEnd);

      let time = dayStart.clone().hour(start.hour()).minute(start.minute());
      while (time.isBefore(dayEnd) && time.isBefore(end)) {
        const slotStart = time.clone();
        const slotEnd = slotStart.clone().add(interval, "minutes");

        // Check if the slot falls within the break time
        const slotStartTimeOnly = moment(slotStart.format("HH:mm"), "HH:mm");
        const slotEndTimeOnly = moment(slotEnd.format("HH:mm"), "HH:mm");

        if (
          !(
            (slotStartTimeOnly.isSameOrAfter(breakStartTime) &&
              slotStartTimeOnly.isBefore(breakEndTime)) ||
            (slotEndTimeOnly.isAfter(breakStartTime) &&
              slotEndTimeOnly.isSameOrBefore(breakEndTime))
          )
        ) {
          timeSlots.push({
            start: slotStart.tz("Asia/Kolkata").format("YYYY-MM-DD hh:mm A"),
            end: slotEnd.tz("Asia/Kolkata").format("YYYY-MM-DD hh:mm A"),
          });
        }

        time.add(interval, "minutes");
      }

      current
        .add(1, "day")
        .startOf("day")
        .hour(start.hour())
        .minute(start.minute());
    }

    return res.status(200).json({
      status: "success",
      message: "Time slots calculated successfully",
      length: timeSlots.length,
      data: timeSlots,
    });
  } catch (e) {
    return next(e);
  }
};

// {
//     "startDate": "2025-01-07 09:00 am",
//     "endDate": "2025-01-09 7:00 pm",
//     "interval": 60,
//     "breakStart": "1:00 pm",
//     "breakEnd": "2:00 pm"
// }
