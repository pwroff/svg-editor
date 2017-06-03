/**
 * Created by Leonid on 02/05/17.
 */

export default (dateString) => {
  const date = new Date(dateString);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = date.getUTCFullYear();
  const day = date.getDate();
  const month = monthNames[date.getUTCMonth()];
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const dayStart = `${day} ${month}, ${year}`;
  const twHours = hours === 12 && 12 || hours % 12;
  const timeStart = `${twHours}:${minutes} ${hours < 12 && 'am' || 'pm'}`;

  return `${dayStart} - ${timeStart}`;
};
