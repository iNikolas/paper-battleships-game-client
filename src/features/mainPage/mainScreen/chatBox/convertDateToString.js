const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const convertDateToString = (timeStamp) => {
    const dateCreated = new Date (timeStamp)
    const now = new Date();
    const nextDay = new Date(dateCreated);
    nextDay.setDate(dateCreated.getDate() + 1);

    const dateDiff = now - dateCreated;

    const isSameDay =
        "" + now.getFullYear() + now.getDate() + now.getDay() ===
        "" +
        dateCreated.getFullYear() +
        dateCreated.getDate() +
        dateCreated.getDay();
    const isSameYear = now.getFullYear() === dateCreated.getFullYear();
    const isYesterday =
        "" + now.getFullYear() + now.getDate() + now.getDay() ===
        "" + nextDay.getFullYear() + nextDay.getDate() + nextDay.getDay();

    if (dateDiff < 30000) return "Just now";
    if (dateDiff < 300000) return "Recently";
    if (isSameDay)
        return `${always2Digits(dateCreated.getHours())}:${always2Digits(
            dateCreated.getMinutes()
        )}`;
    if (isYesterday) return 'Yesterday'
    if (isSameYear) return getDayAndMonth(dateCreated);
    return `${getDayAndMonth(dateCreated)} ${dateCreated.getFullYear()}`;
};

export default convertDateToString

function always2Digits(num) {
    return num < 10 ? "0" + num : num + "";
}

function getDayAndMonth(date) {
    return `${always2Digits(date.getDate())} ${MONTHS[date.getMonth()]}`;
}